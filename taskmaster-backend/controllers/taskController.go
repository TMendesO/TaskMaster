package controllers

import (
	"net/http"

	"github.com/TMendesO/taskmaster-backend/models"
	"github.com/gin-gonic/gin"
)

func GetTask(c *gin.Context) {
	var task models.Task
	id := c.Param("id")

	if err := models.DB.Where("id = ?", id).First(&task).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}
	c.JSON(http.StatusOK, task)
}

func GetTasks(c *gin.Context) {
	var tasks []models.Task
	models.DB.Find(&tasks)
	c.JSON(http.StatusOK, tasks)
}

func CreateTask(c *gin.Context) {
	var task models.Task

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	task.UserID = user.(models.User).ID
	task.Status = "Aberto" // Inicializa a tarefa com status "Aberto"

	if err := models.DB.Create(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, task)
}

func UpdateTask(c *gin.Context) {
	var task models.Task
	id := c.Param("id")

	if err := models.DB.Where("id = ?", id).First(&task).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := models.DB.Save(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	models.DB.Save(&task)
	c.JSON(http.StatusOK, task)
}

func DeleteTask(c *gin.Context) {
	var task models.Task
	id := c.Param("id")

	if err := models.DB.Where("id = ?", id).First(&task).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	if err := models.DB.Delete(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Task deleted successfully"})
}

func UpdateTaskStatus(c *gin.Context) {
	var task models.Task
	id := c.Param("id")

	if err := models.DB.Where("id = ?", id).First(&task).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	var input struct {
		Status string `json:"status"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task.Status = input.Status
	models.DB.Save(&task)
	c.JSON(http.StatusOK, task)
}

func GetStats(c *gin.Context) {
	var stats []struct {
		Month     string
		Status    string
		TaskCount int
	}

	models.DB.Raw(`
		SELECT 
			TO_CHAR(DATE_TRUNC('month', updated_at), 'Mon') AS month, 
			status,
			COUNT(*) AS task_count
		FROM tasks 
		WHERE updated_at > NOW() - INTERVAL '1 year'
			AND deleted_at IS NULL  
		GROUP BY DATE_TRUNC('month', updated_at), status
		ORDER BY DATE_TRUNC('month', updated_at), status
	`).Scan(&stats)

	data := map[string]interface{}{
		"months":    []string{},
		"open":      []int{},
		"pending":   []int{},
		"completed": []int{},
	}

	for _, stat := range stats {
		data["months"] = appendIfMissing(data["months"].([]string), stat.Month)

		switch stat.Status {
		case "Aberto":
			data["open"] = append(data["open"].([]int), stat.TaskCount)
		case "Pendente":
			data["pending"] = append(data["pending"].([]int), stat.TaskCount)
		case "Completo":
			data["completed"] = append(data["completed"].([]int), stat.TaskCount)
		}

	}

	c.JSON(http.StatusOK, data)

}

func appendIfMissing(slice []string, s string) []string {
	for _, v := range slice {
		if v == s {
			return slice
		}
	}
	return append(slice, s)
}
