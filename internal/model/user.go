package model

import (
	"github.com/volatiletech/authboss/v3"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
}

// PutPID into user
func (u *User) PutPID(pid string) { u.Email = pid }

// PutPassword into user
func (u *User) PutPassword(password string) { u.Password = password }

// PutEmail into user
func (u *User) PutEmail(email string) { u.Email = email }

// GetPID from user
func (u User) GetPID() string { return u.Email }

// GetPassword from user
func (u User) GetPassword() string { return u.Password }

// GetEmail from user
func (u User) GetEmail() string { return u.Email }

var (
	assertUser = &User{}

	_ authboss.User         = assertUser
	_ authboss.AuthableUser = assertUser
	// _ authboss.ConfirmableUser = assertUser
	// _ authboss.LockableUser    = assertUser
	// _ authboss.RecoverableUser = assertUser
	// _ authboss.ArbitraryUser   = assertUser

	// _ totp2fa.User = assertUser
	// _ sms2fa.User  = assertUser
)
