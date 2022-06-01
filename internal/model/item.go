package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Item struct {
	Id    primitive.ObjectID `json:"id,omitempty" bson:"_id"`
	Title string             `json:"title" bson:"title"`
	// Description string             `json:"description" bson:"description"`
	// State       string             `json:"state" bson:"state"`
	// Price       string             `json:"price" bson:"price"`
	// Location    string             `json:"location" bson:"location"`
	// Seller      User
}

// type User struct {
// 	Id   string
// 	Name string
// }
