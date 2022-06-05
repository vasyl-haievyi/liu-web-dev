package server

import (
	"net/http"

	"github.com/go-chi/render"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
)

type CategoriesResponse struct {
	Categories []model.Category `json:"categories"`
}

func (resp CategoriesResponse) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}

func NewCategoriesResponse(categories []model.Category) CategoriesResponse {
	return CategoriesResponse{Categories: categories}
}

type ItemCreatedResponse struct {
	Id string `json:"id"`
}

func (resp ItemCreatedResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, http.StatusCreated)
	return nil
}

func NewItemCreatedResponse(id string) ItemCreatedResponse {
	return ItemCreatedResponse{Id: id}
}

type GetUserResponse struct {
	User model.User `json:"user"`
}

func (resp GetUserResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, http.StatusOK)
	return nil
}

func NewGetUserResponse(user model.User) GetUserResponse {
	return GetUserResponse{User: user}
}
