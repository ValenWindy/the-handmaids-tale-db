-- 1. CATEGORÍAS
INSERT INTO categories (name) VALUES
  ('Handmaid'), ('Wife'), ('Commander'), ('Martha'), ('Aunt'), ('Econowife'), ('Otro');

-- 2. TEMPORADAS
INSERT INTO seasons (number) VALUES (1), (2), (3), (4), (5), (6);

-- 3. ACTORES Y ACTRICES
INSERT INTO actors (name) VALUES
  ('Elisabeth Moss'), ('Yvonne Strahovski'), ('Joseph Fiennes'),
  ('Max Minghella'), ('O-T Fagbenle'), ('Ann Dowd'),
  ('Bradley Whitford'), ('Julie Dretzin'), ('Ever Carradine'),
  ('Amanda Brugel'), ('Madeline Brewer'),
  ('Alexis Bledel'), ('Samira Wiley'), ('Nina Kiri'),
  ('Kristen Gutoskie'), ('Clea DuVall'), ('Victoria Fodor'),
  ('Sam Jaeger'), ('Stephen Kunken'),
  ('Josh Charles'), ('Carey Cox'), ('Sydney Sweeney');

-- 4. PERSONAJES
INSERT INTO characters
  (slug, title, first_name, last_name, gender, status, category_id, actor_id)
VALUES
  -- Commanders
  ('fred-waterford', NULL, 'Fred', 'Waterford', 'male', 'dead',
    (SELECT id FROM categories WHERE name = 'Commander'),
    (SELECT id FROM actors WHERE name = 'Joseph Fiennes')),
  ('joseph-lawrence', NULL, 'Joseph', 'Lawrence', 'male', 'dead',
    (SELECT id FROM categories WHERE name = 'Commander'),
    (SELECT id FROM actors WHERE name = 'Bradley Whitford')),
  ('nick-blaine', NULL, 'Nick', 'Blaine', 'male', 'dead',
    (SELECT id FROM categories WHERE name = 'Commander'),
    (SELECT id FROM actors WHERE name = 'Max Minghella')),
  ('warren-putnam', NULL, 'Warren', 'Putnam', 'male', 'dead',
    (SELECT id FROM categories WHERE name = 'Commander'),
    (SELECT id FROM actors WHERE name = 'Stephen Kunken')),
  ('gabriel-wharton', NULL, 'Gabriel', 'Wharton', 'male', 'dead',
    (SELECT id FROM categories WHERE name = 'Commander'),
    (SELECT id FROM actors WHERE name = 'Josh Charles')),

  -- Wives
  ('serena-joy-waterford', NULL, 'Serena Joy', 'Waterford', 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Wife'),
    (SELECT id FROM actors WHERE name = 'Yvonne Strahovski')),
  ('eleanor-lawrence', NULL, 'Eleanor', 'Lawrence', 'female', 'dead',
    (SELECT id FROM categories WHERE name = 'Wife'),
    (SELECT id FROM actors WHERE name = 'Julie Dretzin')),
  ('naomi-putnam', NULL, 'Naomi', 'Putnam', 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Wife'),
    (SELECT id FROM actors WHERE name = 'Ever Carradine')),
  ('rose-blaine', NULL, 'Rose', 'Blaine', 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Wife'),
    (SELECT id FROM actors WHERE name = 'Carey Cox')),

  -- Econowife
  ('eden-spencer', NULL, 'Eden', 'Spencer', 'female', 'dead',
    (SELECT id FROM categories WHERE name = 'Econowife'),
    (SELECT id FROM actors WHERE name = 'Sydney Sweeney')),

  -- Marthas
  ('rita-blue', NULL, 'Rita', 'Blue', 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Martha'),
    (SELECT id FROM actors WHERE name = 'Amanda Brugel')),
  ('beth', NULL, 'Beth', NULL, 'female', 'dead',
    (SELECT id FROM categories WHERE name = 'Martha'),
    (SELECT id FROM actors WHERE name = 'Kristen Gutoskie')),
  ('cora', NULL, 'Cora', NULL, 'female', 'unknown',
    (SELECT id FROM categories WHERE name = 'Martha'),
    (SELECT id FROM actors WHERE name = 'Victoria Fodor')),

  -- Handmaids
  ('june-osborne', NULL, 'June', 'Osborne', 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Handmaid'),
    (SELECT id FROM actors WHERE name = 'Elisabeth Moss')),
  ('emily-malek', 'Dr.', 'Emily', 'Malek', 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Handmaid'),
    (SELECT id FROM actors WHERE name = 'Alexis Bledel')),
  ('janine-lindo', NULL, 'Janine', 'Lindo', 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Handmaid'),
    (SELECT id FROM actors WHERE name = 'Madeline Brewer')),
  ('alma', NULL, 'Alma', NULL, 'female', 'dead',
    (SELECT id FROM categories WHERE name = 'Handmaid'),
    (SELECT id FROM actors WHERE name = 'Nina Kiri')),

  -- Aunt
  ('lydia-clements', NULL, 'Lydia', 'Clements', 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Aunt'),
    (SELECT id FROM actors WHERE name = 'Ann Dowd')),

  -- Otros
  ('luke-bankole', NULL, 'Luke', 'Bankole', 'male', 'alive',
    (SELECT id FROM categories WHERE name = 'Otro'),
    (SELECT id FROM actors WHERE name = 'O-T Fagbenle')),
  ('mark-tuello', NULL, 'Mark', 'Tuello', 'male', 'alive',
    (SELECT id FROM categories WHERE name = 'Otro'),
    (SELECT id FROM actors WHERE name = 'Sam Jaeger')),
  ('moira-strand', NULL, 'Moira', 'Strand', 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Otro'),
    (SELECT id FROM actors WHERE name = 'Samira Wiley')),
  ('sylvia', NULL, 'Sylvia', NULL, 'female', 'alive',
    (SELECT id FROM categories WHERE name = 'Otro'),
    (SELECT id FROM actors WHERE name = 'Clea DuVall'));

