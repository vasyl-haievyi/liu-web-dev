package server

import (
	"net/http"

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
