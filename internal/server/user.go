package server

import (
	"errors"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/volatiletech/authboss/v3"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/database"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
)

func GetCurrentUserHandler(ab *authboss.Authboss) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		user, err := ab.CurrentUser(req)
		if err != nil {
			render.Render(w, req, ErrUnauthorized)
			return
		}

		userModel, ok := user.(*model.User)
		if !ok {
			render.Render(w, req, ErrInternal(errors.New("could cast abUser to modelUser")))
		}

		userModel.Password = ""
		render.Render(w, req, NewGetUserResponse(userModel))
	})
}

func PostFollowItemHandler(ab *authboss.Authboss) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		user, err := ab.CurrentUser(req)
		if err != nil {
			render.Render(w, req, ErrUnauthorized)
			return
		}
		userModel, ok := user.(*model.User)
		if !ok {
			render.Render(w, req, ErrInternal(errors.New("could cast abUser to modelUser")))
			return
		}

		itemId := chi.URLParam(req, "id")

		if err := database.AddFollowingItem(userModel.Id, itemId); err != nil {
			render.Render(w, req, ErrInternal(err))
			return
		}

		render.Render(w, req, NewSuccessResponse())
	})
}
