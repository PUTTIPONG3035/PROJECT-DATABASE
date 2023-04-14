CREATE TABLE `employees`(
    `emp_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `tel` VARCHAR(12) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(10) NOT NULL,
     PRIMARY KEY(`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `customers`(
    `customer_id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `tel` VARCHAR(12) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(10) NOT NULL,
     PRIMARY KEY(`customer_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `report`(
    `report_id` VARCHAR(10) NOT NULL,
    `customer_id` INT NOT NULL,
    `employee_id` INT NOT NULL,
    `report_title` VARCHAR(30) NOT NULL,
    `report_description` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`report_id`),
    FOREIGN KEY(`customer_id`) REFERENCES `customers`(`customer_id`),
    FOREIGN KEY(`employee_id`) REFERENCES `employees`(`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `payments`(
    `payment_id` VARCHAR(4) NOT NULL,
    `via` VARCHAR(255) NOT NULL,
    `payment_state` VARCHAR(255)  NOT NULL,
    `price` INT NOT NULL,
    `customer_id` INT NOT NULL,
    PRIMARY KEY(`payment_id`),
    FOREIGN KEY(`customer_id`) REFERENCES `customers`(`customer_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `room`(
    `room_id` VARCHAR(4) NOT NULL,
    `room_type` VARCHAR(255) NOT NULL,
    `room_description` VARCHAR(255) NOT NULL,
    `room_service` VARCHAR(255) NOT NULL,
    `price` INT NOT NULL,
    PRIMARY KEY (`room_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `booking`(
    `booking_id` VARCHAR(7) NOT NULL,
    `customer_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `room_id` VARCHAR(4) NOT NULL,
    `check_in` DATE NOT NULL,
    `check_out` DATE NOT NULL,
    `price` INT NOT NULL,
    `payment_id` VARCHAR(4) NOT NULL,
    `booking_date` DATETIME NOT NULL,
    PRIMARY KEY(`booking_id`),
    FOREIGN KEY(`customer_id`)REFERENCES `customers`(`customer_id`),
    FOREIGN KEY(`payment_id`) REFERENCES `payments`(`payment_id`),
    FOREIGN KEY(`room_id`) REFERENCES `room`(`room_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;



CREATE TABLE `unavailable_room`(
    `room_id` VARCHAR(4) NOT NULL,
    `room_type` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    PRIMARY KEY (`room_id`, `date`),
    FOREIGN KEY(`room_id`) REFERENCES `room`(`room_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;