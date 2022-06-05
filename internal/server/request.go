package server

import (
	"errors"
	"net/http"

	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
)

type NewItemRequest struct {
	Item model.Item `json:"item"`
}

func (req *NewItemRequest) Bind(r *http.Request) error {
	if req.Item.Seller == nil {
		return errors.New("seller cannot be empty")
	} else if req.Item.Category == nil {
		return errors.New("category cannot be empty")
	} else if !req.Item.Id.IsZero() {
		return errors.New("id cannot be set by a client")
	} else if req.Item.State != "new" && req.Item.State != "used" {
		return errors.New("state field can only have values \"new\" and \"used\"")
	}

	return nil
}
