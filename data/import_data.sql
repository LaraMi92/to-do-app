INSERT INTO "list" ("title", "position") VALUES
('To Do', 0),
('In Process', 1),
('Less Urgent', 2);
INSERT INTO "card" ("title", "position", "color", "list_id") VALUES
('washing up', 0, DEFAULT, 1),
('finish book', 1, DEFAULT, 2),
('more boring stuff', 2, DEFAULT, 3);
INSERT INTO "tag" ("title", "color") VALUES
('urgent', '#F08080'),
('pro', '#FFFF00'),
('perso', '#9370DB');
INSERT INTO "tag_belongs_card" ("card_id", "tag_id") VALUES
(1, 3),
(2, 3),
(3, 1),
(3, 2);