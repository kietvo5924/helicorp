package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kietvo5924/helicorp/backend/models"
)

type WebhookRequest struct {
	EventType string                 `json:"event_type" binding:"required"`
	Data      map[string]interface{} `json:"data"`
}

func HandleWebhook(c *gin.Context) {
	var req WebhookRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	payloadBytes, _ := json.Marshal(req.Data)

	event := models.WebhookEvent{
		EventType: req.EventType,
		Payload:   string(payloadBytes),
	}

	if err := models.DB.Create(&event).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save event"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Event recorded successfully",
		"id":      event.ID,
	})
}
