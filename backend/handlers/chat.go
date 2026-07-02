package handlers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type ChatMessage struct {
	Role    string `json:"role"` // "user" or "model"
	Content string `json:"content"`
}

type ChatRequest struct {
	Message string        `json:"message"`
	History []ChatMessage `json:"history"`
}

func Chat(c *gin.Context) {
	var req ChatRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid request"})
		return
	}

	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Println("GEMINI_API_KEY is not set")
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "API key not configured"})
		return
	}

	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		log.Printf("Error creating Gemini client: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to initialize AI"})
		return
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.5-flash")

	// Dynamically build product list
	var productList strings.Builder
	for _, p := range products {
		productList.WriteString(fmt.Sprintf("- %s: %s ($%.2f)\n", p.Name, p.Description, p.Price))
	}

	// Use SystemInstruction
	model.SystemInstruction = &genai.Content{
		Parts: []genai.Part{
			genai.Text("You are an AI assistant for Helicorp, a premium futuristic technology company. Answer concisely, professionally, and enthusiastically in Vietnamese or English depending on user. Keep answers under 60 words and do not use markdown unless necessary.\n\nHere is our current product catalog:\n" + productList.String()),
		},
	}

	cs := model.StartChat()
	
	// Pre-fill history if available
	for _, h := range req.History {
		role := h.Role
		if role != "user" && role != "model" {
			role = "user"
		}
		cs.History = append(cs.History, &genai.Content{
			Role: role,
			Parts: []genai.Part{genai.Text(h.Content)},
		})
	}

	resp, err := cs.SendMessage(ctx, genai.Text(req.Message))
	if err != nil {
		log.Printf("Error generating content: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "AI failed to respond"})
		return
	}

	if len(resp.Candidates) > 0 && len(resp.Candidates[0].Content.Parts) > 0 {
		var replyBuilder strings.Builder
		for _, part := range resp.Candidates[0].Content.Parts {
			replyBuilder.WriteString(fmt.Sprintf("%v", part))
		}
		
		reply := replyBuilder.String()
		c.JSON(http.StatusOK, gin.H{"status": "success", "data": reply})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Empty response from AI"})
	}
}
