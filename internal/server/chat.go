package server

import (
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"sync"

	"github.com/volatiletech/authboss/v3"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
	"gopkg.in/olahol/melody.v1"
)

var (
	usersByWs = make(map[*melody.Session]*model.User)
	lock      = new(sync.Mutex)
	logger    = log.Default()
)

func SetUpWebsockets(ab *authboss.Authboss) *melody.Melody {
	m := melody.New()

	m.HandleConnect(func(s *melody.Session) {
		lock.Lock()
		if abUser, err := ab.CurrentUser(s.Request); err == nil {
			if user, ok := abUser.(*model.User); ok {
				usersByWs[s] = user
				logger.Print("User " + user.Email + " opened connection")
			} else {
				logger.Print("Could not upgrade Authboss user to regular")
			}
		} else {
			logger.Print("Could not get user from Authboss")
		}
		lock.Unlock()
	})

	m.HandleDisconnect(func(s *melody.Session) {
		lock.Lock()
		logger.Print("User " + usersByWs[s].Email + " closed connection")
		delete(usersByWs, s)
		lock.Unlock()
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		var inMessage InMessage
		if err := json.Unmarshal(msg, &inMessage); err != nil {
			logger.Printf("Could not decode message from %s", string(msg))
			return
		}

		outMessage := OutMessage{From: usersByWs[s].Email, Text: inMessage.Text}
		if receiver := findWsByUser(inMessage.To); receiver != nil {
			if bytes, err := json.Marshal(outMessage); err == nil {
				if err := receiver.Write(bytes); err != nil {
					logger.Printf("Failed to send message to %s", inMessage.To)
				}
			}
		} else {
			logger.Printf("User %s is offline", inMessage.To)
		}
	})

	return m
}

type InMessage struct {
	To   string `json:"to"`
	Text string `json:"text"`
}

type OutMessage struct {
	From string `json:"from"`
	Text string `json:"text"`
}

func findWsByUser(id string) *melody.Session {
	for ws, user := range usersByWs {
		uId := strings.Trim(fmt.Sprintf("%q", user.Id.Hex()), "\"")
		if uId == id {
			return ws
		}
	}

	return nil
}
