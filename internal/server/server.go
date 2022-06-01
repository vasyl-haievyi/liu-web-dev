package server

import "net/http"

func Start() {
	router := setRouter()

	http.ListenAndServe(":8080", router)
}
