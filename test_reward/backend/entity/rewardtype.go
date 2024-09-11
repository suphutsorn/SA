package entity

import (
	
	"gorm.io/gorm"
)

type RewardType struct {
	gorm.Model
	
	Rewardtype string    `json:"rewardtype"`   // ชื่อของรางวัล
	
	// Foreign Key (FK)
    // FK ไปยัง Member
 	// ความสัมพันธ์กับ Member
	

	Reward []Reward `gorm:"foreignKey:RewardTypeID"`


	
}