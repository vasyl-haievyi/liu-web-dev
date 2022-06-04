package server

import (
	"encoding/base64"
	"log"
	"time"

	"github.com/gorilla/sessions"
	abclientstate "github.com/volatiletech/authboss-clientstate"
	"github.com/volatiletech/authboss/v3"
	_ "github.com/volatiletech/authboss/v3/auth"
	"github.com/volatiletech/authboss/v3/defaults"
	"gitlab.liu.se/vasha375/tddd27_2022_project/internal/database"
)

const (
	sessionCookieName = "ab_marketplace"
)

func SetUpAuth() *authboss.Authboss {
	ab := authboss.New()
	ab.Config.Paths.RootURL = "127.0.0.1:8080"
	ab.Config.Paths.Mount = "/auth"
	ab.Config.Storage.Server = database.NewDefaultStorer()

	cookieStoreKey, _ := base64.StdEncoding.DecodeString(`NpEPi8pEjKVjLGJ6kYCS+VTCzi6BUuDzU0wrwXyf5uDPArtlofn2AG6aTMiPmN3C909rsEWMNqJqhIVPGP3Exg==`)
	sessionStoreKey, _ := base64.StdEncoding.DecodeString(`AbfYwmmt8UCwUuhd9qvfNA9UCuN1cVcKJN1ofbiky6xCyyBj20whe40rJa3Su0WOWLWcPpO1taqJdsEI/65+JA==`)

	cookieStore := abclientstate.NewCookieStorer(cookieStoreKey, nil)
	cookieStore.HTTPOnly = false
	cookieStore.Secure = false
	sessionStore := abclientstate.NewSessionStorer(sessionCookieName, sessionStoreKey, nil)
	cstore := sessionStore.Store.(*sessions.CookieStore)
	cstore.Options.HttpOnly = false
	cstore.Options.Secure = false
	cstore.MaxAge(int((30 * 24 * time.Hour) / time.Second))

	ab.Config.Storage.CookieState = cookieStore
	ab.Config.Storage.SessionState = sessionStore

	ab.Config.Core.ViewRenderer = defaults.JSONRenderer{}

	defaults.SetCore(&ab.Config, true, false)

	if err := ab.Init(); err != nil {
		log.Fatal(err)
	}

	return ab
}
