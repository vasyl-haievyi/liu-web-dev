package database

import (
	"context"

	"github.com/volatiletech/authboss/v3"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type DefaultStorer struct {
	col              *mongo.Collection
	rememberTokenCol *mongo.Collection
}

func NewDefaultStorer() *DefaultStorer {
	return &DefaultStorer{col: getCollection("users"), rememberTokenCol: getCollection("rememberTokens")}
}

var (
	assertStorer = &DefaultStorer{}

	_ authboss.ServerStorer            = assertStorer
	_ authboss.CreatingServerStorer    = assertStorer
	_ authboss.RememberingServerStorer = assertStorer
	// _ authboss.ConfirmingServerStorer  = assertStorer
	// _ authboss.RecoveringServerStorer  = assertStorer
)

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

	dbUser := user.(*model.User)
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
		} else if err != authboss.ErrUserNotFound {
			return err
		}
	}

	if _, err := storer.col.InsertOne(ctx, dbUser); err != nil {
		return err
	}

	return nil
}

// AddRememberToken to a user
func (storer DefaultStorer) AddRememberToken(ctx context.Context, pid, token string) error {
	record := &model.RememberToken{}
	filter := bson.D{E("pid", pid)}
	err := storer.rememberTokenCol.FindOne(ctx, filter).Decode(&record)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			record.PID = pid
			record.Tokens = []string{}

			if _, err := storer.rememberTokenCol.InsertOne(ctx, record); err != nil {
				return err
			}
		} else {
			return err
		}
	}

	record.Tokens = append(record.Tokens, token)

	if _, err := storer.rememberTokenCol.UpdateOne(ctx, filter, record); err != nil {
		return err
	}
	return nil
}

// DelRememberTokens removes all tokens for the given pid
func (storer DefaultStorer) DelRememberTokens(ctx context.Context, pid string) error {
	filter := bson.D{E("pid", pid)}
	if _, err := storer.col.DeleteOne(ctx, filter); err != nil {
		return err
	}

	return nil
}

// UseRememberToken finds the pid-token pair and deletes it.
// If the token could not be found return ErrTokenNotFound
func (storer DefaultStorer) UseRememberToken(ctx context.Context, pid, token string) error {
	record := &model.RememberToken{}
	filter := bson.D{E("pid", pid)}
	err := storer.rememberTokenCol.FindOne(ctx, filter).Decode(&record)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return authboss.ErrTokenNotFound
		} else {
			return err
		}
	}

	for idx, dbToken := range record.Tokens {
		if dbToken == token {
			record.Tokens[idx] = record.Tokens[len(record.Tokens)-1]
			record.Tokens = record.Tokens[:len(record.Tokens)-1]
			if _, err := storer.rememberTokenCol.ReplaceOne(ctx, filter, record); err != nil {
				return err
			}

			return nil
		}
	}

	return authboss.ErrTokenNotFound
}
