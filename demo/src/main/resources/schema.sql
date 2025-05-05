DROP TABLE IF EXISTS "pokemon_moves";
DROP TABLE IF EXISTS "pokemon_abilities";
DROP TABLE IF EXISTS "pokemon_types";
DROP TABLE IF EXISTS "move";
DROP TABLE IF EXISTS "pokemon";

CREATE TABLE "pokemon" (
    "id" integer PRIMARY KEY,
    "name" text NOT NULL,
    "dex_number" integer,
    "image_url" text NOT NULL,
    "generation" integer NOT NULL
);

CREATE TABLE "pokemon_abilities" (
    "pokemon_id" integer NOT NULL,
    "ability_name" text NOT NULL,
    PRIMARY KEY (pokemon_id, ability_name),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

CREATE TABLE "pokemon_types" (
    "pokemon_id" integer NOT NULL,
    "type_name" text NOT NULL,
    PRIMARY KEY (pokemon_id, type_name),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id)
);

CREATE TABLE "move" (
    "id" SERIAL PRIMARY KEY,
    "name" text UNIQUE,
    "type" text
);

CREATE TABLE "pokemon_moves" (
    "pokemon_id" integer NOT NULL,
    "move_id" integer NOT NULL,
    PRIMARY KEY (pokemon_id, move_id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
    FOREIGN KEY (move_id) REFERENCES move(id)
);
