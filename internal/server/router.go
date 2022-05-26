package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func setRouter() *gin.Engine {
	router := gin.Default()

	api := router.Group("/api")
	{
		api.GET("/categories", GetCategoriesHandler)
	}

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })

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
