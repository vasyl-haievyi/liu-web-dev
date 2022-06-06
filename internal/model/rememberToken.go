package model

type RememberToken struct {
	PID    string   `bson:"pid"`
	Tokens []string `bson:"tokens"`
}
