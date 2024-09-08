package entity

import (
	"time"
	"gorm.io/gorm"
)

type Reward struct {
	gorm.Model
	RewardName  string    `json:"reward_name"`   // ชื่อของรางวัล
	Discount    int       `json:"discount"`      // ส่วนลด
	Reward      string    `json:"reward"`        // รายละเอียดของรางวัล
	Ticket      string    `json:"ticket"`        // รายละเอียดของตั๋ว
	Status      string    `json:"status"`        // สถานะของรางวัล เช่น available หรือ redeemed
	Points      int       `json:"points"`        // จำนวนคะแนนที่ใช้แลกรางวัล (เปลี่ยนจาก string เป็น int)
	Reward_time  time.Time `json:"reward_time"`   // เวลาในการแลกรางวัล

	// Foreign Key (FK)
	MemberID  *uint    `json:"member_id"`        // FK ไปยัง Member
	Member    Member   `gorm:"foreignKey:MemberID"`  // ความสัมพันธ์กับ Member

	PaymentID *uint    `json:"payment_id"`       // FK ไปยัง Payment
	Payment   Payment  `gorm:"foreignKey:PaymentID"` // ความสัมพันธ์กับ Payment
}
