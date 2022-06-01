package server

import (
	"net/http"

	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
)

type NewItemRequest struct {
	Item model.Item `json:"item"`
}

func (req *NewItemRequest) Bind(r *http.Request) error {
	return nil
}
