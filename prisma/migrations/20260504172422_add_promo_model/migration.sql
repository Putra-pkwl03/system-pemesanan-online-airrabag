-- CreateTable
CREATE TABLE `Promo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `promoPrice` DOUBLE NOT NULL,
    `mainProductId` INTEGER NOT NULL,
    `secondProductId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Promo` ADD CONSTRAINT `Promo_mainProductId_fkey` FOREIGN KEY (`mainProductId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promo` ADD CONSTRAINT `Promo_secondProductId_fkey` FOREIGN KEY (`secondProductId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
