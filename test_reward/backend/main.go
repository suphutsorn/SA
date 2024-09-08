package main

import (
	"github.com/gin-gonic/gin"
	"project/routes"
	"project/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"project/config"
)

func main() {
	// เชื่อมต่อฐานข้อมูล
	db, err := gorm.Open(sqlite.Open("reward.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// ทำการ Migrate ตาราง
	db.AutoMigrate(&entity.Reward{}, &entity.Member{}, &entity.Payment{}, &entity.Seat{}, &entity.Ticket{})

	// ทำการ Seed ข้อมูล
	config.SeedRewardData(db)


	// ตั้งค่า Gin router
	r := gin.Default()

	// เรียกฟังก์ชันเพื่อตั้งค่าเส้นทางของรางวัล
	routes.RewardRoutes(r)

	// เริ่มเซิร์ฟเวอร์ที่ port 8080
	r.Run(":8080")


}
