# Build stage
FROM golang:alpine AS builder

WORKDIR /app

# Install gcc and musl-dev for SQLite CGO
RUN apk add --no-cache gcc musl-dev

# Copy module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the application with CGO enabled for SQLite
RUN CGO_ENABLED=1 GOOS=linux go build -o main .

# Run stage
FROM alpine:latest
WORKDIR /app

# Install timezone data and certificates if needed
RUN apk add --no-cache tzdata ca-certificates

COPY --from=builder /app/main .

EXPOSE 8080
ENV PORT=8080
ENV GIN_MODE=release
ENV DB_PATH=/data/helicorp.db

# Create a volume mount point for SQLite persistence
VOLUME /data

CMD ["./main"]
