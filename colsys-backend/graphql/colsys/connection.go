package colsys

import (
	"github.com/jackc/pgx"
	"os"
	"fmt"
)

var conn *pgx.Conn

func init() {
	var err error
	conn, err = pgx.Connect(extractConfig())
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
}

func extractConfig() pgx.ConnConfig {
	var config pgx.ConnConfig

	config.Host = os.Getenv("COLSYS_DB_HOST")
	if config.Host == "" {
		config.Host = "10.151.32.111"
	}

	config.User = os.Getenv("COLSYS_DB_USER")
	if config.User == "" {
		config.User = "postgres"
	}

	config.Password = os.Getenv("COLSYS_DB_PASSWORD")
	config.Password = ""

	config.Database = os.Getenv("COLSYS_DB_DATABASE")
	if config.Database == "" {
		config.Database = "postgres"
	}

	return config
}
