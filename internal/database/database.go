package database

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var db *mongo.Client

func ConnectDB() {
	connectURI := os.Getenv("DATABASE_URI")
	client, err := mongo.NewClient(options.Client().ApplyURI(connectURI))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	log.Print("Connected to mongodb")

	db = client
}

func getCollection(collectionName string) *mongo.Collection {
	collection := db.Database("store").Collection(collectionName)
	return collection
}

func E(s string, i interface{}) bson.E {
	return bson.E{Key: s, Value: i}
}
