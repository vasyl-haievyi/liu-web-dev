package model

type Category struct {
	Id    string `json:"id" bson:"id"`
	Title string `json:"title" bson:"title"`
}
