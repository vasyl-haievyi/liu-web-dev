package database

import (
	"context"
	"time"

	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