-- 5. NOMBRES DE CRIADAS (HANDMAID NAMES)
INSERT INTO handmaid_names (character_id, name, position, holder_number) VALUES
  -- June
  ((SELECT id FROM characters WHERE slug = 'june-osborne'), 'Offred',   1, NULL),
  ((SELECT id FROM characters WHERE slug = 'june-osborne'), 'Ofjoseph', 2, 2),
  -- Emily
  ((SELECT id FROM characters WHERE slug = 'emily-malek'), 'Ofglen',    1, 1),
  ((SELECT id FROM characters WHERE slug = 'emily-malek'), 'Ofsteven',  2, NULL),
  ((SELECT id FROM characters WHERE slug = 'emily-malek'), 'Ofroy',     3, NULL),
  ((SELECT id FROM characters WHERE slug = 'emily-malek'), 'Ofjoseph',  4, 1),
  -- Janine
  ((SELECT id FROM characters WHERE slug = 'janine-lindo'), 'Ofwarren', 1, NULL),
  ((SELECT id FROM characters WHERE slug = 'janine-lindo'), 'Ofdaniel', 2, NULL),
  ((SELECT id FROM characters WHERE slug = 'janine-lindo'), 'Ofhoward', 3, NULL),
  ((SELECT id FROM characters WHERE slug = 'janine-lindo'), 'Ofjoseph', 4, 3),
  ((SELECT id FROM characters WHERE slug = 'janine-lindo'), 'Ofpaul',   5, NULL),
  -- Alma
  ((SELECT id FROM characters WHERE slug = 'alma'), 'Ofrobert',         1, NULL);

-- 6. RELACIONES ENTRE PERSONAJES
INSERT INTO character_relationships
  (character_id, related_character_id, relationship_type, note)
