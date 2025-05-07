DROP TABLE IF EXISTS pokemon_moves;
DROP TABLE IF EXISTS pokemon_abilities;
DROP TABLE IF EXISTS pokemon_types;
DROP TABLE IF EXISTS move;
DROP TABLE IF EXISTS pokemon;

CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dex_number INTEGER,
    image_url VARCHAR(255) NOT NULL,
    generation INTEGER NOT NULL
);

CREATE TABLE pokemon_abilities (
    pokemon_id INTEGER NOT NULL,
    ability_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (pokemon_id, ability_name),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id) ON DELETE CASCADE
);

CREATE TABLE pokemon_types (
    pokemon_id INTEGER NOT NULL,
    type_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (pokemon_id, type_name),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id) ON DELETE CASCADE
);

CREATE TABLE move (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    type VARCHAR(50)
);

CREATE TABLE pokemon_moves (
    pokemon_id INTEGER NOT NULL,
    move_id INTEGER NOT NULL,
    PRIMARY KEY (pokemon_id, move_id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id) ON DELETE CASCADE,
    FOREIGN KEY (move_id) REFERENCES move(id) ON DELETE CASCADE
);

CREATE TABLE gym_team(
    id SERIAL PRIMARY KEY,
    ace_pokemon VARCHAR(100) NOT NULL,
    gym_type VARCHAR(50) NOT NULL,
    FOREIGN_KEY(ace_pokemon) REFERENCES pokemon(name) ON DELETE CASCADE
);

CREATE TABLE gym_pokemon(
    gym_id INTEGER NOT NULL,
    pokemon_id INTEGER NOT NULL,
    PRIMARY KEY (gym_id, pokemon_id),
    FOREIGN KEY (gym_id) REFERENCES gym_team(id) ON DELETE CASCADE,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id) ON DELETE CASCADE
);

CREATE TABLE gym_pokemon_learnset(
    gym_id INTEGER NOT NULL,}
    pokemon_id INTEGER NOT NULL,
    move_id INTEGER NOT NULL,
    PRIMARY KEY (gym_id, pokemon_id, move_id),
    FOREIGN KEY (gym_id) REFERENCES gym_team(id) ON DELETE CASCADE,
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id) ON DELETE CASCADE,
    FOREIGN KEY (move_id) REFERENCES move(id) ON DELETE CASCADE
);