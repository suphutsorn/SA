package routes

import (
	"github.com/gin-gonic/gin"
	"project/controller"  // ชื่อโปรเจคของคุณ
)

func RewardRoutes(r *gin.Engine) {
	r.POST("/api/redeem", controller.RedeemReward)  // เชื่อมต่อกับฟังก์ชัน RedeemReward ใน controller
}
