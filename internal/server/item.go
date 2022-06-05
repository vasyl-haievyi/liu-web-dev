package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/database"
)

func PostItemHandler(w http.ResponseWriter, r *http.Request) {
	requestData := &NewItemRequest{}
	if err := render.Bind(r, requestData); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}

	id, err := database.CreateItem(requestData.Item)
	if err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.Render(w, r, NewItemCreatedResponse(id))
}

func GetItemHandler(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	item, err := database.FindItemById(id)
	if err == database.ErrNotFound {
		render.Render(w, r, ErrNotFound)
		return
	} else if err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.Render(w, r, NewGetItemResponse(item))
}

func GetItemsHandler(w http.ResponseWriter, r *http.Request) {
	queryString := r.URL.Query().Get("q")
	categories := []string{}
	if err := r.ParseForm(); err == nil && r.Form.Has("category") {
		categories = r.Form["category"]
	}

	items, err := database.SearchItems(queryString, categories)
	if err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.Render(w, r, NewGetItemsResponse(items))
}
