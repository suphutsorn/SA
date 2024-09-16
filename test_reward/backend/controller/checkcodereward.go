package controller

import (
	"log"
	"net/http"
	"project/config"
	"project/entity"
	"github.com/gin-gonic/gin"
)

// CheckCodeReward ตรวจสอบว่าโค้ดสามารถใช้งานได้หรือไม่ และดึงข้อมูลรางวัลและสมาชิกที่สัมพันธ์กัน
// CreateCodeReward เป็นฟังก์ชันสำหรับบันทึกโค้ดแลกเปลี่ยน (CodeReward)
func CheckCodeReward(c *gin.Context) {
    // เชื่อมต่อฐานข้อมูล
    db := config.DB()

    // สร้างตัวแปรสำหรับรับข้อมูลจาก JSON
    var codeReward entity.CodeReward

    // ตรวจสอบการรับข้อมูล JSON และแปลงเป็น struct ของ CodeReward
    if err := c.ShouldBindJSON(&codeReward); err != nil {
        log.Println("JSON Binding Error:", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON data"})
        return
    }

    // ตรวจสอบว่ามี Reward ที่สัมพันธ์กันหรือไม่
    var reward entity.Reward
    if err := db.First(&reward, codeReward.RewardID).Error; err != nil {
        log.Println("Reward Not Found:", err)
        c.JSON(http.StatusNotFound, gin.H{"error": "Reward not found"})
        return
    }

    // ตรวจสอบว่ามีโค้ดแลกเปลี่ยนสำหรับรางวัลนี้อยู่แล้วหรือไม่
    var existingCodeReward entity.CodeReward
    if err := db.Where("reward_id = ?", codeReward.RewardID).First(&existingCodeReward).Error; err == nil {
        // ถ้ามีโค้ดสำหรับรางวัลนี้อยู่แล้ว ให้แจ้งกลับ
        c.JSON(http.StatusConflict, gin.H{"error": "Code already generated for this reward"})
        return
    }

    // ถ้าไม่พบโค้ดแล้วก็สร้างโค้ดใหม่
    codeReward.Status = true
    if err := db.Create(&codeReward).Error; err != nil {
        log.Println("Database Save Error:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save code reward"})
        return
    }

    // ดึงข้อมูล CodeReward พร้อมข้อมูล Reward และ Member ที่สัมพันธ์กัน
    var savedCodeReward entity.CodeReward
    if err := db.Preload("Reward").Preload("Reward.Member").First(&savedCodeReward, codeReward.ID).Error; err != nil {
        log.Println("Failed to Preload Related Data:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load related data"})
        return
    }

    // ส่งข้อมูลโค้ดที่ถูกต้องกลับไปพร้อมกับรางวัลและสมาชิก
    log.Printf("CodeReward saved successfully: %+v\n", savedCodeReward)
    c.JSON(http.StatusOK, gin.H{
        "message": "Code is valid",
        "data":    savedCodeReward,
        "reward":  savedCodeReward.Reward,       // ข้อมูลรางวัล
        "member":  savedCodeReward.Reward.Member, // ข้อมูลสมาชิก
    })
}
