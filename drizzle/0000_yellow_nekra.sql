CREATE TABLE `clients` (
	`clientId` integer PRIMARY KEY NOT NULL,
	`clientName` text NOT NULL,
	`clientAddress` text NOT NULL,
	`clientContact` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`salesId` integer PRIMARY KEY NOT NULL,
	`salesDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`salesStatus` text DEFAULT 'nouvelle',
	`productName` real,
	`clientId` real,
	`salesPersonId` real
);
--> statement-breakpoint
CREATE TABLE `salesPersons` (
	`salesPersonId` integer PRIMARY KEY NOT NULL,
	`salesPersonName` text,
	`salesPersonContact` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`userId` integer PRIMARY KEY NOT NULL,
	`userName` text DEFAULT '',
	`userEmail` text NOT NULL,
	`userType` text NOT NULL,
	`userPassword` text NOT NULL
);
