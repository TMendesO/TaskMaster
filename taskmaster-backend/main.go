package main

import (
	"github.com/TMendesO/taskmaster-backend/models"
	"github.com/TMendesO/taskmaster-backend/routes"
)

func main() {

	models.InitDatabase()

	router := routes.SetupRouter()

	router.Run(":8080")
}