VALUES
  -- Parejas y Matrimonios
  ((SELECT id FROM characters WHERE slug = 'june-osborne'),
   (SELECT id FROM characters WHERE slug = 'luke-bankole'), 'partner', NULL),
  ((SELECT id FROM characters WHERE slug = 'june-osborne'),
   (SELECT id FROM characters WHERE slug = 'nick-blaine'), 'partner', NULL),
  ((SELECT id FROM characters WHERE slug = 'serena-joy-waterford'),
   (SELECT id FROM characters WHERE slug = 'fred-waterford'), 'partner', NULL),
  ((SELECT id FROM characters WHERE slug = 'joseph-lawrence'),
   (SELECT id FROM characters WHERE slug = 'eleanor-lawrence'), 'partner', NULL),
  ((SELECT id FROM characters WHERE slug = 'sylvia'),
   (SELECT id FROM characters WHERE slug = 'emily-malek'), 'partner', NULL),
  ((SELECT id FROM characters WHERE slug = 'naomi-putnam'),
   (SELECT id FROM characters WHERE slug = 'warren-putnam'), 'partner', NULL),
  ((SELECT id FROM characters WHERE slug = 'naomi-putnam'),
   (SELECT id FROM characters WHERE slug = 'joseph-lawrence'), 'partner', NULL),
  ((SELECT id FROM characters WHERE slug = 'nick-blaine'),
   (SELECT id FROM characters WHERE slug = 'eden-spencer'), 'partner', NULL),
  ((SELECT id FROM characters WHERE slug = 'nick-blaine'),
   (SELECT id FROM characters WHERE slug = 'rose-blaine'), 'partner', NULL),

  -- Familia y Paternidad
  ((SELECT id FROM characters WHERE slug = 'rose-blaine'),
   (SELECT id FROM characters WHERE slug = 'gabriel-wharton'), 'family', NULL),
  ((SELECT id FROM characters WHERE slug = 'nick-blaine'),
   (SELECT id FROM characters WHERE slug = 'gabriel-wharton'), 'family', NULL),

  -- Supervisión de Tía Lydia sobre las Criadas
  ((SELECT id FROM characters WHERE slug = 'lydia-clements'),
   (SELECT id FROM characters WHERE slug = 'june-osborne'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'lydia-clements'),
   (SELECT id FROM characters WHERE slug = 'janine-lindo'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'lydia-clements'),
   (SELECT id FROM characters WHERE slug = 'emily-malek'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'lydia-clements'),
   (SELECT id FROM characters WHERE slug = 'alma'), 'superior', NULL),

  -- Asignación de Criadas a Comandantes / Casas
  ((SELECT id FROM characters WHERE slug = 'fred-waterford'),
   (SELECT id FROM characters WHERE slug = 'june-osborne'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'joseph-lawrence'),
   (SELECT id FROM characters WHERE slug = 'june-osborne'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'joseph-lawrence'),
   (SELECT id FROM characters WHERE slug = 'emily-malek'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'warren-putnam'),
   (SELECT id FROM characters WHERE slug = 'janine-lindo'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'joseph-lawrence'),
   (SELECT id FROM characters WHERE slug = 'janine-lindo'), 'superior', NULL),

  -- Marthas bajo supervisión doméstica en sus respectivas casas
  ((SELECT id FROM characters WHERE slug = 'fred-waterford'),
   (SELECT id FROM characters WHERE slug = 'rita-blue'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'serena-joy-waterford'),
   (SELECT id FROM characters WHERE slug = 'rita-blue'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'joseph-lawrence'),
   (SELECT id FROM characters WHERE slug = 'beth'), 'superior', NULL),
  ((SELECT id FROM characters WHERE slug = 'joseph-lawrence'),
   (SELECT id FROM characters WHERE slug = 'cora'), 'superior', NULL),

  -- Relaciones y Contactos del Gobierno en el Exilio (Mark Tuello)
  ((SELECT id FROM characters WHERE slug = 'mark-tuello'),
   (SELECT id FROM characters WHERE slug = 'serena-joy-waterford'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'mark-tuello'),
   (SELECT id FROM characters WHERE slug = 'june-osborne'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'mark-tuello'),
   (SELECT id FROM characters WHERE slug = 'luke-bankole'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'mark-tuello'),
   (SELECT id FROM characters WHERE slug = 'moira-strand'), 'friend', NULL),

  -- Amistades y Aliadas de Resistencia
  ((SELECT id FROM characters WHERE slug = 'luke-bankole'),
  (SELECT id FROM characters WHERE slug = 'moira-strand'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'june-osborne'),
  (SELECT id FROM characters WHERE slug = 'moira-strand'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'june-osborne'),
  (SELECT id FROM characters WHERE slug = 'janine-lindo'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'june-osborne'),
  (SELECT id FROM characters WHERE slug = 'emily-malek'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'june-osborne'),
  (SELECT id FROM characters WHERE slug = 'alma'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'janine-lindo'),
  (SELECT id FROM characters WHERE slug = 'alma'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'janine-lindo'),
  (SELECT id FROM characters WHERE slug = 'emily-malek'), 'friend', NULL),
  ((SELECT id FROM characters WHERE slug = 'emily-malek'),
  (SELECT id FROM characters WHERE slug = 'alma'), 'friend', NULL);

