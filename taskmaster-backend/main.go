package main

import (
	"github.com/TMendesO/taskmaster-backend/controllers"
	"github.com/TMendesO/taskmaster-backend/models"
	"github.com/TMendesO/taskmaster-backend/routes"
	"go.uber.org/zap"
)

func main() {
	logger, _ := zap.NewProduction()
	defer logger.Sync()

	models.InitDatabase()

	router := routes.SetupRouter()

	go controllers.HandleMessages()

	router.GET("/ws", controllers.WebSocketHandler)

	logger.Info("Server running at port 8080")
	router.Run(":8080")
}
