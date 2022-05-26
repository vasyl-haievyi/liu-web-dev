package model

type Category struct {
	Id            string        `json:"id,omitempty"`
	Title         string        `json:"title,omitempty"`
	Subcategories []Subcategory `json:"subcategories,omitempty"`
}

type Subcategory struct {
	Id    string `json:"id,omitempty"`
	Title string `json:"title,omitempty"`
}
