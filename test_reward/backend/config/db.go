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

	// AutoMigrate ข้อมูลของ Table ต่าง ๆ
	err := db.AutoMigrate(
		&entity.Gender{},
		&entity.Member{},
		&entity.Reward{},
		&entity.CodeReward{},
		
	)

	if err != nil {
		fmt.Println("Error in AutoMigrate:", err)
	} else {
		fmt.Println("AutoMigrate completed successfully.")
	}

	// สร้างข้อมูลเพศ
	GenderMale := entity.Gender{Name: "Male"}
	GenderFemale := entity.Gender{Name: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Gender{Name: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Gender{Name: "Female"})

	// อัปเดต GenderID หลังจาก FirstOrCreate
	if err := db.First(&GenderMale, "name = ?", "Male").Error; err != nil {
		fmt.Println("Error fetching GenderMale:", err)
	}
	if err := db.First(&GenderFemale, "name = ?", "Female").Error; err != nil {
		fmt.Println("Error fetching GenderFemale:", err)
	}

	// สร้างข้อมูลสมาชิกคนที่หนึ่ง (sa@gmail.com)
	hashedPassword, _ := HashPassword("123456")
	Member1 := &entity.Member{
		UserName:   "sa1",
		FirstName:  "Software1",
		LastName:   "Analysis1",
		Email:      "sa@gmail.com",
		Password:   hashedPassword,
		GenderID:   GenderMale.ID,
		TotalPoint: 100,
		Role:       "customer",
	}
	db.FirstOrCreate(Member1, &entity.Member{
		Email: "sa@gmail.com",
	})

	// สร้างข้อมูลสมาชิกคนที่สอง (sa2@gmail.com)
	hashedPassword2, _ := HashPassword("123456")
	Member2 := &entity.Member{
		UserName:   "sa2",
		FirstName:  "Software2",
		LastName:   "Analysis2",
		Email:      "sa2@gmail.com",
		Password:   hashedPassword2,
		GenderID:   GenderMale.ID,
		TotalPoint: 200,
		Role:       "customer",
	}
	db.FirstOrCreate(Member2, &entity.Member{
		Email: "sa2@gmail.com",
	})
	
	// ไม่จำเป็นต้องใช้ for _, member := range members เพราะยังไม่มี members slice
}
