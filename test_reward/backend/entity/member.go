package entity

import "gorm.io/gorm"

type Member struct {
	gorm.Model
	Username   string    `json:"username"`       // ชื่อผู้ใช้
	Password   string    `json:"password"`       // รหัสผ่าน
	FirstName  string    `json:"first_name"`     // ชื่อจริง
	LastName   string    `json:"last_name"`      // นามสกุล
	Email      string    `json:"email"`          // อีเมล
	TotalPoint int       `json:"total_point"`    // คะแนนสะสมของผู้ใช้

	// One-to-Many Relationship
	Rewards    []Reward  `gorm:"foreignKey:MemberID" json:"rewards"`  // ความสัมพันธ์ One-to-Many กับ Reward
}
