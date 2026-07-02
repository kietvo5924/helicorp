package models

import (
	"time"

	"gorm.io/gorm"
)

type WebhookEvent struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	EventType string         `json:"event_type"` // e.g., "pre_order", "checkout"
	Payload   string         `json:"payload"`    // JSON string representation of data
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}
