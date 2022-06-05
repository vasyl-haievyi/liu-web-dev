package server

import (
	"errors"
	"net/http"

	"github.com/go-chi/render"
	"github.com/volatiletech/authboss/v3"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
)

func getCurrentUserHandler(ab *authboss.Authboss) http.HandlerFunc {
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
