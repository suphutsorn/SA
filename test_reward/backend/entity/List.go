package entity

import (
	
	"gorm.io/gorm"
)

type List struct {
	gorm.Model
	
	NameReward  string    `json:"NameReward"`   // ชื่อของรางวัล
	
	
	
	
}