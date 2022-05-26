package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/database"
)

func GetCategoriesHandler(ctx *gin.Context) {
	categories, err := database.GetCategories()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
	} else {
		ctx.JSON(http.StatusOK, gin.H{
			"categories": categories,
		})
	}
}
