package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/kietvo5924/helicorp/backend/handlers"
	"github.com/kietvo5924/helicorp/backend/models"
)

func main() {
	// Initialize Database
	models.InitDB()

	// Setup Gin Router
	r := gin.Default()

	// CORS Middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Routes
	api := r.Group("/api")
	{
		api.GET("/health", handlers.HealthCheck)
		api.HEAD("/health", handlers.HealthCheck)
		api.POST("/webhook", handlers.HandleWebhook)
		api.GET("/products", handlers.GetProducts)
		api.GET("/products/:id", handlers.GetProductByID)
		api.POST("/chat", handlers.Chat)
	}

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	
	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}
