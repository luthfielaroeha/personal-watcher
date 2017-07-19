package postgres

import (
	"os"
	"fmt"

	"github.com/jackc/pgx"
	sq "github.com/Masterminds/squirrel"
)

var conn *pgx.ConnPool

var psql sq.StatementBuilderType

func init() {
	var err error
	conn, err = pgx.NewConnPool(extractConfig())
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	psql = sq.StatementBuilder.PlaceholderFormat(sq.Dollar)
}

func extractConfig() pgx.ConnPoolConfig {
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
		config.Database = "colsys"
	}

	connPoolConfig := pgx.ConnPoolConfig{
		ConnConfig: config,
		MaxConnections: 90,
	}

	return connPoolConfig
}
