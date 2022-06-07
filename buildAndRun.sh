#! /bin/bash

cd assets
npm run build 

cd ..
go build ./cmd/backend/main.go

./main