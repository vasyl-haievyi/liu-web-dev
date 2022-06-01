package server

import (
	"net/http"

	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
)

type CategoriesResponse struct {
	Categories []model.Category `json:"categories"`
}

func (c CategoriesResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func NewCategoriesResponse(categories []model.Category) CategoriesResponse {
	return CategoriesResponse{Categories: categories}
}
