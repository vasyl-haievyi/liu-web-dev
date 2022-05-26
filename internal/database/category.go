package database

import (
	"context"
	"time"

	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
	"go.mongodb.org/mongo-driver/bson"
)

func GetCategories() ([]model.Category, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var categories []model.Category
	defer cancel()

	results, err := getCollection("categories").Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	defer results.Close(ctx)
	for results.Next(ctx) {
		var category model.Category
		if err = results.Decode(&category); err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	return categories, nil
}
