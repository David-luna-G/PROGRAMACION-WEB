CREATE TABLE IF NOT EXISTS jugadores (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    top_score_1 INT DEFAULT 0,
    top_score_2 INT DEFAULT 0,
    top_score_3 INT DEFAULT 0,
    ultimo_score INT DEFAULT 0,
    fecha_ultima_partida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jugadores (username, email, top_score_1, top_score_2, top_score_3, ultimo_score)
VALUES ('PlayerOne', 'player1@game.com', 1500, 1200, 900, 1500);