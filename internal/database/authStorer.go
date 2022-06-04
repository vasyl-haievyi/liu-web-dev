package database

import (
	"context"

	"github.com/volatiletech/authboss/v3"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type DefaultStorer struct {
	col *mongo.Collection
}

func NewDefaultStorer() *DefaultStorer {
	return &DefaultStorer{col: getCollection("users")}
}

func (storer DefaultStorer) Load(ctx context.Context, key string) (authboss.User, error) {
	user := &model.User{}
	filter := bson.D{E("email", key)}
	err := storer.col.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, authboss.ErrUserNotFound
		} else {
			return nil, err
		}
	}

	return user, nil
}

func (storer DefaultStorer) Save(ctx context.Context, user authboss.User) error {
	if _, err := storer.Load(ctx, user.GetPID()); err != nil {
		return err
	}

	dbUser, _ := user.(*model.User)
	if _, err := storer.col.UpdateOne(ctx, bson.D{E("email", dbUser.GetPID())}, dbUser); err != nil {
		return err
	}

	return nil
}

func (storer DefaultStorer) New(ctx context.Context) authboss.User {
	return &model.User{}
}

func (storer DefaultStorer) Create(ctx context.Context, user authboss.User) error {
	dbUser := user.(*model.User)

	if u, err := storer.Load(ctx, user.GetPID()); err != nil || user != nil {
		if u != nil {
			return authboss.ErrUserFound
		} else if err != mongo.ErrNoDocuments {
			return err
		}
	}

	if _, err := storer.col.InsertOne(ctx, dbUser); err != nil {
		return err
	}

	return nil
}
