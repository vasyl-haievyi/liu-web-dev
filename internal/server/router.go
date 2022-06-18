package server

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
	"github.com/volatiletech/authboss/v3"
)

func setRouter() *chi.Mux {
	router := chi.NewRouter()
	ab := SetUpAuth()
	mld := SetUpWebsockets(ab)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(render.SetContentType(render.ContentTypeJSON))
	router.Use(ab.LoadClientStateMiddleware, RememberMeMiddleware(ab))

	router.Group(func(r chi.Router) {
		r.Use(authboss.ModuleListMiddleware(ab))
		r.Mount("/auth", http.StripPrefix("/auth", ab.Config.Core.Router))
	})

	router.Route("/api", func(r chi.Router) {
		r.Get("/categories", GetCategoriesHandler)
		r.Get("/items/{id}", GetItemHandler)
		r.Get("/items", GetItemsHandler)

		r.Group(func(r chi.Router) {
			r.Use(authboss.Middleware2(ab, authboss.RequireNone, authboss.RespondUnauthorized))

			r.Post("/items", PostItemHandler)
			r.Post("/user/followItem/{id}", PostFollowItemHandler(ab))
			r.Get("/user/followedItems", GetFollowedItemsHandler(ab))
			r.Delete("/user/followedItems/{id}", DeleteFollowedItemHandler(ab))
			r.Get("/currentUser", GetCurrentUserHandler(ab))
			r.Get("/chatws", func(w http.ResponseWriter, r *http.Request) {
				_ = mld.HandleRequest(w, r)
			})
			r.Get("/signImageUpload", SignImageUploadHandler)
		})
	})

	router.Get("/static/*", func(w http.ResponseWriter, r *http.Request) {
		dir := http.Dir("../assets/build/static")

		http.StripPrefix("/static/", http.FileServer(dir)).ServeHTTP(w, r)
	})

	index, _ := ioutil.ReadFile("../assets/build/index.html")
	fmt.Println(os.Getwd())
	router.Get("/*", func(w http.ResponseWriter, r *http.Request) {
		w.Write(index)
	})

	return router
}

// func getCategoriesHandler(ctx *gin.Context) {
// 	categories := [...]gin.H{
// 		{"id": "transport", "title": "Transport", "subcategories": [...]gin.H{{"id": "cars", "title": "Cars"}, {"id": "bicycles", "title": "Bicycles"}}},
// 		{"id": "real_estate", "title": "Real Estate", "subcategories": [...]gin.H{}},
// 		{"id": "electronics", "title": "Electronics", "subcategories": [...]gin.H{{"id": "smartphones", "title": "Smartphones"}, {"id": "laptops", "title": "Laptops"}}},
// 		{"id": "fascion", "title": "Fascion", "subcategories": [...]gin.H{}},
// 		{"id": "sport_and_hobbies", "title": "Sport & Hobbies", "subcategories": [...]gin.H{}},
// 	}
// 	ctx.JSON(200, gin.H{
// 		"categories": categories,
// 	})
// }
