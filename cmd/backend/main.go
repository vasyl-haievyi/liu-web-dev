package main

import (
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/database"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/server"
)

func main() {
	database.ConnectDB()
	server.Start()
}
