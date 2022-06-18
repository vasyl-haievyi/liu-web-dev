package server

import (
	"net/http"
	"os"
)

func Start() {
	router := setRouter()

	port := ":8080"
	if env_port, ok := os.LookupEnv("PORT"); ok {
		port = ":" + env_port
	}
	http.ListenAndServe(port, router)
}
