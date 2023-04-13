INSERT INTO customers
VALUES (100, 'Stefen', 'King', '515-123-4567', 'STEFENK', 'SKING'),
    (101, 'Mona', 'Liza', '516-552-5677', 'MONALIZA', 'MLIZA'),
    (102, 'Mozza', 'Rella', '516-552-5678', 'PIZZAMOZZA', 'MRELLA'),
    (103, 'Lukas ', 'Lewis', '363-321-4657', 'LUKASL', 'LLEWIS'),
    (104, 'Matt', 'Stonie', '216-567-3451', 'MATT34', 'MSTONIE'),
    (105, 'John', 'Wick', '315-921-5641', 'JOHNWICK4', 'JWICK'),
    (106, 'Morgan', 'Freeman', '213-451-2231', 'MORGANF', 'MFREEMAN'),
    (107, 'John', 'Cena', '213-452-8831', 'YOUCANTSEEME', 'JCENA'),
    (108, 'Stefen', 'Curry', '903-231-3341', 'STEFENC4', 'SCURRY'),
    (109, 'Joseph', 'Jostar', '934-876-5432', 'JOSEPH58', 'JJOSTAR'),
    (110, 'Baable', 'White', '066-415-9308', 'BAABLE21', 'WHITETOWER'),
    (111, 'Hitori', 'Gotou', '81-0135-7911', 'GUITARHERO', 'HGOTOU'),
    (112, 'Kita', 'Ikuyo', '81-266-8022', 'KITAKITA', 'KIKUYO'),
    (113, 'Daniel ', 'Zhou', '86-951-8901', 'DANIELZ', 'DZHOU'),
    (114, 'Ada', 'Wong', '86-125-9871', 'LEONSK', 'AWONG'),
    (115, 'Kassandra', 'Mercury', '30-429-2018', 'SANDRA30', 'KMERCURY');


INSERT INTO employees
VALUES (10, 'Neena', 'Kochhar', '515-123-4568', 'NEENAK58', 'NKOCHHAR'),
(11, 'Lex', 'Dee han', '515-123-4569', 'DEEHAN69', 'LDEEHAN'),
(12, 'Arnold', 'Hender', '515-123-4570', 'ARNOLDHE', 'HENDERA'),
(13, 'Barry', 'Mendoza', '363-456-7890', 'BARRYMEN', 'BMENDOZA'),
(14, 'Louis', 'Lewis', '363-547-7891', 'LEWISLOUIS', 'LLEWIS'),
(15, 'Henry', 'Cortland ', '234-921-1234', 'CORTLANDER', 'HCORTLAND'),
(16, 'Moses', 'Moody', '234-941-2334', 'MOODYBLU', 'MMOODY'),
(17, 'Roxanne', 'Chapman', '252-661-6456', 'ROXANNE25', 'RCHAPMAN'),
(18, 'Willson', 'Goodman', '214-551-9821', 'GOODMEN', 'WGOODMAN'),
(19, 'Nijika', 'Ijichi', '81-333-3397', 'NIJIKAIJ', 'NIJICHI'),
(20, 'Panata', 'Lim', '66-315-6728', 'PANATAL', 'PLIM');


INSERT INTO report
VALUES ('RE001', 101, 10, 'ไฟดับ', 'ไฟดับในห้องหมายเลข9'),
('RE002', 102, 12, 'น้ำไม่ไหล', 'ไฟดับในห้องน้อง หมายเลข20'),
('RE003', 105, 14, 'ผนังเป็นรู', 'ผนังเป็นรูเนื่องจากเกิดอุบัติเหตุ ห้องหมายเลข1'),
('RE004', 110, 15, 'ไฟดับ', 'ไฟดับในห้องหมายเลข9'),
('RE005', 111, 18, 'ไฟดับ', 'ไฟดับในห้องหมายเลข14');



