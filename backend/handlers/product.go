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
		{ID: 4, Name: "Helicorp OmniPad", Description: "Thin, light, and astonishingly powerful edge computing tablet.", Price: 1299.00, ImageURL: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80"},
		{ID: 5, Name: "Helicorp SonicPods", Description: "Studio-quality spatial audio in a completely wireless form factor.", Price: 299.00, ImageURL: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80"},
		{ID: 6, Name: "Helicorp NeuralLink", Description: "Direct brain-computer interface for maximum bandwidth interaction.", Price: 9999.00, ImageURL: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"},
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   products,
	})
}
