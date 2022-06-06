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
		user, ok := getUser(ab, w, req)
		if !ok {
			return
		}

		user.Password = ""
		render.Render(w, req, NewGetUserResponse(user))
	})
}

func PostFollowItemHandler(ab *authboss.Authboss) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		user, ok := getUser(ab, w, req)
		if !ok {
			return
		}

		itemId := chi.URLParam(req, "id")

		if err := database.AddFollowingItem(user.Id, itemId); err != nil {
			render.Render(w, req, ErrInternal(err))
			return
		}

		render.Render(w, req, NewSuccessResponse())
	})
}

func GetFollowedItemsHandler(ab *authboss.Authboss) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		user, ok := getUser(ab, w, req)
		if !ok {
			return
		}

		if items, err := database.GetItemsByIds(user.FollowedItemsIDs); err != nil {
			render.Render(w, req, ErrInternal(err))
			return
		} else {
			render.Render(w, req, NewGetItemsResponse(items))
			return
		}
	})
}

func DeleteFollowedItemHandler(ab *authboss.Authboss) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		user, ok := getUser(ab, w, req)
		if !ok {
			return
		}

		itemId := chi.URLParam(req, "id")

		if err := database.DeleteFollowedItem(user.Id, itemId); err != nil {
			render.Render(w, req, ErrInternal(err))
			return
		} else {
			render.Render(w, req, NewSuccessResponse())
			return
		}
	})
}

func getUser(ab *authboss.Authboss, w http.ResponseWriter, r *http.Request) (*model.User, bool) {
	user, err := ab.CurrentUser(r)
	if err != nil {
		render.Render(w, r, ErrUnauthorized)
		return nil, false
	}
	userModel, ok := user.(*model.User)
	if !ok {
		render.Render(w, r, ErrInternal(errors.New("could cast abUser to modelUser")))
		return nil, false
	}

	return userModel, true
}
