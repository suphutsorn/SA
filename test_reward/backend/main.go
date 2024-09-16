package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "project/config"     // เชื่อมต่อกับการตั้งค่า database ที่แยกออกมา
    "project/controller" // Import controller
)

const PORT = "8001"

func main() {

    // open connection database
    config.ConnectionDB()

    // Generate databases
    config.SetupDatabase()

    r := gin.Default()

    r.Use(CORSMiddleware())

    // เปลี่ยนเส้นทางของกลุ่ม route ให้มี prefix เป็น /api
    router := r.Group("/api")
    {
        // Reward Routes
        router.GET("/rewards", controller.ListRewards)          // เส้นทางสำหรับดึงข้อมูลรางวัลทั้งหมด
        router.GET("/rewards/:id", controller.GetReward)        // ดึงข้อมูลรางวัลตาม ID
        router.POST("/rewards", controller.CreateReward)        // สร้างรางวัล
        router.PATCH("/rewards/:id", controller.UpdateReward)   // อัปเดตรางวัล
        router.DELETE("/rewards/:id", controller.DeleteReward)  // ลบรางวัล

        // Route สำหรับการล็อกอิน
        router.POST("/signin", controller.Signin)

        // Member Routes
        router.GET("/members", controller.ListMembers)
        router.GET("/members/:id", controller.GetMember)
        router.POST("/members", controller.CreateMember)
        router.PATCH("/members/:id", controller.UpdateMember)
        router.DELETE("/members/:id", controller.DeleteMember)
        router.GET("/mrewards/:member_id", controller.GetRewardsByMemberID)

        // CodeReward Routes
        router.POST("/codereward", controller.CreateCodeReward) // เส้นทางสำหรับสร้างโค้ดแลกเปลี่ยน
		router.GET("/check-code-reward", controller.GetCodeReward) // เส้นทางสำหรับดึงข้อมูลโค้ดแลกเปลี่ยน

		
    }

    // ทดสอบ API
    r.GET("/", func(c *gin.Context) {
        c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
    })

    // Run the server
    r.Run("localhost:" + PORT)
}

// ฟังก์ชันจัดการ CORS
func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}
