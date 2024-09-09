
package config

import (
	"fmt"
	"project/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.Member{},
		&entity.Reward{},
	)

	members := []entity.Member{
		{
			Username:   "john_doe",
			Password:   "password123",
			FirstName:  "John",
			LastName:   "Doe",
			Email:      "john.doe@example.com",
			TotalPoint: 100,
		},
		{
			Username:   "jane_smith",
			Password:   "password456",
			FirstName:  "Jane",
			LastName:   "Smith",
			Email:      "jane.smith@example.com",
			TotalPoint: 150,
		},
	}

	for _, member := range members {
		// ตรวจสอบว่าสมาชิกมีอยู่ในฐานข้อมูลหรือไม่ ถ้าไม่มี ให้เพิ่มข้อมูล
		if err := db.Where("email = ?", member.Email).FirstOrCreate(&member).Error; err != nil {
			fmt.Println("Failed to seed member data:", err)
		} else {
			fmt.Println("Member seeded:", member.FirstName, member.LastName)
		}
	}

	
	

	
}