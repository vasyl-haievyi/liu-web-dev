package database

import (
	"context"
	"time"

	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func CreateItem(item model.Item) (string, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := getCollection("items").InsertOne(ctx, item)
	if err != nil {
		return "", err
	}

	return result.InsertedID.(primitive.ObjectID).Hex(), nil
}

func FindItemById(id string) (*model.Item, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	item := &model.Item{}
	dbId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	filter := bson.D{E("_id", dbId)}
	err = getCollection("items").FindOne(ctx, filter).Decode(&item)
	if err == mongo.ErrNoDocuments {
		return nil, ErrNotFound
	} else if err != nil {
		return nil, err
	}

	return item, nil
}

func SearchItems(searchQuery string, categories []string) ([]model.Item, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	opts := options.Find().SetProjection(bson.D{E("_id", 1), E("title", 1)})

	filter := bson.D{{}}
	textFilter := bson.D{E("$text", bson.D{E("$search", searchQuery)})}

	categoriesFilter := bson.D{E("category.id", bson.D{E("$in", categories)})}

	if searchQuery != "" {
		filter = textFilter
	}
	if len(categories) > 0 {
		filter = bson.D{E("$and", bson.A{filter, categoriesFilter})}
	}

	cursor, err := getCollection("items").Find(ctx, filter, opts)
	if err == mongo.ErrNoDocuments {
		return []model.Item{}, nil
	} else if err != nil {
		return nil, err
	}

	var results []model.Item
	if err = cursor.All(ctx, &results); err != nil {
		return nil, err
	}

	return results, nil
}
