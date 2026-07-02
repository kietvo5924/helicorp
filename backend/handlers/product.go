package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/kietvo5924/helicorp/backend/models"
)

func GetProducts(c *gin.Context) {
	products := []models.Product{
		{ID: 1, Name: "Helicorp Quantum", Description: "Next-gen computing power in a sleek, obsidian chassis.", Price: 1999.00, ImageURL: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80"},
		{ID: 2, Name: "Helicorp Vision Pro", Description: "Immersive AR experience with 8K resolution and ultra-low latency.", Price: 3499.00, ImageURL: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=80"},
		{ID: 3, Name: "Helicorp Core X", Description: "The ultimate developer workstation with zero-latency compilation.", Price: 4999.00, ImageURL: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80"},
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   products,
	})
}
