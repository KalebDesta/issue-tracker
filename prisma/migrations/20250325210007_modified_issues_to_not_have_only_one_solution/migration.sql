-- DropForeignKey
ALTER TABLE `Solution` DROP FOREIGN KEY `Solution_issueId_fkey`;

-- DropIndex
DROP INDEX `Solution_issueId_key` ON `Solution`;

-- AddForeignKey
ALTER TABLE `Solution` ADD CONSTRAINT `Solution_issueId_fkey` FOREIGN KEY (`issueId`) REFERENCES `Issue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
