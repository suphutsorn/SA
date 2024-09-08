package config

import (
	"fmt"
	"time"
	"project/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"sync"
)

var db *gorm.DB
var once sync.Once

// DB ฟังก์ชันคืนค่าอินสแตนซ์ของฐานข้อมูลที่เชื่อมต่อแล้ว
func DB() *gorm.DB {
	return db
}

// ConnectionDB ฟังก์ชันที่เชื่อมต่อกับฐานข้อมูล SQLite
func ConnectionDB() {
	// ใช้ sync.Once เพื่อป้องกันการเชื่อมต่อซ้ำ
	once.Do(func() {
		database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
		if err != nil {
			log.Fatalf("Failed to connect to database: %v", err)
		}

		// กำหนดค่าให้กับตัวแปร db
		db = database

		// ทำการ AutoMigrate เพื่อสร้างหรืออัปเดตตารางตามโครงสร้าง
		err = db.AutoMigrate(&entity.Member{}, &entity.Reward{})
		if err != nil {
			log.Fatalf("Failed to auto-migrate: %v", err)
		}

		fmt.Println("Connected to the database and migrated successfully")
	})
}

// CloseDB ปิดการเชื่อมต่อฐานข้อมูลอย่างถูกต้อง
func CloseDB() {
	sqlDB, err := db.DB() // ดึง connection ที่ใช้งานจริง (SQL connection)
	if err != nil {
		log.Fatalf("Failed to get SQL DB: %v", err)
	}
	err = sqlDB.Close()
	if err != nil {
		log.Fatalf("Failed to close the database: %v", err)
	} else {
		fmt.Println("Database connection closed")
	}
}


func SetupDatabase() {

	db.AutoMigrate(
		&entity.Member{},
		&entity.Reward{},
		
	)

}

// SeedRewardData เป็นฟังก์ชันที่ใช้ในการเพิ่มข้อมูลรางวัลเริ่มต้นลงในฐานข้อมูล
func SeedRewardData(db *gorm.DB) {
	var rewards = []entity.Reward{
		{RewardName: "Coupon 1", Discount: 10, Reward: "Free Coffee", Ticket: "Movie Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 2", Discount: 15, Reward: "Free Drink", Ticket: "Concert Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 3", Discount: 20, Reward: "Free Meal", Ticket: "Flight Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 4", Discount: 25, Reward: "Discount on Electronics", Ticket: "Bus Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 5", Discount: 30, Reward: "Free Dessert", Ticket: "Train Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 6", Discount: 35, Reward: "Free Pizza", Ticket: "Cruise Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 7", Discount: 40, Reward: "Free Sandwich", Ticket: "Theme Park Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 8", Discount: 45, Reward: "Free Sushi", Ticket: "Museum Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 9", Discount: 50, Reward: "Discount on Hotel", Ticket: "Event Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 10", Discount: 55, Reward: "Free Ice Cream", Ticket: "Soccer Game Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 11", Discount: 60, Reward: "Free Coffee", Ticket: "Football Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 12", Discount: 65, Reward: "Discount on Clothing", Ticket: "Music Festival Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 13", Discount: 70, Reward: "Discount on Accessories", Ticket: "Theater Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 14", Discount: 75, Reward: "Discount on Shoes", Ticket: "Basketball Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 15", Discount: 80, Reward: "Free Drinks", Ticket: "Volleyball Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 16", Discount: 85, Reward: "Discount on Furniture", Ticket: "Art Show Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 17", Discount: 90, Reward: "Free Spa Session", Ticket: "Movie Premiere Ticket", Status: "success", Reward_time: time.Now()},
		{RewardName: "Coupon 18", Discount: 95, Reward: "Free Haircut", Ticket: "Tennis Match Ticket", Status: "success", Reward_time: time.Now()},
	}

	// Seed ข้อมูลในฐานข้อมูล
	for _, reward := range rewards {
		// ตรวจสอบว่ารางวัลนั้นมีอยู่ในฐานข้อมูลหรือไม่ ถ้าไม่มี ให้เพิ่มข้อมูล
		if err := db.Where("reward_name = ?", reward.RewardName).FirstOrCreate(&reward).Error; err != nil {
			fmt.Println("Failed to seed reward data:", err)
		} else {
			fmt.Println("Reward seeded:", reward.RewardName)
		}
	}
}

// ฟังก์ชันเพื่อจำลองการคลิกแล้วเปลี่ยนสถานะเป็น "change"
func UpdateRewardStatusOnClick(db *gorm.DB, rewardID uint) {
	var reward entity.Reward
	if err := db.First(&reward, rewardID).Error; err != nil {
		fmt.Println("Reward not found:", err)
		return
	}

	// เมื่อคลิก (หรือทำงานอื่นๆ) ให้เปลี่ยนสถานะเป็น "change"
	reward.Status = "change"
	if err := db.Save(&reward).Error; err != nil {
		fmt.Println("Failed to update reward status:", err)
		return
	}

	fmt.Println("Reward status updated to 'change' for:", reward.RewardName)
}