-- 7. EPISODIOS
INSERT INTO episodes (season_id, number, title) VALUES
  ((SELECT id FROM seasons WHERE number = 1),  1, 'Offred'),
  ((SELECT id FROM seasons WHERE number = 1),  2, 'Birth Day'),
  ((SELECT id FROM seasons WHERE number = 1),  9, 'The Bridge'),
  ((SELECT id FROM seasons WHERE number = 2),  3, 'Unwomen'),
  ((SELECT id FROM seasons WHERE number = 2),  5, 'Seeds'),
  ((SELECT id FROM seasons WHERE number = 2),  9, 'Smart Power'),
  ((SELECT id FROM seasons WHERE number = 2), 12, 'Postpartum'),
  ((SELECT id FROM seasons WHERE number = 4),  4, 'Nolite Te Bastardes Carborundorum'),
  ((SELECT id FROM seasons WHERE number = 6),  2, 'Exile');

-- 8. PRIMERA APARICIÓN DE CADA PERSONAJE
-- S1 E1 "Offred"
UPDATE characters
SET first_episode_id = (SELECT e.id FROM episodes e JOIN seasons s ON s.id = e.season_id WHERE s.number = 1 AND e.number = 1)
WHERE slug IN ('alma', 'emily-malek', 'fred-waterford', 'janine-lindo', 'june-osborne', 'luke-bankole',
               'lydia-clements', 'serena-joy-waterford', 'rita-blue', 'moira-strand', 'nick-blaine');

-- S1 E2 "Birth Day"
UPDATE characters
SET first_episode_id = (SELECT e.id FROM episodes e JOIN seasons s ON s.id = e.season_id WHERE s.number = 1 AND e.number = 2)
WHERE slug = 'warren-putnam';

-- S1 E9 "The Bridge"
UPDATE characters
SET first_episode_id = (SELECT e.id FROM episodes e JOIN seasons s ON s.id = e.season_id WHERE s.number = 1 AND e.number = 9)
WHERE slug = 'beth';

-- S2 E3 "Unwomen"
UPDATE characters
SET first_episode_id = (SELECT e.id FROM episodes e JOIN seasons s ON s.id = e.season_id WHERE s.number = 2 AND e.number = 3)
WHERE slug = 'sylvia';

-- S2 E5 "Seeds"
UPDATE characters
SET first_episode_id = (SELECT e.id FROM episodes e JOIN seasons s ON s.id = e.season_id WHERE s.number = 2 AND e.number = 5)
WHERE slug = 'eden-spencer';

-- S2 E9 "Smart Power"
UPDATE characters
SET first_episode_id = (SELECT e.id FROM episodes e JOIN seasons s ON s.id = e.season_id WHERE s.number = 2 AND e.number = 9)
WHERE slug = 'mark-tuello';

-- S2 E12 "Postpartum"
UPDATE characters
SET first_episode_id = (SELECT e.id FROM episodes e JOIN seasons s ON s.id = e.season_id WHERE s.number = 2 AND e.number = 12)
WHERE slug IN ('cora', 'eleanor-lawrence', 'joseph-lawrence');

-- S4 E4 "Nolite Te Bastardes Carborundorum"
UPDATE characters
SET first_episode_id = (SELECT e.id FROM episodes e JOIN seasons s ON s.id = e.season_id WHERE s.number = 4 AND e.number = 4)
WHERE slug = 'naomi-putnam';

-- S6 E2 "Exile"
UPDATE characters
SET first_episode_id = (SELECT e.id FROM episodes e JOIN seasons s ON s.id = e.season_id WHERE s.number = 6 AND e.number = 2)
WHERE slug = 'gabriel-wharton';

