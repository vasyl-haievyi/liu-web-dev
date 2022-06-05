package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Item struct {
	Id          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Title       string             `json:"title,omitempty" bson:"title,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	State       string             `json:"state,omitempty" bson:"state,omitempty"`
	Price       string             `json:"price,omitempty" bson:"price,omitempty"`
	Seller      *User              `json:"seller,omitempty" bson:"seller,omitempty"`
	Category    *Category          `json:"category,omitempty" bson:"category,omitempty"`
}
