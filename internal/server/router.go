package server

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/render"
)

func setRouter() *chi.Mux {
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(render.SetContentType(render.ContentTypeJSON))

	router.Route("/api", func(r chi.Router) {
		r.Get("/categories", GetCategoriesHandler)
		r.Post("/items", PostItemHandler)
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
