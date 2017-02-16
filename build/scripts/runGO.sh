#!/usr/bin/env bash
reflex -g './src/api/**' -s -- \
      go run \
      -ldflags "-X main.VERSION=$VERSION" \
      src/api/main.go
