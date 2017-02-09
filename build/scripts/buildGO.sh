#!/usr/bin/env bash
go build \
    -o dist/flag \
    -ldflags "-X common.main.VERSION=$VERSION" \
    src/api/main.go
