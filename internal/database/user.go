package database

import (
	"context"
	"time"

	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddFollowingItem(userId primitive.ObjectID, itemId string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	user, err := FindUserById(userId)
	if err != nil {
		return nil
	}

	for _, id := range user.FollowedItemsIDs {
		if itemId == id {
			return nil
		}
	}

	user.FollowedItemsIDs = append(user.FollowedItemsIDs, itemId)
	filter := bson.D{E("_id", userId)}

	update := bson.D{E("$set", bson.D{E("followed_items_ids", user.FollowedItemsIDs)})}
	if _, err := getCollection("users").UpdateOne(ctx, filter, update); err != nil {
		return err
	}

	return nil
}

func DeleteFollowedItem(userId primitive.ObjectID, itemId string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	user, err := FindUserById(userId)
	if err != nil {
		return nil
	}

	var newFollowedItems []string
	for _, id := range user.FollowedItemsIDs {
		if id != itemId {
			newFollowedItems = append(newFollowedItems, id)
		}
	}

	filter := bson.D{E("_id", userId)}
	update := bson.D{E("$set", bson.D{E("followed_items_ids", newFollowedItems)})}
	if _, err := getCollection("users").UpdateOne(ctx, filter, update); err != nil {
		return err
	}

	return nil
}

func FindUserById(userId primitive.ObjectID) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	user := &model.User{}
	filter := bson.D{E("_id", userId)}
	if err := getCollection("users").FindOne(ctx, filter).Decode(&user); err != nil {
		return nil, err
	}

	return user, nil
}
