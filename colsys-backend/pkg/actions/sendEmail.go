package actions

import (
	"log"
	"net/smtp"

	"colsys-backend/pkg/domain"
)

func sendEmail(to string, subject string, content string) {
	from := "luthfie13@mhs.if.its.ac.id"

	auth := smtp.PlainAuth(
		"",
		from,
		"rahasia",
		"smtp.gmail.com",
	)

	msg := "From: " + from + "\n" +
			"To: " + to + "\n" +
			"Subject: " + subject + "\n\n" +
			content

	log.Println("Trying to send email to " + to)
	err := smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		from,
		[]string{to},
		[]byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return
	}

	log.Println("Email sent to " + to);
}

func SendEmail(invokedRule *domain.InvokedRule) {
	// emailContent := invokedRule.Rule.Name + " has been fullfilled\n" +
	// 				"Data : " + invokedRule.Data

	// sendEmail("wvhiegt@gmail.com", "ColSys - Information", emailContent)
}
