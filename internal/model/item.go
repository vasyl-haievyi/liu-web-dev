package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Item struct {
	Id          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Title       string             `json:"title" bson:"title"`
	Description string             `json:"description" bson:"description"`
	State       string             `json:"state" bson:"state"`
	Price       string             `json:"price" bson:"price"`
	Seller      *User              `json:"seller" bson:"seller"`
	Category    *Category          `json:"category" bson:"category"`
}
