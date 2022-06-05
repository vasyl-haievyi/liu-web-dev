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
	User *model.User `json:"user"`
}

func (resp GetUserResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, http.StatusOK)
	return nil
}

func NewGetUserResponse(user *model.User) GetUserResponse {
	return GetUserResponse{User: user}
}

type GetItemResponse struct {
	Item *model.Item `json:"item"`
}

func (resp GetItemResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, http.StatusOK)
	return nil
}

func NewGetItemResponse(item *model.Item) GetItemResponse {
	return GetItemResponse{Item: item}
}

type GetItemsResponse struct {
	Items []model.Item `json:"items"`
}

func (resp GetItemsResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, http.StatusOK)
	return nil
}

func NewGetItemsResponse(items []model.Item) GetItemsResponse {
	return GetItemsResponse{Items: items}
}
