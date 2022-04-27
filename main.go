package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	api := router.Group("/api")
	{
		api.GET("/categories", getCategoriesHandler)
	}

	router.Run(":8080")
}

func getCategoriesHandler(ctx *gin.Context) {
	categories := [...]gin.H{
		{"id": "transport", "prettyName": "Transport"},
		{"id": "real_estate", "prettyName": "Real Estate"},
		{"id": "electronics", "prettyName": "Electronics"},
		{"id": "fascion", "prettyName": "Fascion"},
		{"id": "sport_and_hobbies", "prettyName": "Sport & Hobbies"},
	}
	ctx.JSON(200, gin.H{
		"categories": categories,
	})
}
