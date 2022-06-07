package server

import (
	"crypto/sha1"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"hash"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"github.com/go-chi/render"
)

const (
	cloudName = "drm00a34m"
	apiKey    = "752572853785933"
	apiSecret = "MwsEdpYos8vXoMqM26-n_72HtoI"
)

func SignImageUploadHandler(w http.ResponseWriter, r *http.Request) {
	values := url.Values{"folder": {"signed_upload"}}
	signature, timestamp, err := SignParameters(values, apiSecret)
	if err != nil {
		render.Render(w, r, ErrInternal(err))
		return
	}

	render.Render(w, r, &SignatureResponse{
		Signature: signature,
		Timestamp: timestamp,
		ApiKey:    apiKey,
		CloudName: cloudName,
	})
}

// SignParameters signs parameters using the provided secret.
func SignParameters(params url.Values, secret string) (string, string, error) {
	timestamp := strconv.FormatInt(time.Now().Unix(), 10)
	params.Set("timestamp", timestamp)

	encodedUnescapedParams, err := url.QueryUnescape(params.Encode())
	if err != nil {
		return "", "", err
	}

	rawSignature, err := Sign(encodedUnescapedParams, secret, SHA1)
	if err != nil {
		return "", "", err
	}
	return hex.EncodeToString(rawSignature), timestamp, nil
}

type Algo = string

const (
	SHA1   Algo = "sha1"
	SHA256 Algo = "sha256"
)

func Sign(content string, secret string, algo Algo) ([]byte, error) {
	var hashFunc hash.Hash
	switch algo {
	case SHA1:
		hashFunc = sha1.New()
	case SHA256:
		hashFunc = sha256.New()
	default:
		return nil, errors.New("unsupported signature algorithm")
	}

	hashFunc.Write([]byte(content + secret))

	return hashFunc.Sum(nil), nil
}
