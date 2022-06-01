package server

import (
	"net/http"

	"github.com/go-chi/render"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/database"
)

func GetCategoriesHandler(w http.ResponseWriter, r *http.Request) {
	categories, err := database.GetCategories()
	if err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	} else if err := render.Render(w, r, NewCategoriesResponse(categories)); err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}
}
