package controller

import (
	"net/http"
	"project/config"  // ชื่อโปรเจคของคุณ
	"project/entity"
	"github.com/gin-gonic/gin"
)

// POST /api/redeem
func RedeemReward(c *gin.Context) {
    // Struct ชั่วคราวสำหรับรับข้อมูลจาก frontend
    var requestData struct {
        UserName   string `json:"userName"`
        RewardName string `json:"rewardName"`
        PointsUsed int    `json:"pointsUsed"`
    }

    // รับข้อมูล JSON จาก body ของคำขอ
    if err := c.ShouldBindJSON(&requestData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }

    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล (ค้นหาจาก username)
    var user entity.Member
    db := config.DB()
    if err := db.Where("username = ?", requestData.UserName).First(&user).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    // ตรวจสอบว่าผู้ใช้มีคะแนนเพียงพอหรือไม่
    if user.TotalPoint >= requestData.PointsUsed {
        // ลดคะแนนของผู้ใช้
        user.TotalPoint -= requestData.PointsUsed

        // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
        if err := db.Save(&user).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user points"})
            return
        }

        // ดึงข้อมูลรางวัลจากฐานข้อมูล (ค้นหาจากชื่อรางวัล)
        var reward entity.Reward
        if err := db.Where("reward_name = ?", requestData.RewardName).First(&reward).Error; err != nil {
            c.JSON(http.StatusNotFound, gin.H{"error": "Reward not found"})
            return
        }

        // เปลี่ยนสถานะของรางวัลเป็น "redeemed"
        reward.Status = "redeemed"
        if err := db.Save(&reward).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update reward status"})
            return
        }

        // ส่งข้อมูลกลับไปยัง Frontend
        c.JSON(http.StatusOK, gin.H{
            "message":         "Reward redeemed successfully!",
            "remainingPoints": user.TotalPoint,
        })
    } else {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Not enough points"})
    }
}
