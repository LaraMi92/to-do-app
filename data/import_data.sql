INSERT INTO "list" ("id", "title", "position") VALUES
(1, 'à faire', 0),
(2, 'en cours', 1),
(3, 'fait', 2);
INSERT INTO "card" ("id", "title", "position", "color", "list_id") VALUES
(1, 'faire les courses', 0, '', 1),
(2, 'acheter un jeu', 1, '', 2),
(3, 'cloturer le dossier 32', 2, '', 3);
INSERT INTO "tag" ("id", "title", "color") VALUES
(1, 'urgent', '#F08080'),
(2, 'pro', '#FFFF00'),
(3, 'perso', '#9370DB');
INSERT INTO "tag_belongs_card" ("card_id", "tag_id") VALUES
(1, 3),
(2, 3),
(3, 1),
(3, 2);