-- 9. TEMPORADAS POR PERSONAJE
INSERT OR IGNORE INTO character_seasons (character_id, season_id)
SELECT c.id, s.id
FROM characters c
JOIN seasons s ON (
  -- Temporadas 1 a 6
  (c.slug IN ('june-osborne', 'serena-joy-waterford', 'nick-blaine', 'luke-bankole',
              'lydia-clements', 'janine-lindo', 'moira-strand', 'rita-blue', 'naomi-putnam') AND s.number IN (1, 2, 3, 4, 5, 6)) OR
  -- Temporadas 1 a 5
  (c.slug IN ('fred-waterford', 'warren-putnam') AND s.number IN (1, 2, 3, 4, 5)) OR
  -- Temporadas 1 a 4
  (c.slug = 'alma' AND s.number IN (1, 2, 3, 4)) OR
  -- Temporadas 2 a 6
  (c.slug IN ('joseph-lawrence', 'mark-tuello') AND s.number IN (2, 3, 4, 5, 6)) OR
  -- Temporadas 2 a 3
  (c.slug IN ('eleanor-lawrence', 'cora') AND s.number IN (2, 3)) OR
  -- Temporadas 1, 2, 3, 4, 6
  (c.slug = 'emily-malek' AND s.number IN (1, 2, 3, 4, 6)) OR
  -- Temporadas 2, 3, 5
  (c.slug = 'sylvia' AND s.number IN (2, 3, 5)) OR
  -- Temporadas 1, 3 y 4
  (c.slug = 'beth' AND s.number IN (1, 3, 4)) OR
  -- Temporada 2
  (c.slug = 'eden-spencer' AND s.number = 2) OR
  -- Temporadas 5 a 6
  (c.slug = 'rose-blaine' AND s.number IN (5, 6)) OR
  -- Temporada 6
  (c.slug = 'gabriel-wharton' AND s.number = 6)
);

-- 10. DESCRIPCIONES DE LOS PERSONAJES (INGLÉS Y ESPAÑOL)
UPDATE characters SET description_en = 'A Handmaid in Gilead and a key member of the Mayday resistance network who gathers and exchanges secret information.', description_es = 'Criada en Gilead y miembro clave de la red de resistencia Mayday que recopila e intercambia información secreta.' WHERE slug = 'alma';

UPDATE characters SET description_en = 'A Martha who works at Jezebels and later in the house of Commander Lawrence, serving as a key ally in the resistance and Mayday.', description_es = 'Martha que trabaja en Jezebels y más tarde en la casa del Comandante Lawrence, aliada clave en la resistencia y Mayday.' WHERE slug = 'beth';

UPDATE characters SET description_en = 'A Martha serving in the Lawrence household, primarily responsible for domestic chores and cooking.', description_es = 'Martha que trabaja en la casa de los Lawrence, encargada principalmente de las tareas domésticas y la cocina.' WHERE slug = 'cora';

UPDATE characters SET description_en = 'A devout young girl forced to marry Nick Blaine, whose tragic fate exposes the cruelty of the Gilead regime.', description_es = 'Joven devota obligada a casarse con Nick Blaine, cuyo trágico destino expone la crueldad del régimen de Gilead.' WHERE slug = 'eden-spencer';

UPDATE characters SET description_en = 'Wife of Commander Lawrence, tormented by guilt over Gilead atrocities and struggling with severe mental health issues.', description_es = 'Esposa del Comandante Lawrence, atormentada por la culpa de las atrocidades de Gilead y con graves problemas de salud mental.' WHERE slug = 'eleanor-lawrence';

UPDATE characters SET description_en = 'A biologist and Handmaid known as Ofglen, an active Mayday member who escapes to Canada after enduring severe torture.', description_es = 'Bióloga y Criada conocida como Deglen, miembro activo de Mayday que logra escapar a Canadá tras sufrir grandes torturas.' WHERE slug = 'emily-malek';

UPDATE characters SET description_en = 'A high-ranking Commander and one of the key architects of Gilead patriarchal and totalitarian regime.', description_es = 'Comandante de alto rango y uno de los arquitectos clave del régimen teocrático y patriarcal de Gilead.' WHERE slug = 'fred-waterford';

UPDATE characters SET description_en = 'A High Commander in Gilead, holding significant military and political authority within the regime.', description_es = 'Alto Comandante militar en Gilead, figura de gran autoridad estratégica y política dentro del régimen.' WHERE slug = 'gabriel-wharton';

UPDATE characters SET description_en = 'An emotionally vulnerable Handmaid who suffers severe trauma and maiming, yet maintains a resilient and compassionate spirit.', description_es = 'Criada emocionalmente vulnerable que sufre graves mutilaciones y traumas, pero mantiene un espíritu compasivo y resiliente.' WHERE slug = 'janine-lindo';

