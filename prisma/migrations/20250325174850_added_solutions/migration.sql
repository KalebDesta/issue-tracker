-- CreateTable
CREATE TABLE `Solution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `issueId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `providerUserId` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Solution_issueId_key`(`issueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Solution` ADD CONSTRAINT `Solution_issueId_fkey` FOREIGN KEY (`issueId`) REFERENCES `Issue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Solution` ADD CONSTRAINT `Solution_providerUserId_fkey` FOREIGN KEY (`providerUserId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
