#!/usr/bin/env bash
reflex -r '\.go' -s -- \
      go run \
      -ldflags "-X main.VERSION=$VERSION" \
      src/api/main.go