UPDATE characters SET description_en = 'An eccentric Commander and chief architect of Gilead economy, known for his ambiguous morality and unpredictable alliance with resistance forces.', description_es = 'Comandante excéntrico e ideólogo principal de la economía de Gilead, de moral ambigua y aliado impredecible de la resistencia.' WHERE slug = 'joseph-lawrence';

UPDATE characters SET description_en = 'The protagonist of the series and a key figure in the resistance against Gilead; forced to serve as a Handmaid under the name Offred, she fights tirelessly to rescue her daughter Hannah and dismantle the regime.', description_es = 'Protagonista de la historia y figura clave de la resistencia contra Gilead; obligada a servir como Criada bajo el nombre de Offred, lucha incansablemente por rescatar a su hija Hannah y desmantelar el régimen.' WHERE slug = 'june-osborne';

UPDATE characters SET description_en = 'Husband of June Osborne prior to Gilead, who escapes to Canada and fights endlessly to reunite with his family.', description_es = 'Esposo de June Osborne antes del ascenso de Gilead, que logra refugiarse en Canadá y lucha constantemente por recuperar a su familia.' WHERE slug = 'luke-bankole';

UPDATE characters SET description_en = 'A ruthless and disciplinarian Aunt in charge of training, indoctrinating, and controlling the Handmaids in Gilead.', description_es = 'Tía cruel y disciplinaria encargada del adoctrinamiento, entrenamiento y control estricto de las Criadas en Gilead.' WHERE slug = 'lydia-clements';

UPDATE characters SET description_en = 'A representative of the United States government-in-exile, working out of Canada to undermine the Gilead regime.', description_es = 'Agente del gobierno de los Estados Unidos en el exilio, dedicado a desmantelar a Gilead desde el consulado en Canadá.' WHERE slug = 'mark-tuello';

UPDATE characters SET description_en = 'Best friend of June and activist who successfully escapes Gilead to Canada, becoming a dedicated advocate for refugees.', description_es = 'Mejor amiga de June y activista feminista que logra escapar de Gilead a Canadá, donde se convierte en defensora de los refugiados.' WHERE slug = 'moira-strand';

UPDATE characters SET description_en = 'A high-ranking, conservative Wife in Gilead, married to Commander Putnam and later to Commander Lawrence.', description_es = 'Esposa de la elite en Gilead, conservadora y calculadora, casada con el Comandante Putnam y posteriormente con el Comandante Lawrence.' WHERE slug = 'naomi-putnam';

UPDATE characters SET description_en = 'Driver for the Waterfords and an undercover agent for the Eyes who rises to Commander, constantly torn between his duty to Gilead and his protective love for June and their daughter Nichole.', description_es = 'Conductor de los Waterford y agente encubierto de los Ojos que asciende a Comandante, constantemente dividido entre su deber dentro del régimen y su amor protector por June y su hija Nichole.' WHERE slug = 'nick-blaine';

UPDATE characters SET description_en = 'A Martha in the Waterford household who secretly assists June and manages to escape to Canada with dozens of children.', description_es = 'Martha de la casa Waterford que ayuda secretamente a June y logra escapar a Canadá acompañando a decenas de niños.' WHERE slug = 'rita-blue';

UPDATE characters SET description_en = 'Wife of Commander Nick Blaine and daughter of a high-ranking Commander, respected in Gilead despite her physical disability.', description_es = 'Esposa del Comandante Nick Blaine e hija de un Comandante prominente, respetada en Gilead a pesar de su discapacidad.' WHERE slug = 'rose-blaine';

UPDATE characters SET description_en = 'Ideological co-creator of Gilead and wife of Fred Waterford, caught in the oppressive patriarchal structure she helped build.', description_es = 'Coautora ideológica de Gilead y esposa de Fred Waterford, atrapada en las destructivas leyes patriarcales que ella misma ayudó a crear.' WHERE slug = 'serena-joy-waterford';

UPDATE characters SET description_en = 'Wife of Emily prior to the rise of Gilead, who reunites with Emily in Canada after their long separation.', description_es = 'Esposa de Emily antes del ascenso de Gilead, con quien se reencuentra en Canadá tras su largo periodo de separación.' WHERE slug = 'sylvia';

UPDATE characters SET description_en = 'A powerful and hypocritical Gilead Commander whose abuses of authority lead to severe political consequences.', description_es = 'Comandante hipócrita y poderoso de Gilead, castigado por abusos de poder pero influyente en la elite política.' WHERE slug = 'warren-putnam';