insert into room
values ('r001', 'single bed', '1 เตียงเดี่ยว', 'พัดลม',400),
	('r002', 'single bed', '1 เตียงเดี่ยว', 'พัดลม',400),
	('r003', 'single bed', '1 เตียงเดี่ยว', 'แอร์, อาหารเช้า',1700),
	('r004', 'single bed', '1 เตียงเดี่ยว', 'แอร์',1600),
	('r005', 'double bed', '1 เตียงคู่', 'แอร์, อาหารเช้า',1800),
	('r006', 'double bed', '1 เตียงคู่', 'แอร์, อาหารเช้า',1800),
	('r007', 'double bed', '1 เตียงคู่', 'แอร์, อาหารเช้า',1800),
	('r008', 'double bed', '1 เตียงคู่', 'แอร์',1700),
	('r009', 'double bed', '1 เตียงคู่', 'แอร์',1700),
	('r010', 'double bed', '1 เตียงคู่', 'แอร์',1700),
	('r011', 'double bed', '1 เตียงคู่', 'แอร์',1700),
	('r012', 'double bed', '1 เตียงคู่', 'แอร์',1700),
	('r013', 'triple bed', '1 เตียวคู่, 1 เตียงเดี่ยว', 'แอร์, อาหารเช้า',2100),
	('r014', 'triple bed', '1 เตียวคู่, 1 เตียงเดี่ยว', 'แอร์',2000),
	('r015', 'triple bed', '1 เตียวคู่, 1 เตียงเดี่ยว', 'แอร์',2000),
	('r016', 'twin bed', '2 เตียงเดี่ยว', 'พัดลม',600),
	('r017', 'twin bed', '2 เตียงเดี่ยว', 'พัดลม',600),
	('r018', 'twin bed', '2 เตียงเดี่ยว', 'แอร์, อาหารเช้า',1500),
	('r019', 'twin bed', '2 เตียงเดี่ยว', 'แอร์',1400),
	('r020', 'twin bed', '2 เตียงเดี่ยว', 'แอร์',1400);

insert into payments
values ('p564', 'credit card', 'complete', 1700, 100),
	('p155', 'credit card', 'incomplete', 1400, 101),
	('p654', 'cash','complete', 1800, '102'),
	('p105', 'credit card', 'complete', 1700,  110),
	('p150', 'credit card', 'incomplete', 2100, 111),
	('p186', 'credit card', 'complete', 1500, 112),
	('p616', 'credit card', 'incomplete', 600, 104),
	('p190', 'cash', 'complete', 400, 105),
	('p561', 'credit card', 'complete', 1800, 106);

insert into booking
values ('B001234', 100, 'Stefen', 'r009', '2022-10-16', '2022-10-18', 1700,'p564', '2022-10-10'),
	('B000324', 101, 'Mona', 'r020', '2022-10-20', '2022-10-30', 1400, 'p155', '2022-10-01'),
	('B001495', 102, 'Mozza', 'r005',	'2022-09-02', '2022-09-05', 1800, 'p654', '2022-09-02'),
	('B001205',	110, 'Baable', 'r009', '2022-08-10', '2022-08-15', 1700, 'p105', '2022-08-05'),
	('B000954',	111, 'Hitori', 'r014', '2023-02-17', '2023-02-20', 2100, 'p150', '2023-03-02'),
	('B000590',	112, 'Kita', 'r018', '2023-01-01', '2023-01-05', 1500, 'p186', '2022-12-20'),
	('B000263',	104, 'Matt', 'r016', '2022-11-11', '2022-11-12', 600, 'p616', '2022-11-10'),
	('B000325',	105, 'John', 'r001', '2022-11-10', '2022-11-12', 400, 'p150', '2022-11-10'),
	('B001245',	106, 'Morgan', 'r007', '2022-10-22', '2022-10-30', 1800, 'p561', '2022-10-14');


insert into unavilable_room
values ('r009',	'double bed', '2022-10-19', 'yes'),
	('r020', 'twin bed', '2022-10-20', 'no'),
	('r005', 'double bed', '2022-09-06', 'yes'),
	('r009', 'double bed', '2022-08-16', 'yes'),
	('r014', 'triple bed', '2022-02-17', 'no'),
	('r018', 'twin bed', '2023-01-01', 'no'),
	('r016', 'twin bed', '2022-11-11', 'no'),
	('r001', 'single bed', '2022-11-10', 'no'),
	('r007', 'double bed', '2022-10-22', 'no');