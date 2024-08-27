package routes

import (
	"github.com/TMendesO/taskmaster-backend/controllers"
	"github.com/TMendesO/taskmaster-backend/middlewares"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Rotas públicas
	router.POST("/auth/register", controllers.Register)
	router.POST("/auth/login", controllers.Login)

	// Rotas protegidas
	auth := router.Group("/")
	auth.Use(middlewares.AuthMiddleware())
	{
		auth.GET("/tasks", controllers.GetTasks)
		auth.GET("/tasks/:id", controllers.GetTask)
		auth.GET("/stats", controllers.GetStats)
		auth.POST("/tasks", controllers.CreateTask)
		auth.PUT("/tasks/:id", controllers.UpdateTask)
		auth.PUT("/tasks/:id/status", controllers.UpdateTaskStatus)
		auth.DELETE("/tasks/:id", controllers.DeleteTask)
	}

	return router
}
