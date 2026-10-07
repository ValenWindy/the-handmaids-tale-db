PRAGMA foreign_keys = ON;

-- Lookup tables (relaciones 1:N hacia characters)
CREATE TABLE categories (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE actors (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE seasons (
  id     INTEGER PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE CHECK (number > 0)
);

-- Episodio pertenece a una temporada (1:N)
CREATE TABLE episodes (
  id        INTEGER PRIMARY KEY,
  season_id INTEGER NOT NULL REFERENCES seasons(id) ON DELETE CASCADE,
  number    INTEGER NOT NULL CHECK (number > 0),
  title     TEXT,
  UNIQUE (season_id, number)
);

-- Tabla principal
CREATE TABLE characters (
  id               INTEGER PRIMARY KEY,
  slug             TEXT NOT NULL UNIQUE,
  title            TEXT,                      -- tratamiento opcional, ej. 'Dr.'
  first_name       TEXT NOT NULL,
  last_name        TEXT,                      -- NULL = desconocido
  gender           TEXT CHECK (gender IN ('female','male')),   -- para concordar el texto en español (Viva/Vivo); NULL = sin dato
  status           TEXT NOT NULL DEFAULT 'unknown'
                   CHECK (status IN ('alive','dead','unknown')),
  category_id      INTEGER NOT NULL REFERENCES categories(id),
  actor_id         INTEGER REFERENCES actors(id) ON DELETE SET NULL,
  first_episode_id INTEGER REFERENCES episodes(id) ON DELETE SET NULL,
  description_es   TEXT,                      -- descripción en español (NULL = sin cargar)
  description_en   TEXT,                      -- descripción en inglés (NULL = sin cargar)
  image_url        TEXT
);

-- 1:N personaje -> nombres de Handmaid (una criada puede cambiar de nombre
-- cada vez que la asignan a un nuevo Comandante: Ofwarren, Ofdaniel, etc.)
-- Un mismo nombre lo pueden llevar distintas criadas a lo largo de la serie
-- (Ofglen #1, Ofglen #2...): holder_number es la n-ésima en usarlo.
CREATE TABLE handmaid_names (
  id            INTEGER PRIMARY KEY,
  character_id  INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  position      INTEGER NOT NULL CHECK (position > 0),   -- orden en que los usó (1 = el primero)
  holder_number INTEGER CHECK (holder_number IS NULL OR holder_number > 0),  -- NULL = sin numerar
  UNIQUE (character_id, name),
  UNIQUE (character_id, position)
);

-- Dos criadas no pueden ser "Ofjoseph #1" a la vez: el par (nombre, número) es único
-- cuando el número existe.
CREATE UNIQUE INDEX uq_handmaid_name_holder
  ON handmaid_names(name, holder_number)
  WHERE holder_number IS NOT NULL;

-- N:N personaje <-> temporada
CREATE TABLE character_seasons (
  character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  season_id    INTEGER NOT NULL REFERENCES seasons(id)    ON DELETE CASCADE,
  PRIMARY KEY (character_id, season_id)
);

-- N:N personaje <-> personaje (auto-relación)
CREATE TABLE character_relationships (
  id                   INTEGER PRIMARY KEY,
  character_id         INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  related_character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  relationship_type    TEXT NOT NULL
    CHECK (relationship_type IN
      ('family','partner','friend','enemy','companion','superior','other')),
  note                 TEXT,
  CHECK (character_id <> related_character_id),
  UNIQUE (character_id, related_character_id, relationship_type)
);

-- Índices para las columnas que vamos a filtrar o usar en JOINs.
-- handmaid_names no necesita uno propio por character_id: el UNIQUE (character_id, ...) ya sirve.
CREATE INDEX idx_characters_category ON characters(category_id);
CREATE INDEX idx_characters_status   ON characters(status);
CREATE INDEX idx_characters_actor    ON characters(actor_id);
CREATE INDEX idx_char_seasons_season ON character_seasons(season_id);
CREATE INDEX idx_rel_related         ON character_relationships(related_character_id);
