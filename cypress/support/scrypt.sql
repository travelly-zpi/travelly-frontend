TRUNCATE TABLE post_atachment cascade;
TRUNCATE TABLE post cascade;
TRUNCATE TABLE "user" cascade;

INSERT INTO public."user"(
	id, uuid, user_name, password, first_name, last_name, date_of_birth, languages, description, localisation, role_id, image, enable)
	VALUES (1,'4b04361b-43c8-4faf-82a4-2bb8bafeda14','iwonaszaszlyk@mai.com', '$2y$10$tvWkX6lfNb8jDNUUTFQRkeIlzlFts4k7EaKOfmNMm0LukkVwb/RJC', 'Iwona', 'Szaszlyk', '2004-11-05', null, null, null, 2, null, true);
INSERT INTO public."user"(
	id, uuid, user_name, password, first_name, last_name, date_of_birth, languages, description, localisation, role_id, image, enable)
	VALUES (2,'ddde23a1-d969-4063-bc7e-8ae6fd43e141','andrewkowin@gmai.com', '$2y$10$QSpl/fCZL03jwcsOEoHtwuIeLWiGTyR9qjlrmT3SJi0kZFqLfGVSG', 'Andrew', 'Kowin', '2000-05-05', '["English"]','I like meet new people and see new places', 'Rome, Rome, Italy', 2, null, true);
INSERT INTO public."user"(
	id, uuid, user_name, password, first_name, last_name, date_of_birth, languages, description, localisation, role_id, image, enable)
	VALUES (3,'e4e17e33-4a81-42aa-9d53-4418001bec72', 'katewilinton@gmai.com', '$2y$10$yo0iZvyBBAzHtd.nXjZIvOjU3ut01RWSNeK2O0d7IBFADbAZXVfPW', 'Kate', 'Wilinton', '1998-06-15', '["English", "Polish"]','I like meet new people and see new places', 'California, Pensylvania, United States', 2, null, true);

INSERT INTO public.post(
	id, uuid, title, description, creation_timestamp, active_from, active_to, type, participants, user_id, start_point, end_point, active)
	VALUES (1, '89c781fa-3209-4790-ba26-4ef54791e6eb', 'Little aprt', 'Test description', '2022-11-10 19:48:20.036945', '2022-11-24', '2022-11-26', 'accommodation', 3,	3, 'Budapest, Hungary', null, true);
INSERT INTO public.post(
	id, uuid, title, description, creation_timestamp, active_from, active_to, type, participants, user_id, start_point, end_point, active)
	VALUES (2, 'b47b073b-a726-4fef-9e15-3a74e3dcba15', 'Funny trip', 'It will be really great trip!', '2022-12-10 19:48:20.036945', '2022-11-24', null, 'trip', 0, 3, 'Budapest, Hungary', 'Rome, Rome, Italy', true);
INSERT INTO public.post(
	id, uuid, title, description, creation_timestamp, active_from, active_to, type, participants, user_id, start_point, end_point, active)
	VALUES (3, '4e2fcf08-f19f-447b-bf32-4bf44175bd90', 'Go to Wroclaw from Rome', 'Bla bla bla', '2022-11-10 19:48:20.036945', '2022-11-24', null, 'carpooling', 2,	3, 'Rome, Rome, Italy', 'Wrocław, Lower Silesian Voivodeship, Poland', false);
INSERT INTO public.post(
	id, uuid, title, description, creation_timestamp, active_from, active_to, type, participants, user_id, start_point, end_point, active)
	VALUES (4, 'c4875707-910b-4181-8531-4f14831cac17', 'Very interesting excursion in Wroclaw!', 'Smth about this excursion', '2022-11-10 19:48:20.036945', null, null, 'excursion', 0,	3, 'Wrocław, Lower Silesian Voivodeship, Poland', null, true);
INSERT INTO public.post(
	id, uuid, title, description, creation_timestamp, active_from, active_to, type, participants, user_id, start_point, end_point, active)
	VALUES (5, '21b93ac3-0bcb-4522-94f8-703aac443a0d', 'Go to Wroclaw from London', 'Bla bla bla', '2022-11-10 19:48:20.036945', '2022-11-24', null, 'carpooling', 2,	3, 'Rome, Rome, Italy', 'Wrocław, Lower Silesian Voivodeship, Poland', false);