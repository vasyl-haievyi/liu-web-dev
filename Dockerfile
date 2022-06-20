# Build the Go API
FROM golang:latest AS builder
ADD . /app
WORKDIR /app
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /server ./cmd/backend/main.go

# Build the React application
FROM node:alpine AS node_builder
COPY --from=builder /app/assets ./
RUN npm install
RUN npm run build

# Final stage build, this will be the container
# that we will deploy to production
FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /server ./
COPY --from=node_builder /build ./assets/build
RUN chmod +x ./server
EXPOSE 8080

ARG DATABASE_URI
ARG CLOUDINARY_SECRET
ARG COOKIE_STORE_KEY
ARG SESSION_STORE_KEY

ENV DATABASE_URI=$DATABASE_URI
ENV CLOUDINARY_SECRET=$CLOUDINARY_SECRET
ENV COOKIE_STORE_KEY=$COOKIE_STORE_KEY
ENV SESSION_STORE_KEY=$SESSION_STORE_KEY
CMD ./server