package server

import (
	"encoding/json"
	"log"
	"sync"

	"github.com/volatiletech/authboss/v3"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/model"
	"gopkg.in/olahol/melody.v1"
)

var (
	usersSessionsByUserId = make(map[string]*melody.Session)
	conversationsByUserId = make(map[string][]*Conversation)
	lock                  = new(sync.Mutex)
	logger                = log.Default()
)

const (
	userKey = "user"
)

func SetUpWebsockets(ab *authboss.Authboss) *melody.Melody {
	m := melody.New()

	m.HandleConnect(func(s *melody.Session) {
		lock.Lock()
		if abUser, err := ab.CurrentUser(s.Request); err == nil {
			if user, ok := abUser.(*model.User); ok {
				s.Set(userKey, user)
				usersSessionsByUserId[user.GetIDString()] = s
				logger.Print("User " + user.Email + " opened connection")

				response := &Response{Type: "conversations"}
				if convs, ok := conversationsByUserId[user.GetIDString()]; ok {
					response.Payload = convs
				} else {
					response.Payload = []*Conversation{}
				}
				if bytes, err := json.Marshal(response); err == nil {
					_ = s.Write(bytes)
				}
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
		if userI, ok := s.Get(userKey); ok {
			user, _ := userI.(model.User)
			logger.Print("User " + user.Email + " closed connection")
			delete(usersSessionsByUserId, user.GetIDString())
		}
		lock.Unlock()
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		var request Request
		if err := json.Unmarshal(msg, &request); err != nil {
			logger.Printf("Could not decode request %s", string(msg))
			return
		}

		switch request.Type {
		case "new_message":
			payload, ok := request.Payload.(map[string]interface{})
			if !ok {
				logger.Printf("Could not decode new message payload as map %s", request.Payload)
				return
			}
			inMessage, ok := NewInMessage(payload)
			if !ok {
				logger.Printf("Could not decode new message payload %s", request.Payload)
				return
			}

			userI, _ := s.Get(userKey)
			user, _ := userI.(*model.User)

			storeNewMessage(inMessage.Text, user.GetIDString(), inMessage.To, false)
			storeNewMessage(inMessage.Text, inMessage.To, user.GetIDString(), true)

			response := &Response{Type: "new_message", Payload: OutMessage{From: user.GetIDString(), Text: inMessage.Text}}
			if receiver := findWsByUser(inMessage.To); receiver != nil {
				if bytes, err := json.Marshal(response); err == nil {
					if err := receiver.Write(bytes); err != nil {
						logger.Printf("Failed to send message from %s to %s", user.Email, inMessage.To)
					} else {
						logger.Printf("Successfully sent message from %s to %s", user.Email, inMessage.To)
					}
				}
			} else {
				logger.Printf("User %s is offline", inMessage.To)
			}
			// case: "create_conversation"
		}
	})

	return m
}

type InMessage struct {
	To   string `json:"to"`
	Text string `json:"text"`
}

func NewInMessage(vals map[string]interface{}) (*InMessage, bool) {
	if to, ok := vals["to"]; !ok {
		return nil, false
	} else if text, ok := vals["text"]; !ok {
		return nil, false
	} else if toStr, ok := to.(string); !ok {
		return nil, false
	} else if textStr, ok := text.(string); !ok {
		return nil, false
	} else {
		return &InMessage{To: toStr, Text: textStr}, true
	}
}

type OutMessage struct {
	From string `json:"from"`
	Text string `json:"text"`
}

func findWsByUser(id string) *melody.Session {
	if session, ok := usersSessionsByUserId[id]; !ok {
		return nil
	} else {
		return session
	}
}

type Response struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

type ChatMessage struct {
	Incoming bool   `json:"incoming"`
	Text     string `json:"text"`
}

type Conversation struct {
	WithUserId string        `json:"withUserId"`
	Messages   []ChatMessage `json:"messages"`
}

type Request struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

func findConversationWith(owner string, with string) *Conversation {
	if convs, ok := conversationsByUserId[owner]; !ok {
		return nil
	} else {
		for _, conv := range convs {
			if conv.WithUserId == with {
				return conv
			}
		}
		return nil
	}
}

func storeNewMessage(msg string, fromId string, toId string, incoming bool) { // Updated From User Conversation
	conv := findConversationWith(fromId, toId)
	isConvNew := conv == nil
	if isConvNew {
		conv = &Conversation{WithUserId: toId, Messages: []ChatMessage{}}

		if c, ok := conversationsByUserId[fromId]; ok {
			conversationsByUserId[fromId] = append(c, conv)
		} else {
			conversationsByUserId[fromId] = []*Conversation{conv}
		}
	}

	conv.Messages = append(conv.Messages, ChatMessage{Incoming: incoming, Text: msg})

	if isConvNew {
		if s, ok := usersSessionsByUserId[fromId]; ok {
			if bytes, err := json.Marshal(Response{Type: "conversations", Payload: conversationsByUserId[fromId]}); err == nil {
				_ = s.Write(bytes)
			}
		}
	}
}
