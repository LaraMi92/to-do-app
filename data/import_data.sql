INSERT INTO "list" ("title", "position") VALUES
('à faire', 0),
('en cours', 1),
('fait', 2);
INSERT INTO "card" ("title", "position", "color", "list_id") VALUES
('faire les courses', 0, DEFAULT, 1),
('acheter un jeu', 1, DEFAULT, 2),
('cloturer le dossier 32', 2, DEFAULT, 3);
INSERT INTO "tag" ("title", "color") VALUES
('urgent', '#F08080'),
('pro', '#FFFF00'),
('perso', '#9370DB');
INSERT INTO "tag_belongs_card" ("card_id", "tag_id") VALUES
(1, 3),
(2, 3),
(3, 1),
(3, 2);