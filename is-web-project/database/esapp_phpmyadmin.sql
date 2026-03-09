-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 09, 2026 at 03:29 AM
-- Server version: 8.0.45
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esapp`
--
CREATE DATABASE IF NOT EXISTS `esapp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `esapp`;

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `address_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `recipient_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ward` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `address_type` enum('home','office','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`address_id`, `user_id`, `recipient_name`, `phone`, `address_line1`, `address_line2`, `city`, `district`, `ward`, `is_default`, `address_type`) VALUES
(4, 5, NULL, NULL, '123 Nguy???n Hu???', 'T???ng 5, c??n h??? 502', 'Th??nh ph??? H??? Ch?? Minh', 'Qu???n 1', 'Ph?????ng B???n Ngh??', 0, 'home'),
(5, 5, NULL, NULL, '123 Nguy???n Hu???', 'T???ng 5, c??n h??? 502', 'Th??nh ph??? H??? Ch?? Minh', 'Qu???n 1', 'Ph?????ng B???n Ngh??', 0, 'home'),
(6, 5, NULL, NULL, '123 Nguy???n Hu???', 'T???ng 5, c??n h??? 502', 'Th??nh ph??? H??? Ch?? Minh', 'Qu???n 1', 'Ph?????ng B???n Ngh??', 0, 'home'),
(7, 5, NULL, NULL, '123 Nguy???n Hu???', 'T???ng 5, c??n h??? 502', 'Th??nh ph??? H??? Ch?? Minh', 'Qu???n 1', 'Ph?????ng B???n Ngh??', 0, 'home'),
(8, 5, NULL, NULL, '123 Nguy???n Hu???', 'T???ng 5, c??n h??? 502', 'Th??nh ph??? H??? Ch?? Minh', 'Qu???n 1', 'Ph?????ng B???n Ngh??', 0, 'home'),
(9, 5, NULL, NULL, '123 Nguy???n Hu???', 'T???ng 5, c??n h??? 502', 'Th??nh ph??? H??? Ch?? Minh', 'Qu???n 1', 'Ph?????ng B???n Ngh??', 0, 'home'),
(10, 5, NULL, NULL, '123 Nguy???n Hu???', 'T???ng 5, c??n h??? 502', 'Th??nh ph??? H??? Ch?? Minh', 'Qu???n 1', 'Ph?????ng B???n Ngh??', 0, 'home'),
(11, 5, NULL, NULL, '123 Nguy???n Hu???', 'T???ng 5, c??n h??? 502', 'Th??nh ph??? H??? Ch?? Minh', 'Qu???n 1', 'Ph?????ng B???n Ngh??', 0, 'home'),
(12, 5, NULL, NULL, '123 Nguy???n Hu???', 'T???ng 5, c??n h??? 502', 'Th??nh ph??? H??? Ch?? Minh', 'Qu???n 1', 'Ph?????ng B???n Ngh??', 0, 'home'),
(13, 8, NULL, NULL, 'asd', NULL, 'aa', 'aaa', 'aa', 0, 'home');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` bigint UNSIGNED NOT NULL,
  `brand_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descriptions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `website_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`, `slug`, `logo_url`, `descriptions`, `website_url`, `created_at`) VALUES
(1, 'Samsung', 'samsung', 'https://images.samsung.com/is/image/samsung/assets/global/about-samsung/brand/logo/360_197_1.png', 'Samsung Electronics - Global technology leader in smartphones, TVs, home appliances, and more', 'https://www.samsung.com', '2025-10-21 07:06:43');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 5, '2025-12-15 05:31:34', '2025-12-15 05:31:34'),
(2, 8, '2026-03-08 04:55:52', '2026-03-08 04:55:52');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` bigint UNSIGNED NOT NULL,
  `cart_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED DEFAULT NULL,
  `variant_id` bigint UNSIGNED DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `added_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint UNSIGNED NOT NULL,
  `category_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `descriptions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `meta_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `slug`, `parent_id`, `descriptions`, `image_url`, `display_order`, `meta_title`, `meta_description`, `created_at`) VALUES
(1, 'Mobile', 'mobile', NULL, 'Explore the latest in mobile technology from Samsung.', '/images/categories/mobile.jpg', 1, 'Samsung Mobile', 'Smartphones, Tablets, Watches, and more.', '2025-10-21 07:07:23'),
(2, 'TV & AV', 'tv-av', NULL, 'The ultimate home entertainment experience.', '/images/categories/tv-av.jpg', 2, 'Samsung TV & AV', 'Discover our range of TVs, sound devices, and projectors.', '2025-10-21 07:07:23'),
(3, 'Appliances', 'appliances', NULL, 'Smart home appliances for modern living.', '/images/categories/appliances.jpg', 3, 'Samsung Appliances', 'Refrigerators, washers, and other home appliances.', '2025-10-21 07:07:23'),
(4, 'Computing & Displays', 'computing-displays', NULL, 'Power your productivity and gaming.', '/images/categories/computing-displays.jpg', 4, 'Samsung Computing & Displays', 'Laptops, monitors, and storage solutions.', '2025-10-21 07:07:23'),
(5, 'Wearables', 'wearables', NULL, 'Track your fitness and stay connected.', '/images/categories/wearables.jpg', 5, 'Samsung Wearables', 'Galaxy Watches, Buds, and smart rings.', '2025-10-21 07:07:23'),
(6, 'Accessories', 'accessories', NULL, 'Enhance your Galaxy experience.', '/images/categories/accessories.jpg', 6, 'Samsung Accessories', 'Cases, chargers, and more for your devices.', '2025-10-21 07:07:23'),
(7, 'Galaxy Smartphone', 'galaxy-smartphone', 1, 'Flagship and innovative smartphones.', '/images/categories/galaxy-smartphone.jpg', 1, 'Galaxy Smartphones', 'Buy the latest Galaxy S, Z, and A series.', '2025-10-21 07:07:23'),
(8, 'Galaxy Tab', 'galaxy-tab', 1, 'Tablets for work, play, and creativity.', '/images/categories/galaxy-tab.jpg', 2, 'Galaxy Tablets', 'Explore the powerful Galaxy Tab S and Tab A series.', '2025-10-21 07:07:23'),
(9, 'Galaxy Watch', 'galaxy-watch', 1, 'Smartwatches with advanced health tracking.', '/images/categories/galaxy-watch.jpg', 3, 'Galaxy Watch', 'Monitor your health and fitness with Galaxy Watch.', '2025-10-21 07:07:23'),
(10, 'Galaxy Buds', 'galaxy-buds', 1, 'Immersive audio experience.', '/images/categories/galaxy-buds.jpg', 4, 'Galaxy Buds', 'Wireless earbuds with superior sound quality.', '2025-10-21 07:07:23'),
(11, 'Galaxy Ring', 'galaxy-ring', 1, 'The future of health tracking.', '/images/categories/galaxy-ring.jpg', 5, 'Galaxy Ring', 'Smart rings for seamless health monitoring.', '2025-10-21 07:07:23'),
(12, 'Galaxy Accessories', 'galaxy-accessories', 1, 'Accessories for your mobile devices.', '/images/categories/galaxy-accessories.jpg', 6, 'Galaxy Mobile Accessories', 'Find cases, chargers, and more.', '2025-10-21 07:07:23'),
(13, 'Certified Re-Newed', 'certified-re-newed', 1, 'Like-new devices at a great price.', '/images/categories/certified-re-newed.jpg', 7, 'Certified Re-Newed', 'Get certified pre-owned Samsung devices.', '2025-10-21 07:07:23'),
(14, 'Premium & Flagship TVs', 'premium-flagship-tvs', 2, 'Experience the pinnacle of picture quality with Micro LED, Neo QLED, and OLED.', '/images/categories/premium-tv.jpg', 1, 'Samsung Premium TVs', 'Shop Micro LED, Neo QLED 8K & 4K, and OLED TVs.', '2025-12-14 23:09:35'),
(15, '4K QLED & UHD TVs', 'qled-uhd-tvs', 2, 'Brilliant 4K color and clarity for every home.', '/images/categories/qled-uhd-tv.jpg', 2, 'Samsung QLED & Crystal UHD', 'Explore 4K QLED and Crystal UHD TVs.', '2025-12-14 23:09:35'),
(16, 'Lifestyle TVs', 'lifestyle-tvs', 2, 'TVs designed to blend seamlessly into your life and decor.', '/images/categories/lifestyle-tv.jpg', 3, 'Samsung Lifestyle TVs', 'The Frame, The Serif, The Sero, and The Terrace.', '2025-12-14 23:09:35'),
(26, 'Galaxy Book & Laptop', 'galaxy-book-laptop', 4, 'Powerful, thin, and light laptops.', '/images/categories/galaxy-book-laptop.jpg', 1, 'Galaxy Book & Laptops', 'Discover the Galaxy Book series for ultimate productivity.', '2025-10-21 07:07:23'),
(27, 'Monitors', 'monitors', 4, 'For gaming, work, and creativity.', '/images/categories/monitors.jpg', 2, 'Monitors', 'High-resolution and gaming monitors.', '2025-10-21 07:07:23'),
(28, 'Memory & Storage', 'memory-storage', 4, 'Fast and reliable storage solutions.', '/images/categories/memory-storage.jpg', 3, 'Memory & Storage', 'SSDs, memory cards, and portable storage.', '2025-10-21 07:07:23');

-- --------------------------------------------------------

--
-- Table structure for table `membership_tiers`
--

CREATE TABLE `membership_tiers` (
  `tier_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tier_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `min_points` int UNSIGNED DEFAULT NULL,
  `max_points` int UNSIGNED DEFAULT NULL,
  `points_per_dollar` int UNSIGNED DEFAULT NULL,
  `accessory_discount_percent` int UNSIGNED NOT NULL DEFAULT '0',
  `care_plus_discount_percent` int UNSIGNED NOT NULL DEFAULT '0',
  `haul_away_discount_percent` int UNSIGNED NOT NULL DEFAULT '0',
  `free_care_plus_years` int UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `membership_tiers`
--

INSERT INTO `membership_tiers` (`tier_id`, `tier_name`, `min_points`, `max_points`, `points_per_dollar`, `accessory_discount_percent`, `care_plus_discount_percent`, `haul_away_discount_percent`, `free_care_plus_years`, `created_at`, `updated_at`) VALUES
('gold', 'Gold', 500, 2499, 2, 10, 0, 0, 0, NULL, NULL),
('platinum', 'Platinum', 2500, NULL, 3, 10, 20, 20, 0, NULL, NULL),
('silver', 'Silver', 0, 499, 1, 0, 0, 0, 0, NULL, NULL),
('vip', 'VIP Advantage', NULL, NULL, 6, 10, 20, 20, 7, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(20, '2025_09_08_094133_membership_tier', 1),
(21, '2025_09_10_000000_create_users_table', 1),
(22, '2025_10_10_113320_create_roles_table', 1),
(23, '2025_10_10_113321_create_addresses_table', 1),
(24, '2025_10_10_113321_create_user_roles_table', 1),
(25, '2025_10_10_113322_create_brands_table', 1),
(26, '2025_10_10_113322_create_categories_table', 1),
(27, '2025_10_10_113322_create_product_table', 1),
(28, '2025_10_10_113322_create_products_categories_table', 1),
(29, '2025_10_10_113323_create_product_variants_table', 1),
(30, '2025_10_10_113323_create_reviews_table', 1),
(31, '2025_10_10_113324_create_carts_table', 1),
(32, '2025_10_10_113324_create_orders_table', 1),
(33, '2025_10_10_113324_create_product_image_table', 1),
(34, '2025_10_10_113325_create_cart_items_table', 1),
(35, '2025_10_10_113325_create_order_items_table', 1),
(36, '2025_10_10_113325_create_promotions_table', 1),
(37, '2025_10_10_113326_create_order_promotions_table', 1),
(38, '2025_10_13_051824_create_refresh_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint UNSIGNED NOT NULL,
  `order_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `shipping_address_id` bigint UNSIGNED DEFAULT NULL,
  `billing_address_id` bigint UNSIGNED DEFAULT NULL,
  `order_status` enum('pending','confirmed','processing','shipped','delivered','cancelled','refunded') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `payment_status` enum('pending','paid','failed','refunded') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `payment_method` enum('cod','bank_transfer','credit_card','momo','zalopay') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `shipping_fee` decimal(15,2) NOT NULL DEFAULT '0.00',
  `tax_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `discount_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `total_amount` decimal(15,2) NOT NULL,
  `customer_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `admin_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estimated_delivery` date DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_code`, `user_id`, `shipping_address_id`, `billing_address_id`, `order_status`, `payment_status`, `payment_method`, `subtotal`, `shipping_fee`, `tax_amount`, `discount_amount`, `total_amount`, `customer_note`, `admin_note`, `estimated_delivery`, `delivered_at`, `cancelled_at`, `created_at`, `updated_at`) VALUES
(6, NULL, 5, NULL, NULL, 'pending', 'pending', NULL, 0.00, 10.00, 0.00, 0.00, 0.00, 'Giao h??ng trong gi??? h??nh ch??nh', NULL, NULL, NULL, NULL, '2025-12-15 12:16:31', '2025-12-15 12:16:31'),
(7, NULL, 5, NULL, NULL, 'pending', 'pending', NULL, 0.00, 10.00, 0.00, 0.00, 0.00, 'Giao h??ng trong gi??? h??nh ch??nh', NULL, NULL, NULL, NULL, '2025-12-15 12:19:35', '2025-12-15 12:19:35'),
(8, NULL, 5, NULL, NULL, 'pending', 'pending', NULL, 0.00, 10.00, 0.00, 0.00, 4599.96, 'Giao h??ng trong gi??? h??nh ch??nh', NULL, NULL, NULL, NULL, '2025-12-15 12:21:06', '2025-12-15 12:21:06'),
(9, NULL, 5, NULL, NULL, 'pending', 'pending', NULL, 0.00, 10.00, 0.00, 0.00, 4599.96, 'Giao h??ng trong gi??? h??nh ch??nh', NULL, NULL, NULL, NULL, '2025-12-15 12:26:07', '2025-12-15 12:26:07'),
(10, NULL, 5, NULL, NULL, 'pending', 'pending', NULL, 0.00, 10.00, 0.00, 0.00, 4599.96, 'Giao h??ng trong gi??? h??nh ch??nh', NULL, NULL, NULL, NULL, '2025-12-15 12:29:15', '2025-12-15 12:29:15'),
(11, NULL, 5, NULL, NULL, 'pending', 'paid', NULL, 0.00, 10.00, 0.00, 16.10, 4583.86, 'Giao h??ng trong gi??? h??nh ch??nh', NULL, NULL, NULL, NULL, '2025-12-15 12:35:07', '2025-12-17 23:45:28'),
(12, NULL, 8, 13, NULL, 'processing', 'paid', NULL, 0.00, 10.00, 0.00, 0.00, 153599.96, NULL, NULL, NULL, NULL, NULL, '2026-03-08 07:44:13', '2026-03-08 07:44:36');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED DEFAULT NULL,
  `variant_id` bigint UNSIGNED DEFAULT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `variant_attributes` json DEFAULT NULL,
  `unit_price` decimal(15,2) NOT NULL,
  `quantity` int NOT NULL,
  `total_price` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `variant_id`, `product_name`, `variant_attributes`, `unit_price`, `quantity`, `total_price`) VALUES
(6, 6, 44, 109, 'Samsung Galaxy Book2 Pro', NULL, 1199.99, 2, 2399.98),
(7, 6, 43, 106, 'Samsung Galaxy Book3 360', NULL, 1099.99, 2, 2199.98),
(8, 7, 44, 109, 'Samsung Galaxy Book2 Pro', NULL, 1199.99, 2, 2399.98),
(9, 7, 43, 106, 'Samsung Galaxy Book3 360', NULL, 1099.99, 2, 2199.98),
(10, 8, 44, 109, 'Samsung Galaxy Book2 Pro', NULL, 1199.99, 2, 2399.98),
(11, 8, 43, 106, 'Samsung Galaxy Book3 360', NULL, 1099.99, 2, 2199.98),
(12, 9, 44, 109, 'Samsung Galaxy Book2 Pro', NULL, 1199.99, 2, 2399.98),
(13, 9, 43, 106, 'Samsung Galaxy Book3 360', NULL, 1099.99, 2, 2199.98),
(14, 10, 44, 109, 'Samsung Galaxy Book2 Pro', NULL, 1199.99, 2, 2399.98),
(15, 10, 43, 106, 'Samsung Galaxy Book3 360', NULL, 1099.99, 2, 2199.98),
(16, 11, 44, 109, 'Samsung Galaxy Book2 Pro', NULL, 1199.99, 2, 2399.98),
(17, 11, 43, 106, 'Samsung Galaxy Book3 360', NULL, 1099.99, 2, 2199.98),
(18, 12, 1, 3, 'Samsung Galaxy S24 Ultra', NULL, 1559.99, 1, 1559.99),
(19, 12, 52, 153, 'Samsung Galaxy Z Flip5', NULL, 1019.99, 2, 2039.98),
(20, 12, 11, 50, 'Samsung 110??? MICRO LED', NULL, 149999.99, 1, 149999.99);

-- --------------------------------------------------------

--
-- Table structure for table `order_promotions`
--

CREATE TABLE `order_promotions` (
  `order_id` bigint UNSIGNED NOT NULL,
  `promotion_id` bigint UNSIGNED NOT NULL,
  `discount_applied` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_promotions`
--

INSERT INTO `order_promotions` (`order_id`, `promotion_id`, `discount_applied`) VALUES
(11, 4, 1.10),
(11, 5, 16.10);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint UNSIGNED NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_id` bigint UNSIGNED DEFAULT NULL,
  `short_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `full_description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `specification` json DEFAULT NULL,
  `base_price` decimal(15,2) NOT NULL,
  `sale_price` decimal(15,2) DEFAULT NULL,
  `cost_price` decimal(15,2) DEFAULT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `min_stock_level` int NOT NULL DEFAULT '5',
  `weight` decimal(10,2) DEFAULT NULL,
  `dimensions` json DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `view_count` int NOT NULL DEFAULT '0',
  `rating_avg` decimal(3,2) NOT NULL DEFAULT '0.00',
  `review_count` int NOT NULL DEFAULT '0',
  `meta_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `slug`, `sku`, `brand_id`, `short_description`, `full_description`, `specification`, `base_price`, `sale_price`, `cost_price`, `stock_quantity`, `min_stock_level`, `weight`, `dimensions`, `is_featured`, `view_count`, `rating_avg`, `review_count`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
(1, 'Samsung Galaxy S24 Ultra', 'galaxy-s24-ultra', 'SM-S928UZAAXAA', 1, 'The ultimate Galaxy with built-in AI and Note-worthy power.', 'Experience the pinnacle of smartphone innovation with Galaxy S24 Ultra. Featuring AI-powered photography, enhanced Note capabilities, and the most brilliant display yet.', '{\"camera\": {\"main\": \"200MP\", \"telephoto\": \"50MP 5x Optical Zoom\"}, \"battery\": \"5000mAh\", \"display\": \"6.8-inch Dynamic AMOLED 2X\", \"processor\": \"Snapdragon 8 Gen 3 for Galaxy\"}', 1299.99, 1199.99, 980.00, 50, 10, 232.00, '{\"depth\": \"8.6mm\", \"width\": \"79.0mm\", \"height\": \"162.3mm\"}', 1, 25800, 4.90, 875, 'Buy Samsung Galaxy S24 Ultra', 'Get the best price on the latest Samsung Galaxy S24 Ultra with AI features.', '2025-10-21 07:07:36', '2025-12-12 00:36:47'),
(2, 'Samsung Galaxy S24+', 'galaxy-s24-plus', 'SM-S926UZAAXAA', 1, 'Premium Galaxy experience with large screen and all-day battery.', 'Galaxy S24+ offers a large, immersive display and powerful performance with intelligent AI features for creating, connecting and more.', '{\"camera\": {\"main\": \"50MP\"}, \"battery\": \"4900mAh\", \"display\": \"6.7-inch Dynamic AMOLED 2X\", \"processor\": \"Snapdragon 8 Gen 3 for Galaxy\"}', 999.99, 899.99, 720.00, 75, 15, 196.00, '{\"depth\": \"7.7mm\", \"width\": \"75.9mm\", \"height\": \"158.5mm\"}', 1, 18450, 4.80, 650, 'Samsung Galaxy S24+', 'Explore the features and price of the new Samsung Galaxy S24 Plus.', '2025-10-21 07:07:36', '2025-12-12 00:36:47'),
(3, 'Samsung Galaxy Tab S9 Ultra', 'galaxy-tab-s9-ultra', 'SM-X910UZAAXAA', 1, 'The most powerful Galaxy tablet with a massive screen for work and play.', 'Galaxy Tab S9 Ultra features a massive 14.6-inch Dynamic AMOLED 2X display and an included S Pen for ultimate productivity and creativity.', '{\"battery\": \"11200mAh\", \"display\": \"14.6-inch Dynamic AMOLED 2X\", \"processor\": \"Snapdragon 8 Gen 2\"}', 1199.99, 1099.99, 900.00, 25, 5, 732.00, '{\"depth\": \"5.5mm\", \"width\": \"326.4mm\", \"height\": \"208.6mm\"}', 1, 11500, 4.90, 400, 'Samsung Galaxy Tab S9 Ultra', 'The ultimate tablet for productivity and creativity.', '2025-10-21 07:07:36', '2025-12-12 00:36:47'),
(4, 'Samsung Galaxy Tab A8', 'galaxy-tab-a8', 'SM-X200UZAAXAA', 1, 'An affordable tablet perfect for entertainment, streaming, and browsing.', 'Perfect for streaming, browsing, and light gaming with long battery life and quality speakers, the Galaxy Tab A8 is designed for the whole family.', '{\"battery\": \"7040mAh\", \"display\": \"10.5-inch LCD\", \"processor\": \"Unisoc T618\"}', 229.99, 199.99, 160.00, 150, 25, 508.00, '{\"depth\": \"6.9mm\", \"width\": \"246.8mm\", \"height\": \"161.9mm\"}', 0, 28000, 4.60, 1400, 'Samsung Galaxy Tab A8', 'An affordable entertainment tablet for the whole family.', '2025-10-21 07:07:36', '2025-12-12 00:36:47'),
(5, 'Samsung Galaxy Book3 Ultra', 'galaxy-book3-ultra', 'NP960XFG-KA2US', 1, 'A powerful laptop for creators and professionals with an Intel Core i9 processor.', 'The ultimate Galaxy laptop with an Intel Core i9 processor and NVIDIA RTX graphics for the most demanding creative work and gaming.', '{\"display\": \"16-inch 3K AMOLED\", \"graphics\": \"NVIDIA RTX 4070\", \"processor\": \"Intel Core i9-13900H\"}', 2399.99, 2199.99, 1800.00, 12, 5, 1790.00, '{\"depth\": \"16.5mm\", \"width\": \"250.4mm\", \"height\": \"355.4mm\"}', 1, 8970, 4.90, 150, 'Samsung Galaxy Book3 Ultra Laptop', 'High-performance laptop for professionals and creators.', '2025-10-21 07:07:36', '2025-12-12 00:36:47'),
(6, 'Samsung Galaxy Book3 Pro 360', 'galaxy-book3-pro-360', 'NP960QFG-KA1US', 1, 'A versatile 2-in-1 laptop featuring a stunning AMOLED display and S Pen.', 'Unleash your creativity with the Galaxy Book3 Pro 360. It has the power of a PC and the flexibility of a tablet, complete with a 360-degree hinge and S Pen.', '{\"display\": \"16-inch AMOLED\", \"graphics\": \"Intel Iris Xe\", \"processor\": \"Intel Core i7-1360P\"}', 1899.99, 1599.99, 1350.00, 25, 8, 1710.00, '{\"depth\": \"12.8mm\", \"width\": \"252.2mm\", \"height\": \"355.4mm\"}', 1, 7500, 4.80, 120, 'Samsung Galaxy Book3 Pro 360', 'A 2-in-1 laptop with the power of a PC and the flexibility of a tablet.', '2025-10-21 07:07:36', '2025-12-12 00:36:47'),
(7, 'Certified Re-Newed Galaxy S23 Ultra', 're-newed-s23-ultra', 'CR-SM-S918U1-1', 1, 'Get a like-new S23 Ultra with a 1-year warranty at a great price.', 'Get flagship performance for less. Each Certified Re-Newed device is thoroughly inspected and updated by Samsung engineers and comes in a new box with a new battery.', '{\"camera\": {\"main\": \"200MP\"}, \"display\": \"6.8-inch Dynamic AMOLED 2X\", \"warranty\": \"1-Year\", \"processor\": \"Snapdragon 8 Gen 2\"}', 899.99, 799.99, 650.00, 80, 10, 234.00, '{\"depth\": \"8.9mm\", \"width\": \"78.1mm\", \"height\": \"163.4mm\"}', 0, 14000, 4.90, 550, 'Certified Re-Newed Galaxy S23 Ultra', 'Like-new flagship phone at a great price.', '2025-10-21 07:07:36', '2025-12-12 00:36:47'),
(8, 'Certified Re-Newed Galaxy Z Fold4', 're-newed-z-fold4', 'CR-SM-F936U1-1', 1, 'A certified pre-owned foldable phone, rigorously tested and backed by Samsung.', 'Experience the best of foldable technology for less. This Certified Re-Newed Galaxy Z Fold4 has been fully refurbished by Samsung experts to work like new.', '{\"camera\": {\"main\": \"50MP\"}, \"display\": \"7.6-inch Dynamic AMOLED 2X\", \"warranty\": \"1-Year\", \"processor\": \"Snapdragon 8+ Gen 1\"}', 1099.99, 949.99, 780.00, 50, 8, 263.00, '{\"depth\": \"6.3mm\", \"width\": \"130.1mm\", \"height\": \"155.1mm\"}', 0, 9800, 4.80, 320, 'Certified Re-Newed Galaxy Z Fold4', 'Get a like-new foldable experience for less.', '2025-10-21 07:07:36', '2025-12-12 00:36:47'),
(9, 'Samsung 49\" Odyssey G9 Gaming Monitor', 'odyssey-g9-49', 'LC49G95TSSNXZA', 1, 'A dual QHD curved gaming monitor with a 240Hz refresh rate.', 'Immerse yourself in the game with the ultra-wide 49-inch gaming monitor, featuring a 1000R curve, 240Hz refresh rate and 1ms response time.', '{\"panel\": \"QLED\", \"resolution\": \"5120x1440 Dual QHD\", \"refresh_rate\": \"240Hz\", \"response_time\": \"1ms\"}', 1499.99, 1299.99, 1050.00, 18, 5, 14500.00, '{\"depth\": \"349.7mm\", \"width\": \"1199.5mm\", \"height\": \"523.1mm\"}', 1, 1000, 4.80, 450, 'Samsung 49\" Odyssey G9 Gaming Monitor', 'The ultimate immersive gaming experience with a 49-inch curved screen.', '2025-10-21 07:07:36', '2025-12-12 00:36:47'),
(10, 'Samsung T7 Shield 2TB Portable SSD', 't7-shield-2tb', 'MU-PE2T0S/AM', 1, 'A rugged and durable portable SSD with fast transfer speeds.', 'Durable, fast, and reliable portable storage with an IP65 rating for water and dust resistance, perfect for content creators and adventurers.', '{\"speed\": \"1050MB/s\", \"capacity\": \"2TB\", \"security\": \"AES 256-bit encryption\", \"interface\": \"USB 3.2 Gen 2\", \"durability\": \"IP65 Water/Dust Resistant\"}', 149.99, 129.99, 90.00, 200, 30, 98.00, '{\"depth\": \"13mm\", \"width\": \"59mm\", \"height\": \"88mm\"}', 0, 18000, 4.90, 2500, 'Samsung T7 Shield 2TB Portable SSD', 'Durable and fast portable storage for all your files.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(11, 'Samsung 110??? MICRO LED', '110-micro-led', 'MNA110MS1ACXZA', 1, 'The ultimate screen technology for a breathtaking visual experience.', 'The purest expression of color and light. Self-emissive MICRO LEDs deliver breathtaking contrast, detail, and brightness for an unparalleled viewing experience.', '{\"sound\": \"100W OTS Pro\", \"processor\": \"Micro AI Processor\", \"resolution\": \"4K UHD\", \"technology\": \"MICRO LED\"}', 149999.99, 149999.99, 120000.00, 5, 1, 167000.00, '{\"depth\": \"24.9mm\", \"width\": \"2422.5mm\", \"height\": \"1364.1mm\"}', 1, 4500, 5.00, 50, 'Samsung 110??? MICRO LED TV', 'The pinnacle of television technology.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(12, 'Samsung 98??? MICRO LED', '98-micro-led', 'MNA98MS1ACXZA', 1, 'Breathtaking large-screen innovation with self-lit pixels.', 'Bring the cinematic experience home with the immersive 98-inch MICRO LED screen. Each self-emissive pixel delivers pure blacks, vibrant colors, and unparalleled brightness.', '{\"sound\": \"120W Arena Sound\", \"processor\": \"Micro AI Processor\", \"resolution\": \"4K UHD\", \"technology\": \"MICRO LED\"}', 129999.99, 129999.99, 105000.00, 8, 2, 155000.00, '{\"depth\": \"24.9mm\", \"width\": \"2184.1mm\", \"height\": \"1227.1mm\"}', 1, 3800, 5.00, 45, 'Samsung 98-inch MICRO LED TV', 'Experience the future of television with the Samsung 98-inch MICRO LED.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(13, 'Samsung 85??? Neo QLED 8K QN900C', '85-neo-qled-8k-qn900c', 'QN85QN900CFXZA', 1, 'Experience ultimate 8K realism with Neo QLED technology and Quantum Mini LEDs.', 'Experience mind-blowing detail and contrast with Quantum Mini LEDs, precisely controlling the light to create a picture so real, you\'ll feel like you\'re there.', '{\"hdr\": \"Quantum HDR 64x\", \"processor\": \"Neural Quantum Processor 8K\", \"resolution\": \"8K UHD\", \"technology\": \"Neo QLED\"}', 7999.99, 6999.99, 5800.00, 10, 3, 42500.00, '{\"depth\": \"15.4mm\", \"width\": \"1876.6mm\", \"height\": \"1071.5mm\"}', 1, 9200, 4.90, 180, 'Samsung 85??? Neo QLED 8K TV', 'The pinnacle of television technology with breathtaking 8K resolution.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(14, 'Samsung 75??? Neo QLED 4K QN90C', '75-neo-qled-4k-qn90c', 'QN75QN90CAFXZA', 1, 'Brilliant 4K picture with deep contrast, powered by Quantum Mini LEDs.', 'The power of Quantum Matrix with Mini LEDs creates deep blacks and brilliant whites, delivering a stunningly realistic 4K picture with incredible detail and contrast.', '{\"gaming\": \"Motion Xcelerator Turbo+\", \"processor\": \"Neural Quantum Processor 4K\", \"resolution\": \"4K UHD\", \"technology\": \"Neo QLED\"}', 3299.99, 2799.99, 2200.00, 20, 5, 34300.00, '{\"depth\": \"25.9mm\", \"width\": \"1670.0mm\", \"height\": \"957.4mm\"}', 1, 12500, 4.80, 250, 'Samsung 75??? Neo QLED 4K TV', 'Incredible 4K detail and contrast powered by Quantum Mini LEDs.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(15, 'Samsung 77??? OLED S95C', '77-oled-s95c', 'QN77S95CAFXZA', 1, 'Pure blacks, vibrant colors, and stunning brightness with Samsung OLED technology.', 'Samsung OLED technology delivers deep blacks, clean whites, and a full spectrum of vibrant colors. With self-lit pixels, you get a naturally bright and colorful picture.', '{\"design\": \"Infinity One Design\", \"processor\": \"Neural Quantum Processor 4K\", \"resolution\": \"4K UHD\", \"technology\": \"OLED\"}', 4499.99, 3999.99, 3200.00, 15, 4, 30100.00, '{\"depth\": \"11.2mm\", \"width\": \"1716.6mm\", \"height\": \"984.1mm\"}', 1, 11000, 4.90, 220, 'Samsung 77-inch OLED S95C TV', 'Experience pure blacks and vibrant colors with Samsung OLED technology.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(16, 'Samsung 55??? OLED S90C', '55-oled-s90c', 'QN55S90CAFXZA', 1, 'Stunning OLED picture quality in an accessible size, perfect for movies and gaming.', 'Enjoy the breathtaking contrast and color of OLED in a versatile 55-inch size. It\'s perfect for cinematic movies and ultra-smooth gaming.', '{\"gaming\": \"Gaming Hub\", \"processor\": \"Neural Quantum Processor 4K\", \"resolution\": \"4K UHD\", \"technology\": \"OLED\"}', 1899.99, 1599.99, 1250.00, 30, 8, 16200.00, '{\"depth\": \"39.9mm\", \"width\": \"1225.4mm\", \"height\": \"708.6mm\"}', 0, 15000, 4.80, 310, 'Samsung 55-inch OLED S90C TV', 'Breathtaking OLED picture for movies and gaming.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(17, 'Samsung 85\" QLED 4K Q80C', '85-qled-4k-q80c', 'QN85Q80CAFXZA', 1, 'Brilliant 4K QLED picture with immersive sound from Object Tracking Sound.', 'Experience breathtaking color and contrast with Quantum Dot technology. The Direct Full Array provides deep blacks and pure whites, while Object Tracking Sound puts you in the center of the action.', '{\"hdr\": \"Quantum HDR+\", \"sound\": \"Object Tracking Sound\", \"resolution\": \"4K UHD\", \"technology\": \"QLED\"}', 2199.99, 1999.99, 1600.00, 15, 5, 41500.00, '{\"depth\": \"46.9mm\", \"width\": \"1892.8mm\", \"height\": \"1086.1mm\"}', 1, 9500, 4.80, 210, 'Samsung 85\" QLED 4K TV Q80C', 'Stunning 4K picture quality with immersive sound.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(18, 'Samsung 65\" QLED 4K Q70C', '65-qled-4k-q70c', 'QN65Q70CAFXZA', 1, 'Intelligent 4K picture powered by the Quantum Processor 4K.', 'The intelligent Quantum Processor 4K automatically optimizes the picture for a stunning viewing experience. Quantum Dot technology delivers a billion shades of color.', '{\"gaming\": \"Motion Xcelerator Turbo+\", \"processor\": \"Quantum Processor 4K\", \"resolution\": \"4K UHD\", \"technology\": \"QLED\"}', 1299.99, 999.99, 780.00, 40, 10, 21400.00, '{\"depth\": \"25.7mm\", \"width\": \"1451.7mm\", \"height\": \"831.8mm\"}', 0, 18000, 4.70, 450, 'Samsung 65\" QLED 4K TV Q70C', 'Intelligent 4K viewing with a billion shades of color.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(19, 'Samsung 85??? Crystal UHD DU8000', '85-crystal-uhd-du8000', 'UN85DU8000FXZA', 1, 'Vibrant, lifelike color in a slim and sleek profile.', 'Dynamic Crystal Color technology produces a wide range of colors for a vibrant, lifelike picture. The sleek AirSlim design blends seamlessly into any room.', '{\"design\": \"AirSlim Design\", \"processor\": \"Crystal Processor 4K\", \"resolution\": \"4K UHD\", \"technology\": \"Crystal UHD\"}', 1799.99, 1599.99, 1280.00, 35, 8, 41300.00, '{\"depth\": \"26.9mm\", \"width\": \"1900.9mm\", \"height\": \"1086.1mm\"}', 1, 22000, 4.60, 800, 'Samsung 85-inch Crystal UHD TV', 'Vibrant color and a slim design for a stunning 4K experience.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(20, 'Samsung 55??? Crystal UHD DU7200', '55-crystal-uhd-du7200', 'UN55DU7200FXZA', 1, 'A smart 4K viewing experience with a wide range of colors.', 'PurColor technology allows the TV to express a huge range of colors for optimal picture performance, creating an immersive viewing experience.', '{\"feature\": \"PurColor\", \"processor\": \"Crystal Processor 4K\", \"resolution\": \"4K UHD\", \"technology\": \"Crystal UHD\"}', 549.99, 479.99, 380.00, 100, 20, 13100.00, '{\"depth\": \"59.9mm\", \"width\": \"1230.5mm\", \"height\": \"707.2mm\"}', 0, 35000, 4.50, 1200, 'Samsung 55-inch Crystal UHD TV', 'Smart 4K viewing with vibrant PurColor technology.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(21, 'Samsung The Frame 65\"', 'the-frame-65', 'QN65LS03BAFXZA', 1, 'The lifestyle TV that transforms into a work of art when you\'re not watching.', 'The Frame transforms into beautiful art when you are not watching TV. Choose from the Samsung Art Store to display your favorite works or upload your own photos.', '{\"display\": \"Matte Display\", \"feature\": \"Art Mode\", \"resolution\": \"4K UHD\", \"technology\": \"QLED\"}', 1999.99, 1799.99, 1450.00, 20, 5, 22400.00, '{\"depth\": \"24.9mm\", \"width\": \"1456.8mm\", \"height\": \"831.9mm\"}', 1, 12000, 4.90, 350, 'Samsung The Frame 65\" TV', 'A masterpiece in your living room. TV when it\'s on, art when it\'s off.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(22, 'Samsung The Frame 50\"', 'the-frame-50', 'QN50LS03BAFXZA', 1, 'Display your favorite art or photos with Art Mode on this stylish TV.', 'More than just a TV, The Frame is a canvas for your creativity. Its Matte Display drastically reduces reflections, so your art looks like a real painting.', '{\"display\": \"Matte Display\", \"feature\": \"Art Mode\", \"resolution\": \"4K UHD\", \"technology\": \"QLED\"}', 1299.99, 1099.99, 880.00, 30, 8, 11800.00, '{\"depth\": \"24.9mm\", \"width\": \"1124.1mm\", \"height\": \"644.9mm\"}', 0, 16000, 4.90, 410, 'Samsung The Frame 50\" TV', 'The perfect blend of art and technology for your space.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(23, 'Samsung 55??? The Serif QLED 4K', '55-the-serif-qled-4k', 'QN55LS01BAFXZA', 1, 'A TV that\'s a stunning design statement from every angle.', 'With its iconic I-shaped profile and 360 All-Round Design, The Serif is a focal point in any room, looking beautiful from front to back, side to side.', '{\"design\": \"The Serif by Bouroullec\", \"feature\": \"NFC on TV\", \"resolution\": \"4K UHD\", \"technology\": \"QLED\"}', 1499.99, 1299.99, 1050.00, 15, 4, 27200.00, '{\"depth\": \"482.8mm\", \"width\": \"1254.9mm\", \"height\": \"1237.4mm\"}', 0, 8500, 4.80, 150, 'Samsung 55??? The Serif TV', 'A unique and iconic design statement for any home.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(24, 'Samsung 43??? The Serif QLED 4K', '43-the-serif-qled-4k', 'QN43LS01BAFXZA', 1, 'An iconic I-shaped design that makes this TV a focal point in any room.', 'The Serif isn\'t just a TV; it\'s a piece of decor. Its unique design allows it to stand on its own feet, blending seamlessly with your home interior.', '{\"design\": \"The Serif by Bouroullec\", \"feature\": \"NFC on TV\", \"resolution\": \"4K UHD\", \"technology\": \"QLED\"}', 999.99, 899.99, 700.00, 25, 6, 17200.00, '{\"depth\": \"417.2mm\", \"width\": \"986.3mm\", \"height\": \"1028.4mm\"}', 0, 11000, 4.80, 190, 'Samsung 43??? The Serif TV', 'A beautifully designed TV that looks great from every angle.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(25, 'Samsung 65??? The Terrace Full Sun', '65-the-terrace-full-sun', 'QN65LST9TAFXZA', 1, 'An outdoor TV designed for bright, direct sunlight conditions.', 'Bring entertainment outdoors with The Terrace. It\'s engineered for direct sunlight with an anti-reflection screen and weather-resistant durability (IP55 rating).', '{\"feature\": \"Outdoor Full Sun\", \"brightness\": \"2000+ nits\", \"resolution\": \"4K UHD\", \"technology\": \"QLED\"}', 9999.99, 8999.99, 7500.00, 5, 2, 53500.00, '{\"depth\": \"59.8mm\", \"width\": \"1466.3mm\", \"height\": \"851.1mm\"}', 1, 6500, 4.90, 80, 'Samsung 65??? The Terrace Outdoor TV', 'Enjoy vivid picture quality in your backyard, even in direct sunlight.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(26, 'Samsung 55??? The Terrace Partial Sun', '55-the-terrace-partial-sun', 'QN55LST7TAFXZA', 1, 'A bright and clear outdoor TV, perfect for shaded areas like a patio or porch.', 'The Terrace is your year-round solution for outdoor entertainment. Designed for shaded areas, it delivers a bright and clear picture and is weather-resistant.', '{\"feature\": \"Outdoor Partial Sun\", \"brightness\": \"1500+ nits\", \"resolution\": \"4K UHD\", \"technology\": \"QLED\"}', 4999.99, 4499.99, 3600.00, 10, 3, 41300.00, '{\"depth\": \"59.8mm\", \"width\": \"1247.4mm\", \"height\": \"721.1mm\"}', 0, 8200, 4.90, 110, 'Samsung 55??? The Terrace Outdoor TV', 'The perfect outdoor TV for your covered patio or deck.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(27, 'Samsung 43\" The Sero QLED 4K', '43-the-sero-qled-4k', 'QN43LS05BAFXZA', 1, 'The rotating TV, optimized for viewing your mobile content.', 'Why not always have the best viewing perspective? The Sero moves to fit your content, landscape for TV and movies, and portrait for all your mobile content and apps.', '{\"sound\": \"4.1ch 60W Speakers\", \"feature\": \"Rotating Screen\", \"resolution\": \"4K UHD\", \"technology\": \"QLED\"}', 1499.99, 1299.99, 1000.00, 20, 5, 23000.00, '{\"depth\": \"327.0mm\", \"width\": \"564.7mm\", \"height\": \"1228.1mm\"}', 1, 11500, 4.70, 320, 'Samsung 43\" The Sero Rotating TV', 'The Sero, the TV that rotates to fit your content.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(28, 'The Sero Wheel', 'the-sero-wheel', 'VG-SCST43V/ZA', 1, 'Make your Sero TV portable and easily move it around your home.', 'Attach The Sero Wheel to the bottom of your Sero TV and enjoy your favorite content in any room. It\'s designed for smooth and easy movement.', '{\"type\": \"Accessory\", \"feature\": \"360-degree wheels\", \"material\": \"Plastic\", \"compatibility\": \"The Sero 43-inch\"}', 199.99, 199.99, 150.00, 50, 10, 2500.00, '{\"depth\": \"100.3mm\", \"width\": \"451.9mm\", \"height\": \"129.9mm\"}', 0, 7800, 4.90, 250, 'The Sero Wheel Official Accessory', 'Make your Sero TV portable with this easy-to-attach wheel stand.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(29, 'Samsung HW-Q990C Soundbar', 'hw-q990c-soundbar', 'HW-Q990CZAAXAA', 1, 'The ultimate 11.1.4ch soundbar with Wireless Dolby Atmos for immersive cinematic sound.', 'Immerse yourself in breathtaking cinematic sound with Wireless Dolby Atmos. The Q-Symphony technology synchronizes the soundbar with your Samsung TV for a harmonious audio experience.', '{\"power\": \"656W\", \"channels\": \"11.1.4ch\", \"features\": [\"Wireless Dolby Atmos\", \"DTS:X\", \"Q-Symphony\"], \"subwoofer\": \"Included\"}', 1899.99, 1699.99, 1350.00, 25, 5, 23000.00, '{\"depth\": \"138.0mm\", \"width\": \"1232.0mm\", \"height\": \"69.5mm\"}', 0, 9000, 4.90, 300, 'Samsung HW-Q990C Soundbar', 'The ultimate cinematic sound experience at home.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(30, 'Samsung HW-S800B Ultra Slim Soundbar', 'hw-s800b-soundbar', 'HW-S800B/ZA', 1, 'An incredibly slim design that delivers powerful sound and Wireless Dolby Atmos.', 'Experience powerful, room-filling sound from an impossibly slim soundbar. Its ultra-slim design fits perfectly with wall-mounted TVs.', '{\"power\": \"330W\", \"channels\": \"3.1.2ch\", \"features\": [\"Wireless Dolby Atmos\", \"Ultra Slim Design\", \"Q-Symphony\"], \"subwoofer\": \"Included\"}', 899.99, 699.99, 550.00, 60, 12, 9800.00, '{\"depth\": \"39.9mm\", \"width\": \"1160.0mm\", \"height\": \"38.0mm\"}', 0, 14000, 4.70, 480, 'Samsung HW-S800B Ultra Slim Soundbar', 'Powerful sound in an incredibly slim and stylish design.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(31, 'JBL Flip 6 Portable Waterproof Speaker', 'jbl-flip-6', 'JBLFLIP6BLKAM', 1, 'A portable waterproof speaker with surprisingly powerful sound.', 'Bigger, better sound on the go. The JBL Flip 6 is engineered to deliver powerful, crystal clear sound and is IP67 waterproof and dustproof so you can bring it anywhere.', '{\"brand\": \"JBL\", \"power\": \"20W RMS\", \"battery\": \"12 hours\", \"feature\": \"IP67 Waterproof\", \"connectivity\": \"Bluetooth 5.1\"}', 129.95, 109.95, 80.00, 200, 30, 550.00, '{\"depth\": \"72mm\", \"width\": \"178mm\", \"height\": \"68mm\"}', 0, 45000, 4.80, 3500, 'JBL Flip 6 Portable Speaker', 'Powerful and portable waterproof Bluetooth speaker.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(32, 'JBL Tune 760NC Wireless Headphones', 'jbl-tune-760nc', 'JBLT760NCBLK', 1, 'Wireless over-ear headphones with Active Noise Cancelling and Pure Bass Sound.', 'Your music, nothing else matters. The JBL Tune 760NC delivers JBL Pure Bass Sound and Active Noise Cancelling for a distraction-free, immersive audio experience.', '{\"brand\": \"JBL\", \"battery\": \"35 hours with ANC\", \"feature\": \"Active Noise Cancelling\", \"driver_size\": \"40mm\", \"connectivity\": \"Bluetooth 5.0\"}', 129.95, 99.95, 75.00, 150, 25, 220.00, '{\"depth\": \"62mm\", \"width\": \"205mm\", \"height\": \"223mm\"}', 0, 32000, 4.60, 2200, 'JBL Tune 760NC Wireless Headphones', 'Wireless noise-cancelling headphones with JBL Pure Bass Sound.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(33, 'The Freestyle 2nd Gen with Gaming Hub', 'the-freestyle-2nd-gen', 'SP-LFF3CLAXXXA', 1, 'A portable and versatile smart projector for entertainment anywhere.', 'Point and play. The Freestyle\'s compact design and 180-degree cradle stand let you project your favorite content on any surface, from wall to ceiling.', '{\"sound\": \"360-degree Speaker\", \"feature\": \"Portable Smart Projector\", \"brightness\": \"550 LED Lumen\", \"resolution\": \"1080p Full HD\"}', 799.99, 699.99, 580.00, 50, 10, 830.00, '{\"depth\": \"95.2mm\", \"width\": \"102.4mm\", \"height\": \"172.8mm\"}', 1, 19000, 4.80, 650, 'Samsung The Freestyle 2nd Gen Projector', 'A portable smart projector for a big screen experience anywhere.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(34, 'The Premiere 4K Smart Laser Projector', 'the-premiere-4k', 'SP-LSP9TFAXZA', 1, 'An ultra-short throw 4K laser projector for a true cinematic experience at home.', 'Get a massive screen from just inches away. The Premiere uses a laser light source to offer a dramatic home cinema experience with 4K resolution and incredible brightness.', '{\"feature\": \"Ultra Short Throw\", \"brightness\": \"2800 ANSI Lumen\", \"resolution\": \"4K UHD\", \"technology\": \"Triple Laser\"}', 6499.99, 5499.99, 4500.00, 10, 3, 11400.00, '{\"depth\": \"367mm\", \"width\": \"550mm\", \"height\": \"141mm\"}', 0, 7500, 4.90, 120, 'Samsung The Premiere 4K Laser Projector', 'The ultimate 4K home cinema experience with an ultra-short throw design.', '2025-10-21 07:07:36', '2025-12-12 00:36:48'),
(35, 'Auto-Rotating Wall Mount', 'auto-rotating-wall-mount', 'VG-ARAB22WMT', 1, 'Automatically rotate your TV from horizontal to vertical mode.', 'Enjoy your mobile content on the big screen. The Auto-Rotating Wall Mount allows you to rotate your compatible TV to view content in either landscape or portrait mode.', '{\"type\": \"Accessory\", \"feature\": \"Auto-Rotation\", \"max_load\": \"50kg\", \"compatibility\": [\"QN900C\", \"The Frame\"]}', 349.99, 299.99, 240.00, 100, 15, 8000.00, '{\"depth\": \"25mm\", \"width\": \"450mm\", \"height\": \"450mm\"}', 0, 6500, 4.90, 350, 'Samsung Auto-Rotating Wall Mount', 'Rotate your TV to match your content.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(36, 'Slim Fit Wall Mount', 'slim-fit-wall-mount', 'WMN-B50EB/ZA', 1, 'Mount your compatible Samsung TV nearly flush to the wall.', 'The Slim Fit Wall Mount minimizes the space between your TV and the wall for a minimalist, clean look that blends seamlessly into your home.', '{\"type\": \"Accessory\", \"feature\": \"Slim Fit Design\", \"max_load\": \"60kg\", \"compatibility\": [\"Crystal UHD\", \"QLED\"]}', 149.99, 129.99, 100.00, 200, 30, 1100.00, '{\"depth\": \"7.5mm\", \"width\": \"300mm\", \"height\": \"300mm\"}', 0, 15000, 4.90, 950, 'Samsung Slim Fit Wall Mount', 'Mount your TV nearly flush to the wall for a clean, minimalist look.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(37, 'Wireless Charger Trio', 'wireless-charger-trio', 'EP-P6300TBEGUS', 1, 'Charge up to three compatible devices at once.', 'Power up your ecosystem. The Wireless Charger Trio lets you charge your phone, watch, and earbuds all at the same time with dedicated spots for each.', '{\"type\": \"Wireless Charger\", \"ports\": \"1x USB-C\", \"power\": \"9W Fast Charging\", \"compatibility\": [\"Galaxy Phones\", \"Galaxy Watch\", \"Galaxy Buds\"]}', 89.99, 79.99, 55.00, 300, 40, 320.00, '{\"depth\": \"15.5mm\", \"width\": \"240mm\", \"height\": \"86mm\"}', 0, 22000, 4.70, 1800, 'Samsung Wireless Charger Trio', 'The convenient way to charge your Galaxy ecosystem.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(38, 'Galaxy S24 Ultra Silicone Case', 's24-ultra-silicone-case', 'EF-PS928TBEGUS', 1, 'Soft, stylish, and comfortable protection for your S24 Ultra.', 'Made of soft silicone, this case provides a comfortable grip and stylish protection for your Galaxy S24 Ultra without adding bulk.', '{\"type\": \"Case\", \"feature\": \"Soft-touch finish\", \"material\": \"Silicone\", \"compatibility\": [\"Galaxy S24 Ultra\"]}', 29.99, 24.99, 15.00, 500, 50, 50.00, '{\"depth\": \"11.1mm\", \"width\": \"83.2mm\", \"height\": \"166.5mm\"}', 0, 35000, 4.80, 2100, 'Official Samsung Galaxy S24 Ultra Silicone Case', 'Soft and stylish protection for your S24 Ultra.', '2025-10-21 07:07:36', '2025-10-21 07:07:36'),
(39, 'Samsung Galaxy Book4 Pro 360', 'galaxy-book4-pro-360', 'NP960QGK-KG1US', 1, 'The ultimate 2-in-1 laptop with Intel Core Ultra and Dynamic AMOLED 2X display.', 'Experience next-level creativity and productivity with the Galaxy Book4 Pro 360. Powered by Intel Core Ultra processor with AI capabilities, this convertible laptop features a stunning Dynamic AMOLED 2X touchscreen and comes with the S Pen for ultimate versatility.', '{\"battery\": \"76Wh\", \"features\": [\"S Pen Included\", \"AKG Tuned Speakers\", \"Dolby Atmos\"], \"graphics\": \"Intel Arc Graphics\", \"connectivity\": [\"Wi-Fi 6E\", \"Bluetooth 5.3\", \"Thunderbolt 4\"]}', 1899.99, 1699.99, 1400.00, 20, 5, 1660.00, '{\"depth\": \"12.5mm\", \"width\": \"250.4mm\", \"height\": \"354.85mm\"}', 1, 5200, 4.85, 98, 'Samsung Galaxy Book4 Pro 360 2-in-1 Laptop', 'Premium convertible laptop with Intel Core Ultra and AMOLED display.', '2025-12-13 09:48:48', '2025-12-13 09:48:48'),
(40, 'Samsung Galaxy Book4 Pro', 'galaxy-book4-pro', 'NP960XGK-KG1US', 1, 'Ultra-thin premium laptop with exceptional performance and stunning display.', 'The Galaxy Book4 Pro delivers powerful performance in an incredibly thin and light design. With Intel Core Ultra processors and a vibrant AMOLED display, its perfect for professionals who need power on the go.', '{\"battery\": \"63Wh\", \"features\": [\"AKG Tuned Speakers\", \"Dolby Atmos\", \"Fingerprint Reader\"], \"graphics\": \"Intel Arc Graphics\", \"connectivity\": [\"Wi-Fi 6E\", \"Bluetooth 5.3\", \"Thunderbolt 4\"]}', 1699.99, 1499.99, 1200.00, 30, 8, 1230.00, '{\"depth\": \"11.6mm\", \"width\": \"229.8mm\", \"height\": \"354.4mm\"}', 1, 6800, 4.80, 145, 'Samsung Galaxy Book4 Pro Laptop', 'Ultra-thin professional laptop with Intel Core Ultra processor.', '2025-12-13 09:48:48', '2025-12-13 09:48:48'),
(41, 'Samsung Galaxy Book4 Ultra', 'galaxy-book4-ultra', 'NP960XGL-XG2US', 1, 'The most powerful Galaxy laptop with RTX graphics for creators and gamers.', 'Unleash your creativity with the Galaxy Book4 Ultra. Featuring Intel Core Ultra 9 processor and NVIDIA GeForce RTX 4070 graphics, this powerhouse laptop is built for the most demanding creative work, 3D rendering, and gaming.', '{\"battery\": \"76Wh\", \"features\": [\"Vapor Chamber Cooling\", \"AKG Quad Speakers\", \"Studio Quality Microphone\"], \"graphics\": \"NVIDIA GeForce RTX 4070\", \"connectivity\": [\"Wi-Fi 7\", \"Bluetooth 5.3\", \"Thunderbolt 4\"]}', 2699.99, 2499.99, 2000.00, 15, 5, 1800.00, '{\"depth\": \"16.5mm\", \"width\": \"250.4mm\", \"height\": \"354.85mm\"}', 1, 4100, 4.90, 87, 'Samsung Galaxy Book4 Ultra High-Performance Laptop', 'The ultimate creator laptop with RTX 4070 graphics and Intel Core Ultra.', '2025-12-13 09:48:48', '2025-12-13 09:48:48'),
(42, 'Samsung Galaxy Book4', 'galaxy-book4', 'NP750XGK-KG1US', 1, 'Powerful everyday laptop with great performance and battery life.', 'The Galaxy Book4 offers the perfect balance of performance, portability, and value. With Intel Core processor and all-day battery life, its ideal for students and professionals who need reliable computing.', '{\"battery\": \"54Wh\", \"features\": [\"Stereo Speakers\", \"HD Webcam\", \"Backlit Keyboard\"], \"graphics\": \"Intel UHD Graphics\", \"connectivity\": [\"Wi-Fi 6E\", \"Bluetooth 5.3\", \"USB-C\"]}', 799.99, 699.99, 560.00, 50, 10, 1580.00, '{\"depth\": \"15.4mm\", \"width\": \"228.8mm\", \"height\": \"355.4mm\"}', 0, 8900, 4.65, 210, 'Samsung Galaxy Book4 Laptop', 'Reliable everyday laptop with great performance and battery life.', '2025-12-13 09:48:48', '2025-12-13 09:48:48'),
(43, 'Samsung Galaxy Book3 360', 'galaxy-book3-360', 'NP730QFG-KA1US', 1, 'Versatile 2-in-1 laptop perfect for work, creativity, and entertainment.', 'Transform the way you work and create with the Galaxy Book3 360. This convertible laptop features a 360-degree hinge, touchscreen display, and comes with the S Pen for note-taking, drawing, and precise control.', '{\"battery\": \"63Wh\", \"features\": [\"S Pen Included\", \"Dolby Atmos\", \"AKG Speakers\"], \"graphics\": \"Intel Iris Xe Graphics\", \"connectivity\": [\"Wi-Fi 6E\", \"Bluetooth 5.1\", \"Thunderbolt 4\"]}', 1299.99, 1099.99, 880.00, 35, 8, 1560.00, '{\"depth\": \"13.9mm\", \"width\": \"212.7mm\", \"height\": \"304.9mm\"}', 0, 7200, 4.75, 165, 'Samsung Galaxy Book3 360 Convertible Laptop', 'Versatile 2-in-1 laptop with S Pen and touchscreen display.', '2025-12-13 09:48:48', '2025-12-13 09:48:48'),
(44, 'Samsung Galaxy Book2 Pro', 'galaxy-book2-pro', 'NP950XED-KA1US', 1, 'Ultra-light premium laptop with stunning AMOLED display.', 'Experience premium computing with the Galaxy Book2 Pro. Featuring a brilliant AMOLED display, 12th Gen Intel Core processor, and weighing just over 2 pounds, its the perfect companion for professionals on the move.', '{\"battery\": \"63Wh\", \"features\": [\"AKG Speakers\", \"Dolby Atmos\", \"Fingerprint Sensor\"], \"graphics\": \"Intel Iris Xe Graphics\", \"connectivity\": [\"Wi-Fi 6E\", \"Bluetooth 5.1\", \"Thunderbolt 4\"]}', 1399.99, 1199.99, 950.00, 25, 6, 870.00, '{\"depth\": \"11.2mm\", \"width\": \"199.8mm\", \"height\": \"304.4mm\"}', 0, 6500, 4.80, 142, 'Samsung Galaxy Book2 Pro Laptop', 'Ultra-light premium laptop with stunning AMOLED display.', '2025-12-13 09:48:48', '2025-12-13 09:48:48'),
(45, 'Samsung Galaxy Book Go', 'galaxy-book-go', 'NP340XLA-KA1US', 1, 'Always-connected laptop with exceptional battery life and 5G capability.', 'Stay connected wherever you go with the Galaxy Book Go. Powered by Snapdragon processor with built-in 5G connectivity, this laptop delivers all-day battery life and instant-on performance for the mobile professional.', '{\"battery\": \"42.3Wh\", \"features\": [\"All-Day Battery\", \"Fanless Design\", \"Always Connected\"], \"graphics\": \"Qualcomm Adreno GPU\", \"connectivity\": [\"5G\", \"Wi-Fi 6\", \"Bluetooth 5.1\", \"USB-C\"]}', 549.99, 499.99, 400.00, 45, 10, 1380.00, '{\"depth\": \"14.9mm\", \"width\": \"224.0mm\", \"height\": \"325.4mm\"}', 0, 9800, 4.55, 280, 'Samsung Galaxy Book Go Always-Connected Laptop', 'Affordable always-connected laptop with 5G and all-day battery.', '2025-12-13 09:48:48', '2025-12-13 09:48:48'),
(46, 'Samsung Galaxy S23 FE', 'galaxy-s23-fe', 'SM-S711UZAAXAA', 1, 'Fan Edition flagship with premium features at an accessible price.', 'Experience flagship performance with the Galaxy S23 FE. Featuring a powerful processor, pro-grade camera system, and all-day battery life, this Fan Edition brings premium Galaxy features to more users.', '{\"camera\": {\"main\": \"50MP\", \"telephoto\": \"8MP 3x\", \"ultrawide\": \"12MP\"}, \"battery\": \"4500mAh\", \"display\": \"6.4-inch Dynamic AMOLED 2X\", \"features\": [\"120Hz Display\", \"IP68\", \"Wireless Charging\"], \"processor\": \"Exynos 2200\"}', 599.99, 549.99, 440.00, 118, 10, 209.00, '{\"depth\": \"8.2mm\", \"width\": \"76.5mm\", \"height\": \"158.0mm\"}', 1, 12500, 4.70, 380, 'Samsung Galaxy S23 FE', 'Flagship features at an accessible price with Galaxy S23 FE.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(47, 'Samsung Galaxy A54 5G', 'galaxy-a54-5g', 'SM-A546UZAAXAA', 1, 'Premium mid-range phone with flagship camera and vibrant display.', 'The Galaxy A54 5G combines premium design with powerful performance. With a pro-grade camera system, smooth 120Hz Super AMOLED display, and 5G connectivity, it delivers flagship experience at mid-range price.', '{\"camera\": {\"main\": \"50MP OIS\", \"macro\": \"5MP\", \"ultrawide\": \"12MP\"}, \"battery\": \"5000mAh\", \"display\": \"6.4-inch Super AMOLED\", \"features\": [\"120Hz Display\", \"IP67\", \"Stereo Speakers\"], \"processor\": \"Exynos 1380\"}', 449.99, 399.99, 320.00, 158, 15, 202.00, '{\"depth\": \"8.2mm\", \"width\": \"76.7mm\", \"height\": \"158.2mm\"}', 1, 18900, 4.65, 520, 'Samsung Galaxy A54 5G', 'Premium mid-range phone with flagship-level camera.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(48, 'Samsung Galaxy A34 5G', 'galaxy-a34-5g', 'SM-A346UZAAXAA', 1, 'Stylish 5G phone with great display and battery life.', 'Stay connected in style with the Galaxy A34 5G. Featuring a vibrant Super AMOLED display, versatile triple camera, and long-lasting battery, its perfect for everyday use.', '{\"camera\": {\"main\": \"48MP OIS\", \"macro\": \"5MP\", \"ultrawide\": \"8MP\"}, \"battery\": \"5000mAh\", \"display\": \"6.6-inch Super AMOLED\", \"features\": [\"120Hz Display\", \"IP67\", \"5G\"], \"processor\": \"MediaTek Dimensity 1080\"}', 349.99, 299.99, 240.00, 125, 15, 199.00, '{\"depth\": \"8.2mm\", \"width\": \"78.1mm\", \"height\": \"161.3mm\"}', 0, 15600, 4.60, 410, 'Samsung Galaxy A34 5G', 'Stylish 5G phone with vibrant display and long battery.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(49, 'Samsung Galaxy A24', 'galaxy-a24', 'SM-A245UZAAXAA', 1, 'Affordable smartphone with premium Super AMOLED display.', 'Get more for less with the Galaxy A24. Enjoy a stunning Super AMOLED display, capable triple camera system, and reliable all-day battery in an affordable package.', '{\"camera\": {\"main\": \"50MP\", \"macro\": \"2MP\", \"ultrawide\": \"5MP\"}, \"battery\": \"5000mAh\", \"display\": \"6.5-inch Super AMOLED\", \"features\": [\"90Hz Display\", \"Fast Charging\"], \"processor\": \"MediaTek Helio G99\"}', 249.99, 229.99, 180.00, 135, 20, 195.00, '{\"depth\": \"8.3mm\", \"width\": \"77.6mm\", \"height\": \"162.1mm\"}', 0, 22000, 4.55, 680, 'Samsung Galaxy A24', 'Affordable phone with premium Super AMOLED display.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(50, 'Samsung Galaxy A14 5G', 'galaxy-a14-5g', 'SM-A146UZAAXAA', 1, 'Budget-friendly 5G phone with essential features.', 'Enter the world of 5G with the Galaxy A14 5G. This budget-friendly smartphone delivers fast connectivity, decent performance, and a large display for entertainment and productivity.', '{\"camera\": {\"main\": \"50MP\", \"depth\": \"2MP\", \"macro\": \"2MP\"}, \"battery\": \"5000mAh\", \"display\": \"6.6-inch PLS LCD\", \"features\": [\"90Hz Display\", \"5G\", \"Expandable Storage\"], \"processor\": \"MediaTek Dimensity 700\"}', 199.99, 179.99, 140.00, 165, 25, 201.00, '{\"depth\": \"9.1mm\", \"width\": \"78.0mm\", \"height\": \"167.7mm\"}', 0, 28000, 4.45, 890, 'Samsung Galaxy A14 5G', 'Budget 5G phone with essential features and large display.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(51, 'Samsung Galaxy Z Fold5', 'galaxy-z-fold5', 'SM-F946UZAAXAA', 1, 'The ultimate foldable phone with enhanced multitasking.', 'Unfold your world with the Galaxy Z Fold5. This premium foldable features a large inner display perfect for multitasking, a powerful camera system, and the S Pen support for ultimate productivity.', '{\"camera\": {\"main\": \"50MP\", \"telephoto\": \"10MP 3x\", \"ultrawide\": \"12MP\"}, \"battery\": \"4400mAh\", \"display\": \"7.6-inch Dynamic AMOLED 2X (Main), 6.2-inch (Cover)\", \"features\": [\"IPX8\", \"S Pen Support\", \"Flex Mode\"], \"processor\": \"Snapdragon 8 Gen 2 for Galaxy\"}', 1799.99, 1599.99, 1280.00, 35, 5, 253.00, '{\"depth\": \"6.1mm\", \"width\": \"129.9mm\", \"height\": \"154.9mm\"}', 1, 8700, 4.85, 245, 'Samsung Galaxy Z Fold5', 'Premium foldable phone with ultimate multitasking capabilities.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(52, 'Samsung Galaxy Z Flip5', 'galaxy-z-flip5', 'SM-F731UZAAXAA', 1, 'Compact foldable with large cover screen and stylish design.', 'Make a statement with the Galaxy Z Flip5. This compact foldable features a large cover screen for quick interactions, powerful performance, and a stylish design that fits in your pocket.', '{\"camera\": {\"main\": \"12MP\", \"ultrawide\": \"12MP\"}, \"battery\": \"3700mAh\", \"display\": \"6.7-inch Dynamic AMOLED 2X (Main), 3.4-inch (Cover)\", \"features\": [\"IPX8\", \"Flex Mode\", \"FlexCam\"], \"processor\": \"Snapdragon 8 Gen 2 for Galaxy\"}', 999.99, 899.99, 720.00, 95, 8, 187.00, '{\"depth\": \"6.9mm\", \"width\": \"71.9mm\", \"height\": \"165.1mm\"}', 1, 14200, 4.80, 420, 'Samsung Galaxy Z Flip5', 'Stylish compact foldable with large cover display.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(53, 'Samsung Galaxy S22', 'galaxy-s22', 'SM-S901UZAAXAA', 1, 'Compact flagship with powerful camera and performance.', 'The Galaxy S22 delivers flagship power in a compact design. With a pro-grade camera, adaptive 120Hz display, and all-day battery, its perfect for those who want premium features in a pocket-friendly size.', '{\"camera\": {\"main\": \"50MP\", \"telephoto\": \"10MP 3x\", \"ultrawide\": \"12MP\"}, \"battery\": \"3700mAh\", \"display\": \"6.1-inch Dynamic AMOLED 2X\", \"features\": [\"120Hz Display\", \"IP68\", \"Wireless Charging\"], \"processor\": \"Snapdragon 8 Gen 1\"}', 799.99, 699.99, 560.00, 83, 10, 167.00, '{\"depth\": \"7.6mm\", \"width\": \"70.6mm\", \"height\": \"146.0mm\"}', 0, 16800, 4.75, 580, 'Samsung Galaxy S22', 'Compact flagship with pro-grade camera system.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(54, 'Samsung Galaxy S21 FE', 'galaxy-s21-fe', 'SM-G990UZAAXAA', 1, 'Fan favorite with flagship features and 5G connectivity.', 'The Galaxy S21 FE brings flagship features to more users. With a pro-grade camera, smooth 120Hz display, and powerful processor, it delivers premium Galaxy experience at an attractive price.', '{\"camera\": {\"main\": \"12MP\", \"telephoto\": \"8MP 3x\", \"ultrawide\": \"12MP\"}, \"battery\": \"4500mAh\", \"display\": \"6.4-inch Dynamic AMOLED 2X\", \"features\": [\"120Hz Display\", \"IP68\", \"5G\"], \"processor\": \"Snapdragon 888\"}', 699.99, 599.99, 480.00, 125, 10, 177.00, '{\"depth\": \"7.9mm\", \"width\": \"74.5mm\", \"height\": \"155.7mm\"}', 0, 19500, 4.70, 720, 'Samsung Galaxy S21 FE', 'Fan Edition with flagship features and 5G.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(55, 'Samsung Galaxy A05s', 'galaxy-a05s', 'SM-A057FZAAXAA', 1, 'Entry-level smartphone with large display and battery.', 'Start your Galaxy journey with the A05s. This entry-level smartphone offers a large display for entertainment, decent camera for memories, and long-lasting battery for all-day use.', '{\"camera\": {\"main\": \"50MP\", \"depth\": \"2MP\", \"macro\": \"2MP\"}, \"battery\": \"5000mAh\", \"display\": \"6.7-inch PLS LCD\", \"features\": [\"90Hz Display\", \"Fast Charging\", \"Expandable Storage\"], \"processor\": \"Snapdragon 680\"}', 149.99, 139.99, 110.00, 195, 30, 194.00, '{\"depth\": \"8.8mm\", \"width\": \"77.8mm\", \"height\": \"168.0mm\"}', 0, 31000, 4.40, 950, 'Samsung Galaxy A05s', 'Entry-level phone with large display and battery.', '2025-12-16 07:50:09', '2025-12-16 07:54:05'),
(56, 'Samsung Galaxy Tab S9+', 'galaxy-tab-s9-plus', 'SM-X810UZAAXAA', 1, 'Premium tablet with stunning AMOLED display and S Pen.', 'Experience premium tablet computing with the Galaxy Tab S9+. Featuring a stunning Dynamic AMOLED 2X display, powerful performance, and included S Pen, its perfect for work and creativity.', '{\"camera\": {\"main\": \"13MP\", \"ultrawide\": \"8MP\"}, \"battery\": \"10090mAh\", \"display\": \"12.4-inch Dynamic AMOLED 2X\", \"features\": [\"120Hz Display\", \"IP68\", \"S Pen Included\", \"DeX Mode\"], \"processor\": \"Snapdragon 8 Gen 2\"}', 999.99, 899.99, 720.00, 60, 8, 581.00, '{\"depth\": \"5.7mm\", \"width\": \"285.4mm\", \"height\": \"185.4mm\"}', 1, 9800, 4.85, 280, 'Samsung Galaxy Tab S9+', 'Premium tablet with AMOLED display and S Pen included.', '2025-12-16 07:50:10', '2025-12-16 07:54:05'),
(57, 'Samsung Galaxy Tab S9', 'galaxy-tab-s9', 'SM-X710UZAAXAA', 1, 'Compact premium tablet with flagship performance.', 'The Galaxy Tab S9 delivers flagship tablet experience in a more compact form. With Dynamic AMOLED 2X display, S Pen, and IP68 rating, its built for productivity anywhere.', '{\"camera\": {\"main\": \"13MP\", \"ultrawide\": \"8MP\"}, \"battery\": \"8400mAh\", \"display\": \"11.0-inch Dynamic AMOLED 2X\", \"features\": [\"120Hz Display\", \"IP68\", \"S Pen Included\", \"DeX Mode\"], \"processor\": \"Snapdragon 8 Gen 2\"}', 799.99, 749.99, 600.00, 73, 10, 498.00, '{\"depth\": \"5.9mm\", \"width\": \"254.3mm\", \"height\": \"165.8mm\"}', 1, 11200, 4.80, 320, 'Samsung Galaxy Tab S9', 'Compact premium tablet with flagship features.', '2025-12-16 07:50:10', '2025-12-16 07:54:05'),
(58, 'Samsung Galaxy Tab S9 FE+', 'galaxy-tab-s9-fe-plus', 'SM-X610UZAAXAA', 1, 'Large Fan Edition tablet with premium features.', 'Get more screen for less with the Galaxy Tab S9 FE+. This large tablet offers a stunning display, S Pen included, and great performance for entertainment and productivity at an attractive price.', '{\"camera\": {\"main\": \"8MP\", \"ultrawide\": \"12MP\"}, \"battery\": \"10090mAh\", \"display\": \"12.4-inch LCD\", \"features\": [\"90Hz Display\", \"IP68\", \"S Pen Included\", \"DeX Mode\"], \"processor\": \"Exynos 1380\"}', 599.99, 549.99, 440.00, 90, 10, 627.00, '{\"depth\": \"6.5mm\", \"width\": \"285.4mm\", \"height\": \"185.4mm\"}', 0, 8500, 4.70, 240, 'Samsung Galaxy Tab S9 FE+', 'Large Fan Edition tablet with S Pen and great value.', '2025-12-16 07:50:10', '2025-12-16 07:54:05'),
(59, 'Samsung Galaxy Tab S9 FE', 'galaxy-tab-s9-fe', 'SM-X510UZAAXAA', 1, 'Affordable premium tablet with S Pen included.', 'The Galaxy Tab S9 FE brings premium tablet features to more users. With a vibrant display, S Pen included, and IP68 water resistance, it delivers great value for work and play.', '{\"camera\": {\"main\": \"8MP\", \"ultrawide\": \"12MP\"}, \"battery\": \"8000mAh\", \"display\": \"10.9-inch LCD\", \"features\": [\"90Hz Display\", \"IP68\", \"S Pen Included\", \"DeX Mode\"], \"processor\": \"Exynos 1380\"}', 449.99, 399.99, 320.00, 141, 12, 523.00, '{\"depth\": \"6.5mm\", \"width\": \"254.3mm\", \"height\": \"165.8mm\"}', 0, 10500, 4.65, 290, 'Samsung Galaxy Tab S9 FE', 'Affordable premium tablet with S Pen and IP68.', '2025-12-16 07:50:10', '2025-12-16 07:54:05'),
(60, 'Samsung Galaxy Tab A9+', 'galaxy-tab-a9-plus', 'SM-X210UZAAXAA', 1, 'Large entertainment tablet with great speakers.', 'Enjoy immersive entertainment with the Galaxy Tab A9+. Featuring a large display, quad speakers, and long battery life, its perfect for streaming, gaming, and browsing.', '{\"camera\": {\"main\": \"8MP\", \"front\": \"5MP\"}, \"battery\": \"7040mAh\", \"display\": \"11.0-inch LCD\", \"features\": [\"90Hz Display\", \"Quad Speakers\", \"Expandable Storage\"], \"processor\": \"Snapdragon 695\"}', 269.99, 249.99, 200.00, 143, 15, 480.00, '{\"depth\": \"6.9mm\", \"width\": \"257.1mm\", \"height\": \"168.7mm\"}', 0, 13800, 4.60, 420, 'Samsung Galaxy Tab A9+', 'Entertainment tablet with large display and quad speakers.', '2025-12-16 07:50:10', '2025-12-16 07:54:05');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `product_id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`product_id`, `category_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(7, 1),
(8, 1),
(37, 1),
(38, 1),
(46, 1),
(47, 1),
(48, 1),
(49, 1),
(50, 1),
(51, 1),
(52, 1),
(53, 1),
(54, 1),
(55, 1),
(56, 1),
(57, 1),
(58, 1),
(59, 1),
(60, 1),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 2),
(20, 2),
(21, 2),
(22, 2),
(23, 2),
(24, 2),
(25, 2),
(26, 2),
(27, 2),
(5, 4),
(6, 4),
(9, 4),
(10, 4),
(39, 4),
(40, 4),
(41, 4),
(42, 4),
(43, 4),
(44, 4),
(45, 4),
(37, 6),
(38, 6),
(1, 7),
(2, 7),
(46, 7),
(47, 7),
(48, 7),
(49, 7),
(50, 7),
(51, 7),
(52, 7),
(53, 7),
(54, 7),
(55, 7),
(3, 8),
(4, 8),
(56, 8),
(57, 8),
(58, 8),
(59, 8),
(60, 8),
(37, 12),
(38, 12),
(7, 13),
(8, 13),
(11, 14),
(12, 14),
(13, 14),
(14, 14),
(15, 14),
(16, 14),
(17, 15),
(18, 15),
(19, 15),
(20, 15),
(21, 16),
(22, 16),
(23, 16),
(24, 16),
(25, 16),
(26, 16),
(27, 16),
(5, 26),
(6, 26),
(39, 26),
(40, 26),
(41, 26),
(42, 26),
(43, 26),
(44, 26),
(45, 26),
(9, 27),
(10, 28);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `image_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `variant_id` bigint UNSIGNED DEFAULT NULL,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`image_id`, `product_id`, `variant_id`, `image_url`, `alt_text`, `display_order`, `is_primary`) VALUES
(1, 1, NULL, '/images/products/s24-ultra/main.jpg', 'Samsung Galaxy S24 Ultra Main View', 1, 1),
(2, 1, NULL, '/images/products/s24-ultra/camera-detail.jpg', 'Close-up on Galaxy S24 Ultra camera system', 2, 0),
(3, 1, 1, '/images/products/s24-ultra/gray.jpg', 'Galaxy S24 Ultra in Titanium Gray', 3, 0),
(4, 1, 2, '/images/products/s24-ultra/black.jpg', 'Galaxy S24 Ultra in Titanium Black', 4, 0),
(5, 1, 3, '/images/products/s24-ultra/violet.jpg', 'Galaxy S24 Ultra in Titanium Violet', 5, 0),
(6, 1, 4, '/images/products/s24-ultra/yellow.jpg', 'Galaxy S24 Ultra in Titanium Yellow', 6, 0),
(7, 2, NULL, '/images/products/s24-plus/main.jpg', 'Samsung Galaxy S24+ front view', 1, 1),
(8, 2, 5, '/images/products/s24-plus/black.jpg', 'Galaxy S24+ in Onyx Black', 2, 0),
(9, 2, 6, '/images/products/s24-plus/gray.jpg', 'Galaxy S24+ in Marble Gray', 3, 0),
(10, 2, 7, '/images/products/s24-plus/violet.jpg', 'Galaxy S24+ in Cobalt Violet', 4, 0),
(11, 3, NULL, '/images/products/tab-s9-ultra/main.jpg', 'Samsung Galaxy Tab S9 Ultra with S Pen', 1, 1),
(12, 3, 8, '/images/products/tab-s9-ultra/graphite.jpg', 'Galaxy Tab S9 Ultra in Graphite', 2, 0),
(13, 3, 9, '/images/products/tab-s9-ultra/beige.jpg', 'Galaxy Tab S9 Ultra in Beige', 3, 0),
(14, 4, NULL, '/images/products/tab-a8/main.jpg', 'Samsung Galaxy Tab A8 front view', 1, 1),
(15, 5, NULL, '/images/products/galaxy-book3-ultra/main.jpg', 'Samsung Galaxy Book3 Ultra laptop open', 1, 1),
(16, 5, NULL, '/images/products/galaxy-book3-ultra/side-view.jpg', 'Galaxy Book3 Ultra side profile showing ports', 2, 0),
(17, 6, NULL, '/images/products/galaxy-book3-pro-360/main.jpg', 'Samsung Galaxy Book3 Pro 360 in laptop mode', 1, 1),
(18, 6, NULL, '/images/products/galaxy-book3-pro-360/tent-mode.jpg', 'Galaxy Book3 Pro 360 in tent mode with S Pen', 2, 0),
(19, 7, NULL, '/images/products/renewed-s23-ultra/main.jpg', 'Certified Re-Newed Galaxy S23 Ultra front view', 1, 1),
(20, 8, NULL, '/images/products/renewed-z-fold4/main.jpg', 'Certified Re-Newed Galaxy Z Fold4 unfolded', 1, 1),
(21, 9, NULL, '/images/products/odyssey-g9/main.jpg', 'Samsung 49\" Odyssey G9 Gaming Monitor on a desk', 1, 1),
(22, 9, NULL, '/images/products/odyssey-g9/lifestyle.jpg', 'Odyssey G9 in a gaming setup', 2, 0),
(23, 10, NULL, '/images/products/t7-shield/main.jpg', 'Samsung T7 Shield 2TB Portable SSD', 1, 1),
(24, 10, 11, '/images/products/t7-shield/black.jpg', 'T7 Shield SSD in Black', 2, 0),
(25, 10, 12, '/images/products/t7-shield/blue.jpg', 'T7 Shield SSD in Blue', 3, 0),
(26, 10, 13, '/images/products/t7-shield/beige.jpg', 'T7 Shield SSD in Beige', 4, 0),
(27, 11, NULL, '/images/products/micro-led/110-main.jpg', 'Samsung 110-inch MICRO LED TV', 1, 1),
(28, 12, NULL, '/images/products/micro-led/98-main.jpg', 'Samsung 98-inch MICRO LED TV', 1, 1),
(29, 13, NULL, '/images/products/neo-qled/qn900c-85.jpg', 'Samsung 85-inch Neo QLED 8K TV QN900C', 1, 1),
(30, 14, NULL, '/images/products/neo-qled/qn90c-75.jpg', 'Samsung 75-inch Neo QLED 4K TV QN90C', 1, 1),
(31, 14, 14, '/images/products/neo-qled/qn90c-65-variant.jpg', '65-inch variant of Neo QLED 4K TV QN90C', 2, 0),
(32, 14, 15, '/images/products/neo-qled/qn90c-55-variant.jpg', '55-inch variant of Neo QLED 4K TV QN90C', 3, 0),
(33, 14, 16, '/images/products/neo-qled/qn90c-85-variant.jpg', '85-inch variant of Neo QLED 4K TV QN90C', 4, 0),
(34, 15, NULL, '/images/products/oled/s95c-77.jpg', 'Samsung 77-inch OLED S95C TV', 1, 1),
(35, 16, NULL, '/images/products/oled/s90c-55.jpg', 'Samsung 55-inch OLED S90C TV', 1, 1),
(36, 17, NULL, '/images/products/qled/q80c-85.jpg', 'Samsung 85-inch QLED 4K TV Q80C', 1, 1),
(37, 18, NULL, '/images/products/qled/q70c-65.jpg', 'Samsung 65-inch QLED 4K TV Q70C', 1, 1),
(38, 19, NULL, '/images/products/crystal-uhd/du8000-85.jpg', 'Samsung 85-inch Crystal UHD TV DU8000', 1, 1),
(39, 20, NULL, '/images/products/crystal-uhd/du7200-55.jpg', 'Samsung 55-inch Crystal UHD TV DU7200', 1, 1),
(40, 21, NULL, '/images/products/the-frame/65-main.jpg', 'Samsung The Frame 65-inch TV displaying art', 1, 1),
(41, 21, NULL, '/images/products/the-frame/65-tv-mode.jpg', 'The Frame 65-inch in TV mode', 2, 0),
(42, 21, 17, '/images/products/the-frame/bezel-teak.jpg', 'The Frame TV with a Teak Bezel', 3, 0),
(43, 21, 18, '/images/products/the-frame/bezel-white.jpg', 'The Frame TV with a White Bezel', 4, 0),
(44, 21, 19, '/images/products/the-frame/bezel-brown.jpg', 'The Frame TV with a Brown Bezel', 5, 0),
(45, 22, NULL, '/images/products/the-frame/50-main.jpg', 'Samsung The Frame 50-inch TV', 1, 1),
(46, 23, NULL, '/images/products/the-serif/55-main.jpg', 'Samsung 55-inch The Serif TV on its stand', 1, 1),
(47, 24, NULL, '/images/products/the-serif/43-main.jpg', 'Samsung 43-inch The Serif TV', 1, 1),
(48, 25, NULL, '/images/products/the-terrace/65-main.jpg', 'Samsung 65-inch The Terrace Outdoor TV', 1, 1),
(49, 26, NULL, '/images/products/the-terrace/55-main.jpg', 'Samsung 55-inch The Terrace Outdoor TV in a patio setting', 1, 1),
(50, 27, NULL, '/images/products/the-sero/main.jpg', 'Samsung 43-inch The Sero TV in horizontal mode', 1, 1),
(51, 27, NULL, '/images/products/the-sero/vertical-mode.jpg', 'The Sero TV rotated in vertical mode', 2, 0),
(52, 28, NULL, '/images/products/accessories/sero-wheel.jpg', 'The Sero Wheel accessory', 1, 1),
(53, 29, NULL, '/images/products/soundbar/q990c.jpg', 'Samsung HW-Q990C Soundbar with subwoofer and rear speakers', 1, 1),
(54, 30, NULL, '/images/products/soundbar/s800b.jpg', 'Samsung HW-S800B Ultra Slim Soundbar', 1, 1),
(55, 31, NULL, '/images/products/jbl/flip-6-main.jpg', 'JBL Flip 6 Portable Waterproof Speaker', 1, 1),
(56, 31, 20, '/images/products/jbl/flip-6-blue.jpg', 'JBL Flip 6 Speaker in Blue', 2, 0),
(57, 31, 21, '/images/products/jbl/flip-6-red.jpg', 'JBL Flip 6 Speaker in Red', 3, 0),
(58, 31, 22, '/images/products/jbl/flip-6-teal.jpg', 'JBL Flip 6 Speaker in Teal', 4, 0),
(59, 32, NULL, '/images/products/jbl/tune-760nc.jpg', 'JBL Tune 760NC Wireless Headphones', 1, 1),
(60, 33, NULL, '/images/products/projector/freestyle-gen2.jpg', 'The Freestyle 2nd Gen Projector projecting a screen', 1, 1),
(61, 34, NULL, '/images/products/projector/the-premiere.jpg', 'The Premiere 4K Smart Laser Projector in a living room', 1, 1),
(62, 35, NULL, '/images/products/accessories/auto-rotating-mount.jpg', 'Auto-Rotating Wall Mount for TVs', 1, 1),
(63, 36, NULL, '/images/products/accessories/slim-fit-mount.jpg', 'Slim Fit Wall Mount for TVs', 1, 1),
(64, 37, NULL, '/images/products/accessories/charger-trio.jpg', 'Wireless Charger Trio', 1, 1),
(65, 37, NULL, '/images/products/accessories/charger-trio-in-use.jpg', 'Wireless Charger Trio charging a phone, watch, and earbuds', 2, 0),
(66, 38, NULL, '/images/products/accessories/s24-case-main.jpg', 'Galaxy S24 Ultra Silicone Case main view', 1, 1),
(67, 38, 23, '/images/products/accessories/s24-case-white.jpg', 'Galaxy S24 Ultra Silicone Case in White', 2, 0),
(68, 38, 24, '/images/products/accessories/s24-case-green.jpg', 'Galaxy S24 Ultra Silicone Case in Light Green', 3, 0),
(69, 38, 25, '/images/products/accessories/s24-case-violet.jpg', 'Galaxy S24 Ultra Silicone Case in Violet', 4, 0),
(70, 39, 94, '/images/products/galaxy-book4-pro360/main.jpg', 'Samsung Galaxy Book4 Pro 360 in tent mode', 1, 1),
(71, 39, NULL, '/images/products/galaxy-book4-pro360/laptop-mode.jpg', 'Galaxy Book4 Pro 360 in laptop mode', 2, 0),
(72, 39, NULL, '/images/products/galaxy-book4-pro360/tablet-mode.jpg', 'Galaxy Book4 Pro 360 in tablet mode with S Pen', 3, 0),
(73, 40, 97, '/images/products/galaxy-book4-pro/main.jpg', 'Samsung Galaxy Book4 Pro open view', 1, 1),
(74, 40, NULL, '/images/products/galaxy-book4-pro/side-view.jpg', 'Galaxy Book4 Pro ultra-thin profile', 2, 0),
(75, 40, NULL, '/images/products/galaxy-book4-pro/keyboard.jpg', 'Galaxy Book4 Pro backlit keyboard closeup', 3, 0),
(76, 41, 101, '/images/products/galaxy-book4-ultra/main.jpg', 'Samsung Galaxy Book4 Ultra with powerful performance', 1, 1),
(77, 41, NULL, '/images/products/galaxy-book4-ultra/gaming.jpg', 'Galaxy Book4 Ultra gaming setup', 2, 0),
(78, 41, NULL, '/images/products/galaxy-book4-ultra/ports.jpg', 'Galaxy Book4 Ultra connectivity ports', 3, 0),
(79, 42, 103, '/images/products/galaxy-book4/main.jpg', 'Samsung Galaxy Book4 everyday laptop', 1, 1),
(80, 42, NULL, '/images/products/galaxy-book4/display.jpg', 'Galaxy Book4 vibrant display', 2, 0),
(81, 43, 106, '/images/products/galaxy-book3-360/main.jpg', 'Samsung Galaxy Book3 360 convertible laptop', 1, 1),
(82, 43, NULL, '/images/products/galaxy-book3-360/360-mode.jpg', 'Galaxy Book3 360 showing flexibility', 2, 0),
(83, 43, NULL, '/images/products/galaxy-book3-360/spen.jpg', 'Galaxy Book3 360 with S Pen', 3, 0),
(84, 44, 109, '/images/products/galaxy-book2-pro/main.jpg', 'Samsung Galaxy Book2 Pro ultra-light laptop', 1, 1),
(85, 44, NULL, '/images/products/galaxy-book2-pro/oled.jpg', 'Galaxy Book2 Pro AMOLED display', 2, 0),
(86, 45, 112, '/images/products/galaxy-book-go/main.jpg', 'Samsung Galaxy Book Go always-connected laptop', 1, 1),
(87, 45, NULL, '/images/products/galaxy-book-go/5g.jpg', 'Galaxy Book Go 5G connectivity', 2, 0),
(88, 46, NULL, '/images/products/s23-fe/main.jpg', 'Samsung Galaxy S23 FE main view', 1, 1),
(89, 46, NULL, '/images/products/s23-fe/camera.jpg', 'Galaxy S23 FE camera system', 2, 0),
(90, 47, NULL, '/images/products/a54-5g/main.jpg', 'Samsung Galaxy A54 5G main view', 1, 1),
(91, 47, NULL, '/images/products/a54-5g/display.jpg', 'Galaxy A54 5G Super AMOLED display', 2, 0),
(92, 48, NULL, '/images/products/a34-5g/main.jpg', 'Samsung Galaxy A34 5G main view', 1, 1),
(93, 48, NULL, '/images/products/a34-5g/lifestyle.jpg', 'Galaxy A34 5G in use', 2, 0),
(94, 49, NULL, '/images/products/a24/main.jpg', 'Samsung Galaxy A24 main view', 1, 1),
(95, 50, NULL, '/images/products/a14-5g/main.jpg', 'Samsung Galaxy A14 5G main view', 1, 1),
(96, 51, NULL, '/images/products/z-fold5/main.jpg', 'Samsung Galaxy Z Fold5 unfolded', 1, 1),
(97, 51, NULL, '/images/products/z-fold5/folded.jpg', 'Galaxy Z Fold5 folded view', 2, 0),
(98, 51, NULL, '/images/products/z-fold5/flex-mode.jpg', 'Galaxy Z Fold5 in Flex Mode', 3, 0),
(99, 52, NULL, '/images/products/z-flip5/main.jpg', 'Samsung Galaxy Z Flip5 open', 1, 1),
(100, 52, NULL, '/images/products/z-flip5/folded.jpg', 'Galaxy Z Flip5 folded compact', 2, 0),
(101, 52, NULL, '/images/products/z-flip5/cover-screen.jpg', 'Galaxy Z Flip5 large cover screen', 3, 0),
(102, 53, NULL, '/images/products/s22/main.jpg', 'Samsung Galaxy S22 main view', 1, 1),
(103, 53, NULL, '/images/products/s22/camera-detail.jpg', 'Galaxy S22 camera system', 2, 0),
(104, 54, NULL, '/images/products/s21-fe/main.jpg', 'Samsung Galaxy S21 FE main view', 1, 1),
(105, 54, NULL, '/images/products/s21-fe/display.jpg', 'Galaxy S21 FE 120Hz display', 2, 0),
(106, 55, NULL, '/images/products/a05s/main.jpg', 'Samsung Galaxy A05s main view', 1, 1),
(107, 56, NULL, '/images/products/tab-s9-plus/main.jpg', 'Samsung Galaxy Tab S9+ with S Pen', 1, 1),
(108, 56, NULL, '/images/products/tab-s9-plus/dex-mode.jpg', 'Galaxy Tab S9+ DeX Mode', 2, 0),
(109, 57, NULL, '/images/products/tab-s9/main.jpg', 'Samsung Galaxy Tab S9 with S Pen', 1, 1),
(110, 57, NULL, '/images/products/tab-s9/side-view.jpg', 'Galaxy Tab S9 ultra-slim profile', 2, 0),
(111, 58, NULL, '/images/products/tab-s9-fe-plus/main.jpg', 'Samsung Galaxy Tab S9 FE+ main view', 1, 1),
(112, 58, NULL, '/images/products/tab-s9-fe-plus/spen.jpg', 'Galaxy Tab S9 FE+ with included S Pen', 2, 0),
(113, 59, NULL, '/images/products/tab-s9-fe/main.jpg', 'Samsung Galaxy Tab S9 FE main view', 1, 1),
(114, 59, NULL, '/images/products/tab-s9-fe/display.jpg', 'Galaxy Tab S9 FE vibrant display', 2, 0),
(115, 60, NULL, '/images/products/tab-a9-plus/main.jpg', 'Samsung Galaxy Tab A9+ main view', 1, 1),
(116, 60, NULL, '/images/products/tab-a9-plus/entertainment.jpg', 'Galaxy Tab A9+ entertainment mode', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `variant_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `variant_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attributes` json DEFAULT NULL,
  `additional_price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `stock_quantity` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`variant_id`, `product_id`, `variant_name`, `sku`, `attributes`, `additional_price`, `stock_quantity`) VALUES
(1, 1, 'Titanium Gray 256GB', 'SM-S928UZAAXAA-TG-256', '{\"color\": \"Titanium Gray\", \"storage\": \"256GB\"}', 0.00, 20),
(2, 1, 'Titanium Black 512GB', 'SM-S928UZAAXAA-TB-512', '{\"color\": \"Titanium Black\", \"storage\": \"512GB\"}', 120.00, 15),
(3, 1, 'Titanium Violet 1TB', 'SM-S928UZAAXAA-TV-1TB', '{\"color\": \"Titanium Violet\", \"storage\": \"1TB\"}', 360.00, 10),
(4, 1, 'Titanium Yellow 256GB', 'SM-S928UZAAXAA-TY-256', '{\"color\": \"Titanium Yellow\", \"storage\": \"256GB\"}', 0.00, 18),
(5, 2, 'Onyx Black 256GB', 'SM-S926UZAAXAA-OB-256', '{\"color\": \"Onyx Black\", \"storage\": \"256GB\"}', 0.00, 30),
(6, 2, 'Marble Gray 512GB', 'SM-S926UZAAXAA-MG-512', '{\"color\": \"Marble Gray\", \"storage\": \"512GB\"}', 120.00, 25),
(7, 2, 'Cobalt Violet 256GB', 'SM-S926UZAAXAA-CV-256', '{\"color\": \"Cobalt Violet\", \"storage\": \"256GB\"}', 0.00, 28),
(8, 3, 'Graphite 256GB Wi-Fi', 'SM-X910UZAAXAA-GR-256', '{\"color\": \"Graphite\", \"storage\": \"256GB\", \"connectivity\": \"Wi-Fi\"}', 0.00, 15),
(9, 3, 'Beige 512GB Wi-Fi', 'SM-X910UZAAXAA-BE-512', '{\"color\": \"Beige\", \"storage\": \"512GB\", \"connectivity\": \"Wi-Fi\"}', 120.00, 10),
(10, 3, 'Graphite 1TB 5G', 'SM-X910UZAAXAA-GR-1TB-5G', '{\"color\": \"Graphite\", \"storage\": \"1TB\", \"connectivity\": \"5G\"}', 380.00, 5),
(11, 10, 'T7 Shield 2TB Black', 'MU-PE2T0S-AM-BLK', '{\"color\": \"Black\", \"capacity\": \"2TB\"}', 0.00, 80),
(12, 10, 'T7 Shield 2TB Blue', 'MU-PE2T0S-AM-BLU', '{\"color\": \"Blue\", \"capacity\": \"2TB\"}', 0.00, 70),
(13, 10, 'T7 Shield 2TB Beige', 'MU-PE2T0S-AM-BEI', '{\"color\": \"Beige\", \"capacity\": \"2TB\"}', 0.00, 60),
(14, 14, '65\" Neo QLED 4K QN90C', 'QN65QN90CAFXZA', '{\"size\": \"65-inch\"}', -500.00, 15),
(15, 14, '55\" Neo QLED 4K QN90C', 'QN55QN90CAFXZA', '{\"size\": \"55-inch\"}', -1000.00, 20),
(16, 14, '85\" Neo QLED 4K QN90C', 'QN85QN90CAFXZA', '{\"size\": \"85-inch\"}', 800.00, 8),
(17, 21, 'The Frame 65\" with Teak Bezel', 'QN65LS03BAFXZA-TEAK', '{\"bezel_color\": \"Teak\"}', 50.00, 30),
(18, 21, 'The Frame 65\" with White Bezel', 'QN65LS03BAFXZA-WHT', '{\"bezel_color\": \"White\"}', 50.00, 40),
(19, 21, 'The Frame 65\" with Brown Bezel', 'QN65LS03BAFXZA-BRN', '{\"bezel_color\": \"Brown\"}', 50.00, 25),
(20, 31, 'JBL Flip 6 Blue', 'JBLFLIP6BLUAM', '{\"color\": \"Blue\"}', 0.00, 50),
(21, 31, 'JBL Flip 6 Red', 'JBLFLIP6REDAM', '{\"color\": \"Red\"}', 0.00, 45),
(22, 31, 'JBL Flip 6 Teal', 'JBLFLIP6TELAM', '{\"color\": \"Teal\"}', 0.00, 60),
(23, 38, 'S24 Ultra Silicone Case - White', 'EF-PS928TWEGUS', '{\"color\": \"White\"}', 0.00, 100),
(24, 38, 'S24 Ultra Silicone Case - Light Green', 'EF-PS928TGEGUS', '{\"color\": \"Light Green\"}', 0.00, 120),
(25, 38, 'S24 Ultra Silicone Case - Violet', 'EF-PS928TVEGUS', '{\"color\": \"Violet\"}', 0.00, 90),
(26, 1, 'Galaxy S24 Ultra Titanium Gray 256GB 12GB RAM', 'SM-S928UZAAXAA-TG-256-12', '{\"ram\": \"12GB\", \"color\": \"Titanium Gray\", \"storage\": \"256GB\"}', 0.00, 20),
(27, 1, 'Galaxy S24 Ultra Titanium Black 512GB 12GB RAM', 'SM-S928UZAAXAA-TB-512-12', '{\"ram\": \"12GB\", \"color\": \"Titanium Black\", \"storage\": \"512GB\"}', 120.00, 15),
(28, 1, 'Galaxy S24 Ultra Titanium Violet 1TB 12GB RAM', 'SM-S928UZAAXAA-TV-1TB-12', '{\"ram\": \"12GB\", \"color\": \"Titanium Violet\", \"storage\": \"1TB\"}', 360.00, 10),
(29, 1, 'Galaxy S24 Ultra Titanium Yellow 256GB 12GB RAM', 'SM-S928UZAAXAA-TY-256-12', '{\"ram\": \"12GB\", \"color\": \"Titanium Yellow\", \"storage\": \"256GB\"}', 0.00, 18),
(30, 2, 'Galaxy S24+ Onyx Black 256GB 12GB RAM', 'SM-S926UZAAXAA-OB-256-12', '{\"ram\": \"12GB\", \"color\": \"Onyx Black\", \"storage\": \"256GB\"}', 0.00, 30),
(31, 2, 'Galaxy S24+ Marble Gray 512GB 12GB RAM', 'SM-S926UZAAXAA-MG-512-12', '{\"ram\": \"12GB\", \"color\": \"Marble Gray\", \"storage\": \"512GB\"}', 120.00, 25),
(32, 2, 'Galaxy S24+ Cobalt Violet 256GB 12GB RAM', 'SM-S926UZAAXAA-CV-256-12', '{\"ram\": \"12GB\", \"color\": \"Cobalt Violet\", \"storage\": \"256GB\"}', 0.00, 28),
(33, 3, 'Galaxy Tab S9 Ultra Graphite 256GB 12GB RAM Wi-Fi', 'SM-X910UZAAXAA-GR-256-12', '{\"ram\": \"12GB\", \"color\": \"Graphite\", \"storage\": \"256GB\", \"connectivity\": \"Wi-Fi\"}', 0.00, 15),
(34, 3, 'Galaxy Tab S9 Ultra Beige 512GB 12GB RAM Wi-Fi', 'SM-X910UZAAXAA-BE-512-12', '{\"ram\": \"12GB\", \"color\": \"Beige\", \"storage\": \"512GB\", \"connectivity\": \"Wi-Fi\"}', 120.00, 10),
(35, 3, 'Galaxy Tab S9 Ultra Graphite 1TB 12GB RAM 5G', 'SM-X910UZAAXAA-GR-1TB-12-5G', '{\"ram\": \"12GB\", \"color\": \"Graphite\", \"storage\": \"1TB\", \"connectivity\": \"5G\"}', 380.00, 5),
(36, 4, 'Galaxy Tab A8 Gray 32GB 3GB RAM', 'SM-X200UZAAXAA-GR-32-3', '{\"ram\": \"3GB\", \"color\": \"Gray\", \"storage\": \"32GB\"}', 0.00, 80),
(37, 4, 'Galaxy Tab A8 Silver 64GB 4GB RAM', 'SM-X200UZAAXAA-SI-64-4', '{\"ram\": \"4GB\", \"color\": \"Silver\", \"storage\": \"64GB\"}', 30.00, 70),
(38, 5, 'Galaxy Book3 Ultra Graphite 1TB 32GB RAM', 'NP960XFG-KA2US-GR-1TB-32', '{\"ram\": \"32GB\", \"color\": \"Graphite\", \"storage\": \"1TB SSD\"}', 0.00, 10),
(39, 5, 'Galaxy Book3 Ultra Graphite 512GB 16GB RAM', 'NP960XFG-KA2US-GR-512-16', '{\"ram\": \"16GB\", \"color\": \"Graphite\", \"storage\": \"512GB SSD\"}', -400.00, 15),
(40, 6, 'Galaxy Book3 Pro 360 Beige 1TB 16GB RAM', 'NP960QFG-KA1US-BE-1TB-16', '{\"ram\": \"16GB\", \"color\": \"Beige\", \"storage\": \"1TB SSD\"}', 0.00, 15),
(41, 6, 'Galaxy Book3 Pro 360 Graphite 1TB 16GB RAM', 'NP960QFG-KA1US-GR-1TB-16', '{\"ram\": \"16GB\", \"color\": \"Graphite\", \"storage\": \"1TB SSD\"}', 0.00, 10),
(42, 7, 'Re-Newed S23 Ultra Phantom Black 256GB 12GB RAM', 'CR-SM-S918U1-BK-256-12', '{\"ram\": \"12GB\", \"color\": \"Phantom Black\", \"storage\": \"256GB\"}', 0.00, 40),
(43, 7, 'Re-Newed S23 Ultra Cream 512GB 12GB RAM', 'CR-SM-S918U1-CR-512-12', '{\"ram\": \"12GB\", \"color\": \"Cream\", \"storage\": \"512GB\"}', 100.00, 40),
(44, 8, 'Re-Newed Z Fold4 Phantom Black 256GB 12GB RAM', 'CR-SM-F936U1-BK-256-12', '{\"ram\": \"12GB\", \"color\": \"Phantom Black\", \"storage\": \"256GB\"}', 0.00, 30),
(45, 8, 'Re-Newed Z Fold4 Beige 512GB 12GB RAM', 'CR-SM-F936U1-BE-512-12', '{\"ram\": \"12GB\", \"color\": \"Beige\", \"storage\": \"512GB\"}', 150.00, 20),
(46, 9, 'Odyssey G9 49-inch', 'LC49G95TSSNXZA-49', '{\"color\": \"Black\", \"screen_size\": \"49-inch\"}', 0.00, 18),
(47, 10, 'T7 Shield 2TB Black', 'MU-PE2T0S-AM-BLK-2TB', '{\"color\": \"Black\", \"capacity\": \"2TB\"}', 0.00, 80),
(48, 10, 'T7 Shield 2TB Blue', 'MU-PE2T0S-AM-BLU-2TB', '{\"color\": \"Blue\", \"capacity\": \"2TB\"}', 0.00, 70),
(49, 10, 'T7 Shield 2TB Beige', 'MU-PE2T0S-AM-BEI-2TB', '{\"color\": \"Beige\", \"capacity\": \"2TB\"}', 0.00, 60),
(50, 11, 'MICRO LED 110-inch', 'MNA110MS1ACXZA-110', '{\"screen_size\": \"110-inch\"}', 0.00, 5),
(51, 12, 'MICRO LED 98-inch', 'MNA98MS1ACXZA-98', '{\"screen_size\": \"98-inch\"}', 0.00, 8),
(52, 13, 'Neo QLED 8K QN900C 85-inch', 'QN85QN900CFXZA-85', '{\"screen_size\": \"85-inch\"}', 0.00, 10),
(53, 13, 'Neo QLED 8K QN900C 75-inch', 'QN75QN900CFXZA-75', '{\"screen_size\": \"75-inch\"}', -1000.00, 12),
(54, 14, 'Neo QLED 4K QN90C 75-inch', 'QN75QN90CAFXZA-75', '{\"screen_size\": \"75-inch\"}', 0.00, 20),
(55, 14, 'Neo QLED 4K QN90C 65-inch', 'QN65QN90CAFXZA-65', '{\"screen_size\": \"65-inch\"}', -500.00, 15),
(56, 14, 'Neo QLED 4K QN90C 55-inch', 'QN55QN90CAFXZA-55', '{\"screen_size\": \"55-inch\"}', -1000.00, 20),
(57, 14, 'Neo QLED 4K QN90C 85-inch', 'QN85QN90CAFXZA-85', '{\"screen_size\": \"85-inch\"}', 800.00, 8),
(58, 15, 'OLED S95C 77-inch', 'QN77S95CAFXZA-77', '{\"screen_size\": \"77-inch\"}', 0.00, 15),
(59, 15, 'OLED S95C 65-inch', 'QN65S95CAFXZA-65', '{\"screen_size\": \"65-inch\"}', -800.00, 20),
(60, 16, 'OLED S90C 55-inch', 'QN55S90CAFXZA-55', '{\"screen_size\": \"55-inch\"}', 0.00, 30),
(61, 17, 'QLED 4K Q80C 85-inch', 'QN85Q80CAFXZA-85', '{\"screen_size\": \"85-inch\"}', 0.00, 15),
(62, 17, 'QLED 4K Q80C 75-inch', 'QN75Q80CAFXZA-75', '{\"screen_size\": \"75-inch\"}', -300.00, 18),
(63, 18, 'QLED 4K Q70C 65-inch', 'QN65Q70CAFXZA-65', '{\"screen_size\": \"65-inch\"}', 0.00, 40),
(64, 18, 'QLED 4K Q70C 55-inch', 'QN55Q70CAFXZA-55', '{\"screen_size\": \"55-inch\"}', -200.00, 50),
(65, 19, 'Crystal UHD DU8000 85-inch', 'UN85DU8000FXZA-85', '{\"screen_size\": \"85-inch\"}', 0.00, 35),
(66, 19, 'Crystal UHD DU8000 75-inch', 'UN75DU8000FXZA-75', '{\"screen_size\": \"75-inch\"}', -300.00, 40),
(67, 20, 'Crystal UHD DU7200 55-inch', 'UN55DU7200FXZA-55', '{\"screen_size\": \"55-inch\"}', 0.00, 100),
(68, 20, 'Crystal UHD DU7200 50-inch', 'UN50DU7200FXZA-50', '{\"screen_size\": \"50-inch\"}', -50.00, 120),
(69, 21, 'The Frame 65-inch Teak Bezel', 'QN65LS03BAFXZA-65-TEAK', '{\"bezel_color\": \"Teak\", \"screen_size\": \"65-inch\"}', 0.00, 30),
(70, 21, 'The Frame 65-inch White Bezel', 'QN65LS03BAFXZA-65-WHT', '{\"bezel_color\": \"White\", \"screen_size\": \"65-inch\"}', 0.00, 40),
(71, 21, 'The Frame 65-inch Brown Bezel', 'QN65LS03BAFXZA-65-BRN', '{\"bezel_color\": \"Brown\", \"screen_size\": \"65-inch\"}', 0.00, 25),
(72, 22, 'The Frame 50-inch Teak Bezel', 'QN50LS03BAFXZA-50-TEAK', '{\"bezel_color\": \"Teak\", \"screen_size\": \"50-inch\"}', 0.00, 30),
(73, 23, 'The Serif 55-inch White', 'QN55LS01BAFXZA-55-WHT', '{\"color\": \"White\", \"screen_size\": \"55-inch\"}', 0.00, 15),
(74, 24, 'The Serif 43-inch White', 'QN43LS01BAFXZA-43-WHT', '{\"color\": \"White\", \"screen_size\": \"43-inch\"}', 0.00, 25),
(75, 25, 'The Terrace 65-inch Full Sun', 'QN65LST9TAFXZA-65', '{\"type\": \"Full Sun\", \"screen_size\": \"65-inch\"}', 0.00, 5),
(76, 26, 'The Terrace 55-inch Partial Sun', 'QN55LST7TAFXZA-55', '{\"type\": \"Partial Sun\", \"screen_size\": \"55-inch\"}', 0.00, 10),
(77, 27, 'The Sero 43-inch', 'QN43LS05BAFXZA-43', '{\"screen_size\": \"43-inch\"}', 0.00, 20),
(78, 28, 'The Sero Wheel', 'VG-SCST43V/ZA-STD', '{\"color\": \"Navy Blue\"}', 0.00, 50),
(79, 29, 'HW-Q990C Soundbar Black', 'HW-Q990CZAAXAA-BLK', '{\"color\": \"Black\"}', 0.00, 25),
(80, 30, 'HW-S800B Soundbar Black', 'HW-S800B/ZA-BLK', '{\"color\": \"Black\"}', 0.00, 60),
(81, 31, 'JBL Flip 6 Black', 'JBLFLIP6BLKAM-BLK', '{\"color\": \"Black\"}', 0.00, 50),
(82, 31, 'JBL Flip 6 Blue', 'JBLFLIP6BLUAM-BLU', '{\"color\": \"Blue\"}', 0.00, 50),
(83, 31, 'JBL Flip 6 Red', 'JBLFLIP6REDAM-RED', '{\"color\": \"Red\"}', 0.00, 45),
(84, 31, 'JBL Flip 6 Teal', 'JBLFLIP6TELAM-TEL', '{\"color\": \"Teal\"}', 0.00, 60),
(85, 32, 'JBL Tune 760NC Black', 'JBLT760NCBLK-BLK', '{\"color\": \"Black\"}', 0.00, 80),
(86, 32, 'JBL Tune 760NC White', 'JBLT760NCWHT-WHT', '{\"color\": \"White\"}', 0.00, 70),
(87, 33, 'The Freestyle 2nd Gen White', 'SP-LFF3CLAXXXA-WHT', '{\"color\": \"White\"}', 0.00, 50),
(88, 34, 'The Premiere 4K White', 'SP-LSP9TFAXZA-WHT', '{\"color\": \"White\"}', 0.00, 10),
(89, 35, 'Auto-Rotating Wall Mount Black', 'VG-ARAB22WMT-BLK', '{\"color\": \"Black\"}', 0.00, 100),
(90, 36, 'Slim Fit Wall Mount Black', 'WMN-B50EB/ZA-BLK', '{\"color\": \"Black\"}', 0.00, 200),
(91, 37, 'Wireless Charger Trio Black', 'EP-P6300TBEGUS-BLK', '{\"color\": \"Black\"}', 0.00, 150),
(92, 37, 'Wireless Charger Trio White', 'EP-P6300TWEGUS-WHT', '{\"color\": \"White\"}', 0.00, 150),
(93, 38, 'S24 Ultra Silicone Case Black', 'EF-PS928TBEGUS-BLK', '{\"color\": \"Black\"}', 0.00, 150),
(94, 39, 'Galaxy Book4 Pro 360 16\" Intel Core Ultra 7 16GB 512GB', 'NP960QGK-KG1US-16-U7-16-512', '{\"ram\": \"16GB\", \"color\": \"Moonstone Gray\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core Ultra 7\", \"screen_size\": \"16-inch\"}', 0.00, 15),
(95, 39, 'Galaxy Book4 Pro 360 16\" Intel Core Ultra 7 16GB 1TB', 'NP960QGK-KG1US-16-U7-16-1TB', '{\"ram\": \"16GB\", \"color\": \"Moonstone Gray\", \"storage\": \"1TB SSD\", \"processor\": \"Intel Core Ultra 7\", \"screen_size\": \"16-inch\"}', 200.00, 12),
(96, 39, 'Galaxy Book4 Pro 360 14\" Intel Core Ultra 5 16GB 512GB', 'NP940QGK-KG1US-14-U5-16-512', '{\"ram\": \"16GB\", \"color\": \"Moonstone Gray\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core Ultra 5\", \"screen_size\": \"14-inch\"}', -200.00, 18),
(97, 40, 'Galaxy Book4 Pro 16\" Intel Core Ultra 7 16GB 512GB', 'NP960XGK-KG1US-16-U7-16-512', '{\"ram\": \"16GB\", \"color\": \"Moonstone Gray\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core Ultra 7\", \"screen_size\": \"16-inch\"}', 0.00, 20),
(98, 40, 'Galaxy Book4 Pro 16\" Intel Core Ultra 7 16GB 1TB', 'NP960XGK-KG1US-16-U7-16-1TB', '{\"ram\": \"16GB\", \"color\": \"Moonstone Gray\", \"storage\": \"1TB SSD\", \"processor\": \"Intel Core Ultra 7\", \"screen_size\": \"16-inch\"}', 200.00, 15),
(99, 40, 'Galaxy Book4 Pro 14\" Intel Core Ultra 5 16GB 512GB', 'NP940XGK-KG1US-14-U5-16-512', '{\"ram\": \"16GB\", \"color\": \"Moonstone Gray\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core Ultra 5\", \"screen_size\": \"14-inch\"}', -200.00, 25),
(100, 40, 'Galaxy Book4 Pro 14\" Intel Core Ultra 5 16GB 512GB Silver', 'NP940XGK-KS1US-14-U5-16-512', '{\"ram\": \"16GB\", \"color\": \"Silver\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core Ultra 5\", \"screen_size\": \"14-inch\"}', -200.00, 20),
(101, 41, 'Galaxy Book4 Ultra 16\" Intel Core Ultra 9 32GB 1TB RTX 4070', 'NP960XGL-XG2US-16-U9-32-1TB', '{\"ram\": \"32GB\", \"color\": \"Moonstone Gray\", \"storage\": \"1TB SSD\", \"graphics\": \"NVIDIA RTX 4070\", \"processor\": \"Intel Core Ultra 9\", \"screen_size\": \"16-inch\"}', 0.00, 10),
(102, 41, 'Galaxy Book4 Ultra 16\" Intel Core Ultra 9 16GB 1TB RTX 4050', 'NP960XGL-XG1US-16-U9-16-1TB', '{\"ram\": \"16GB\", \"color\": \"Moonstone Gray\", \"storage\": \"1TB SSD\", \"graphics\": \"NVIDIA RTX 4050\", \"processor\": \"Intel Core Ultra 9\", \"screen_size\": \"16-inch\"}', -500.00, 12),
(103, 42, 'Galaxy Book4 15.6\" Intel Core 7 16GB 512GB', 'NP750XGK-KG1US-15-C7-16-512', '{\"ram\": \"16GB\", \"color\": \"Gray\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core 7\", \"screen_size\": \"15.6-inch\"}', 0.00, 30),
(104, 42, 'Galaxy Book4 15.6\" Intel Core 5 8GB 256GB', 'NP750XGK-KG2US-15-C5-8-256', '{\"ram\": \"8GB\", \"color\": \"Gray\", \"storage\": \"256GB SSD\", \"processor\": \"Intel Core 5\", \"screen_size\": \"15.6-inch\"}', -100.00, 35),
(105, 42, 'Galaxy Book4 14\" Intel Core 5 16GB 512GB', 'NP740XGK-KG1US-14-C5-16-512', '{\"ram\": \"16GB\", \"color\": \"Gray\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core 5\", \"screen_size\": \"14-inch\"}', 50.00, 28),
(106, 43, 'Galaxy Book3 360 13.3\" Intel Core i7 16GB 512GB', 'NP730QFG-KA1US-13-i7-16-512', '{\"ram\": \"16GB\", \"color\": \"Graphite\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core i7-1360P\", \"screen_size\": \"13.3-inch\"}', 0.00, 20),
(107, 43, 'Galaxy Book3 360 13.3\" Intel Core i7 16GB 512GB Beige', 'NP730QFG-KB1US-13-i7-16-512', '{\"ram\": \"16GB\", \"color\": \"Beige\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core i7-1360P\", \"screen_size\": \"13.3-inch\"}', 0.00, 22),
(108, 43, 'Galaxy Book3 360 13.3\" Intel Core i5 8GB 256GB', 'NP730QFG-KA2US-13-i5-8-256', '{\"ram\": \"8GB\", \"color\": \"Graphite\", \"storage\": \"256GB SSD\", \"processor\": \"Intel Core i5-1340P\", \"screen_size\": \"13.3-inch\"}', -200.00, 18),
(109, 44, 'Galaxy Book2 Pro 13.3\" Intel Core i7 16GB 512GB', 'NP930XED-KA1US-13-i7-16-512', '{\"ram\": \"16GB\", \"color\": \"Graphite\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core i7-1260P\", \"screen_size\": \"13.3-inch\"}', 0.00, 15),
(110, 44, 'Galaxy Book2 Pro 13.3\" Intel Core i5 8GB 256GB', 'NP930XED-KA2US-13-i5-8-256', '{\"ram\": \"8GB\", \"color\": \"Silver\", \"storage\": \"256GB SSD\", \"processor\": \"Intel Core i5-1240P\", \"screen_size\": \"13.3-inch\"}', -200.00, 18),
(111, 44, 'Galaxy Book2 Pro 15.6\" Intel Core i7 16GB 512GB', 'NP950XED-KA1US-15-i7-16-512', '{\"ram\": \"16GB\", \"color\": \"Graphite\", \"storage\": \"512GB SSD\", \"processor\": \"Intel Core i7-1260P\", \"screen_size\": \"15.6-inch\"}', 100.00, 12),
(112, 45, 'Galaxy Book Go 14\" Snapdragon 7c+ 4GB 128GB 5G', 'NP340XLA-KA1US-14-SD7-4-128', '{\"ram\": \"4GB\", \"color\": \"Silver\", \"storage\": \"128GB eUFS\", \"processor\": \"Snapdragon 7c+ Gen 3\", \"screen_size\": \"14-inch\", \"connectivity\": \"5G\"}', 0.00, 25),
(113, 45, 'Galaxy Book Go 14\" Snapdragon 7c+ 8GB 128GB Wi-Fi', 'NP340XLA-KA2US-14-SD7-8-128', '{\"ram\": \"8GB\", \"color\": \"Silver\", \"storage\": \"128GB eUFS\", \"processor\": \"Snapdragon 7c+ Gen 3\", \"screen_size\": \"14-inch\", \"connectivity\": \"Wi-Fi\"}', -50.00, 30),
(114, 45, 'Galaxy Book Go 14\" Snapdragon 7c+ 8GB 256GB 5G', 'NP340XLA-KA3US-14-SD7-8-256', '{\"ram\": \"8GB\", \"color\": \"Silver\", \"storage\": \"256GB eUFS\", \"processor\": \"Snapdragon 7c+ Gen 3\", \"screen_size\": \"14-inch\", \"connectivity\": \"5G\"}', 100.00, 20),
(115, 56, 'Galaxy Tab S9+ Graphite 256GB 12GB RAM Wi-Fi', 'SM-X810UZAAXAA-GRP-256-12-WIFI', '{\"ram\": \"12GB\", \"color\": \"Graphite\", \"storage\": \"256GB\", \"connectivity\": \"Wi-Fi\"}', 0.00, 25),
(116, 56, 'Galaxy Tab S9+ Beige 512GB 12GB RAM Wi-Fi', 'SM-X810UZCAXAA-BEG-512-12-WIFI', '{\"ram\": \"12GB\", \"color\": \"Beige\", \"storage\": \"512GB\", \"connectivity\": \"Wi-Fi\"}', 120.00, 20),
(117, 56, 'Galaxy Tab S9+ Graphite 256GB 12GB RAM 5G', 'SM-X816UZAAXAA-GRP-256-12-5G', '{\"ram\": \"12GB\", \"color\": \"Graphite\", \"storage\": \"256GB\", \"connectivity\": \"5G\"}', 150.00, 15),
(118, 57, 'Galaxy Tab S9 Graphite 128GB 8GB RAM Wi-Fi', 'SM-X710UZAAXAA-GRP-128-8-WIFI', '{\"ram\": \"8GB\", \"color\": \"Graphite\", \"storage\": \"128GB\", \"connectivity\": \"Wi-Fi\"}', 0.00, 30),
(119, 57, 'Galaxy Tab S9 Beige 256GB 12GB RAM Wi-Fi', 'SM-X710UZCAXAA-BEG-256-12-WIFI', '{\"ram\": \"12GB\", \"color\": \"Beige\", \"storage\": \"256GB\", \"connectivity\": \"Wi-Fi\"}', 100.00, 25),
(120, 57, 'Galaxy Tab S9 Graphite 256GB 12GB RAM 5G', 'SM-X716UZAAXAA-GRP-256-12-5G', '{\"ram\": \"12GB\", \"color\": \"Graphite\", \"storage\": \"256GB\", \"connectivity\": \"5G\"}', 150.00, 18),
(121, 58, 'Galaxy Tab S9 FE+ Mint 128GB 8GB RAM Wi-Fi', 'SM-X610UZGAXAA-MNT-128-8-WIFI', '{\"ram\": \"8GB\", \"color\": \"Mint\", \"storage\": \"128GB\", \"connectivity\": \"Wi-Fi\"}', 0.00, 35),
(122, 58, 'Galaxy Tab S9 FE+ Silver 256GB 12GB RAM Wi-Fi', 'SM-X610UZSAXAA-SLV-256-12-WIFI', '{\"ram\": \"12GB\", \"color\": \"Silver\", \"storage\": \"256GB\", \"connectivity\": \"Wi-Fi\"}', 80.00, 30),
(123, 58, 'Galaxy Tab S9 FE+ Gray 128GB 8GB RAM 5G', 'SM-X616UZAAXAA-GRY-128-8-5G', '{\"ram\": \"8GB\", \"color\": \"Gray\", \"storage\": \"128GB\", \"connectivity\": \"5G\"}', 100.00, 25),
(124, 59, 'Galaxy Tab S9 FE Mint 128GB 6GB RAM Wi-Fi', 'SM-X510UZGAXAA-MNT-128-6-WIFI', '{\"ram\": \"6GB\", \"color\": \"Mint\", \"storage\": \"128GB\", \"connectivity\": \"Wi-Fi\"}', 0.00, 40),
(125, 59, 'Galaxy Tab S9 FE Silver 256GB 8GB RAM Wi-Fi', 'SM-X510UZSAXAA-SLV-256-8-WIFI', '{\"ram\": \"8GB\", \"color\": \"Silver\", \"storage\": \"256GB\", \"connectivity\": \"Wi-Fi\"}', 70.00, 35),
(126, 59, 'Galaxy Tab S9 FE Gray 128GB 6GB RAM 5G', 'SM-X516UZAAXAA-GRY-128-6-5G', '{\"ram\": \"6GB\", \"color\": \"Gray\", \"storage\": \"128GB\", \"connectivity\": \"5G\"}', 100.00, 28),
(127, 59, 'Galaxy Tab S9 FE Lavender 128GB 6GB RAM Wi-Fi', 'SM-X510ULVAXAA-LAV-128-6-WIFI', '{\"ram\": \"6GB\", \"color\": \"Lavender\", \"storage\": \"128GB\", \"connectivity\": \"Wi-Fi\"}', 0.00, 38),
(128, 60, 'Galaxy Tab A9+ Graphite 64GB 4GB RAM Wi-Fi', 'SM-X210UZAAXAA-GRP-64-4-WIFI', '{\"ram\": \"4GB\", \"color\": \"Graphite\", \"storage\": \"64GB\", \"connectivity\": \"Wi-Fi\"}', 0.00, 50),
(129, 60, 'Galaxy Tab A9+ Silver 128GB 8GB RAM Wi-Fi', 'SM-X210UZSAXAA-SLV-128-8-WIFI', '{\"ram\": \"8GB\", \"color\": \"Silver\", \"storage\": \"128GB\", \"connectivity\": \"Wi-Fi\"}', 50.00, 45),
(130, 60, 'Galaxy Tab A9+ Navy 64GB 4GB RAM Wi-Fi', 'SM-X210UDBAXAA-NVY-64-4-WIFI', '{\"ram\": \"4GB\", \"color\": \"Navy\", \"storage\": \"64GB\", \"connectivity\": \"Wi-Fi\"}', 0.00, 48),
(131, 46, 'Galaxy S23 FE Mint 128GB 8GB RAM', 'SM-S711UZGAXAA-MNT-128-8', '{\"ram\": \"8GB\", \"color\": \"Mint\", \"storage\": \"128GB\"}', 0.00, 30),
(132, 46, 'Galaxy S23 FE Cream 256GB 8GB RAM', 'SM-S711UZCAXAA-CRM-256-8', '{\"ram\": \"8GB\", \"color\": \"Cream\", \"storage\": \"256GB\"}', 60.00, 25),
(133, 46, 'Galaxy S23 FE Graphite 128GB 8GB RAM', 'SM-S711UZKAXAA-GRP-128-8', '{\"ram\": \"8GB\", \"color\": \"Graphite\", \"storage\": \"128GB\"}', 0.00, 35),
(134, 46, 'Galaxy S23 FE Purple 256GB 8GB RAM', 'SM-S711ULVAXAA-PRP-256-8', '{\"ram\": \"8GB\", \"color\": \"Purple\", \"storage\": \"256GB\"}', 60.00, 28),
(135, 47, 'Galaxy A54 5G Awesome Violet 128GB 8GB RAM', 'SM-A546ULVAXAA-VIO-128-8', '{\"ram\": \"8GB\", \"color\": \"Awesome Violet\", \"storage\": \"128GB\"}', 0.00, 40),
(136, 47, 'Galaxy A54 5G Awesome Lime 256GB 8GB RAM', 'SM-A546UZGAXAA-LIM-256-8', '{\"ram\": \"8GB\", \"color\": \"Awesome Lime\", \"storage\": \"256GB\"}', 50.00, 35),
(137, 47, 'Galaxy A54 5G Awesome Graphite 128GB 8GB RAM', 'SM-A546UZKAXAA-GRP-128-8', '{\"ram\": \"8GB\", \"color\": \"Awesome Graphite\", \"storage\": \"128GB\"}', 0.00, 45),
(138, 47, 'Galaxy A54 5G Awesome White 256GB 8GB RAM', 'SM-A546UZWAXAA-WHT-256-8', '{\"ram\": \"8GB\", \"color\": \"Awesome White\", \"storage\": \"256GB\"}', 50.00, 38),
(139, 48, 'Galaxy A34 5G Awesome Violet 128GB 6GB RAM', 'SM-A346ULVAXAA-VIO-128-6', '{\"ram\": \"6GB\", \"color\": \"Awesome Violet\", \"storage\": \"128GB\"}', 0.00, 35),
(140, 48, 'Galaxy A34 5G Awesome Lime 128GB 8GB RAM', 'SM-A346UZGAXAA-LIM-128-8', '{\"ram\": \"8GB\", \"color\": \"Awesome Lime\", \"storage\": \"128GB\"}', 50.00, 30),
(141, 48, 'Galaxy A34 5G Awesome Graphite 256GB 8GB RAM', 'SM-A346UZKAXAA-GRP-256-8', '{\"ram\": \"8GB\", \"color\": \"Awesome Graphite\", \"storage\": \"256GB\"}', 80.00, 28),
(142, 48, 'Galaxy A34 5G Awesome Silver 128GB 6GB RAM', 'SM-A346UZSAXAA-SLV-128-6', '{\"ram\": \"6GB\", \"color\": \"Awesome Silver\", \"storage\": \"128GB\"}', 0.00, 32),
(143, 49, 'Galaxy A24 Black 128GB 6GB RAM', 'SM-A245UZKAXAA-BLK-128-6', '{\"ram\": \"6GB\", \"color\": \"Black\", \"storage\": \"128GB\"}', 0.00, 50),
(144, 49, 'Galaxy A24 Silver 128GB 6GB RAM', 'SM-A245UZSAXAA-SLV-128-6', '{\"ram\": \"6GB\", \"color\": \"Silver\", \"storage\": \"128GB\"}', 0.00, 45),
(145, 49, 'Galaxy A24 Lime 128GB 8GB RAM', 'SM-A245UZGAXAA-LIM-128-8', '{\"ram\": \"8GB\", \"color\": \"Lime\", \"storage\": \"128GB\"}', 30.00, 40),
(146, 50, 'Galaxy A14 5G Black 64GB 4GB RAM', 'SM-A146UZKAXAA-BLK-64-4', '{\"ram\": \"4GB\", \"color\": \"Black\", \"storage\": \"64GB\"}', 0.00, 60),
(147, 50, 'Galaxy A14 5G Silver 64GB 4GB RAM', 'SM-A146UZSAXAA-SLV-64-4', '{\"ram\": \"4GB\", \"color\": \"Silver\", \"storage\": \"64GB\"}', 0.00, 55),
(148, 50, 'Galaxy A14 5G Dark Red 128GB 6GB RAM', 'SM-A146UZRAXAA-RED-128-6', '{\"ram\": \"6GB\", \"color\": \"Dark Red\", \"storage\": \"128GB\"}', 30.00, 50),
(149, 51, 'Galaxy Z Fold5 Phantom Black 256GB 12GB RAM', 'SM-F946UZKAXAA-BLK-256-12', '{\"ram\": \"12GB\", \"color\": \"Phantom Black\", \"storage\": \"256GB\"}', 0.00, 15),
(150, 51, 'Galaxy Z Fold5 Cream 512GB 12GB RAM', 'SM-F946UZCAXAA-CRM-512-12', '{\"ram\": \"12GB\", \"color\": \"Cream\", \"storage\": \"512GB\"}', 180.00, 12),
(151, 51, 'Galaxy Z Fold5 Icy Blue 1TB 12GB RAM', 'SM-F946UZBAXAA-BLU-1TB-12', '{\"ram\": \"12GB\", \"color\": \"Icy Blue\", \"storage\": \"1TB\"}', 380.00, 8),
(152, 52, 'Galaxy Z Flip5 Mint 256GB 8GB RAM', 'SM-F731UZGAXAA-MNT-256-8', '{\"ram\": \"8GB\", \"color\": \"Mint\", \"storage\": \"256GB\"}', 0.00, 25),
(153, 52, 'Galaxy Z Flip5 Cream 512GB 8GB RAM', 'SM-F731UZCAXAA-CRM-512-8', '{\"ram\": \"8GB\", \"color\": \"Cream\", \"storage\": \"512GB\"}', 120.00, 20),
(154, 52, 'Galaxy Z Flip5 Graphite 256GB 8GB RAM', 'SM-F731UZKAXAA-GRP-256-8', '{\"ram\": \"8GB\", \"color\": \"Graphite\", \"storage\": \"256GB\"}', 0.00, 28),
(155, 52, 'Galaxy Z Flip5 Lavender 256GB 8GB RAM', 'SM-F731ULVAXAA-LAV-256-8', '{\"ram\": \"8GB\", \"color\": \"Lavender\", \"storage\": \"256GB\"}', 0.00, 22),
(156, 53, 'Galaxy S22 Phantom Black 128GB 8GB RAM', 'SM-S901UZKAXAA-BLK-128-8', '{\"ram\": \"8GB\", \"color\": \"Phantom Black\", \"storage\": \"128GB\"}', 0.00, 30),
(157, 53, 'Galaxy S22 Phantom White 256GB 8GB RAM', 'SM-S901UZWAXAA-WHT-256-8', '{\"ram\": \"8GB\", \"color\": \"Phantom White\", \"storage\": \"256GB\"}', 50.00, 25),
(158, 53, 'Galaxy S22 Pink Gold 128GB 8GB RAM', 'SM-S901UZPAXAA-PNK-128-8', '{\"ram\": \"8GB\", \"color\": \"Pink Gold\", \"storage\": \"128GB\"}', 0.00, 28),
(159, 54, 'Galaxy S21 FE Graphite 128GB 6GB RAM', 'SM-G990UZKAXAA-GRP-128-6', '{\"ram\": \"6GB\", \"color\": \"Graphite\", \"storage\": \"128GB\"}', 0.00, 35),
(160, 54, 'Galaxy S21 FE Olive 256GB 8GB RAM', 'SM-G990UZGAXAA-OLV-256-8', '{\"ram\": \"8GB\", \"color\": \"Olive\", \"storage\": \"256GB\"}', 60.00, 30),
(161, 54, 'Galaxy S21 FE White 128GB 6GB RAM', 'SM-G990UZWAXAA-WHT-128-6', '{\"ram\": \"6GB\", \"color\": \"White\", \"storage\": \"128GB\"}', 0.00, 32),
(162, 54, 'Galaxy S21 FE Lavender 256GB 8GB RAM', 'SM-G990ULVAXAA-LAV-256-8', '{\"ram\": \"8GB\", \"color\": \"Lavender\", \"storage\": \"256GB\"}', 60.00, 28),
(163, 55, 'Galaxy A05s Black 64GB 4GB RAM', 'SM-A057FZKAXAA-BLK-64-4', '{\"ram\": \"4GB\", \"color\": \"Black\", \"storage\": \"64GB\"}', 0.00, 70),
(164, 55, 'Galaxy A05s Silver 64GB 4GB RAM', 'SM-A057FZSAXAA-SLV-64-4', '{\"ram\": \"4GB\", \"color\": \"Silver\", \"storage\": \"64GB\"}', 0.00, 65),
(165, 55, 'Galaxy A05s Light Green 128GB 6GB RAM', 'SM-A057FZGAXAA-GRN-128-6', '{\"ram\": \"6GB\", \"color\": \"Light Green\", \"storage\": \"128GB\"}', 20.00, 60);

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `promotion_id` bigint UNSIGNED NOT NULL,
  `promotion_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `promotion_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `discount_type` enum('percentage','fixed_amount') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_value` decimal(15,2) DEFAULT NULL,
  `min_order_amount` decimal(15,2) DEFAULT NULL,
  `max_discount_amount` decimal(15,2) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `used_count` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `applicable_categories` json DEFAULT NULL,
  `applicable_products` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`promotion_id`, `promotion_name`, `promotion_code`, `description`, `discount_type`, `discount_value`, `min_order_amount`, `max_discount_amount`, `start_date`, `end_date`, `usage_limit`, `used_count`, `is_active`, `applicable_categories`, `applicable_products`, `created_at`) VALUES
(4, 'Redeemed Promotion', 'RD6271C68E', 'Redeemed promotion', 'fixed_amount', 1.10, NULL, NULL, '2025-12-15 17:56:59', '2026-01-15 17:56:59', 1, 0, 0, NULL, NULL, '2025-12-15 17:56:59'),
(5, 'Redeemed Promotion', 'RD0BAD4D8C', 'Redeemed promotion', 'fixed_amount', 15.00, NULL, NULL, '2025-12-15 18:00:45', '2026-01-15 18:00:45', 1, 0, 0, NULL, NULL, '2025-12-15 18:00:45');

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `token` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `expires_at` timestamp NOT NULL,
  `revoked` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`token`, `user_id`, `expires_at`, `revoked`, `created_at`, `updated_at`) VALUES
('9stuK3qwB8qQipqT', 8, '2026-03-15 04:45:27', 0, '2026-03-08 04:45:27', '2026-03-08 04:45:27'),
('pKVy9pWNbrz732_A', 9, '2026-03-15 07:32:29', 0, '2026-03-08 07:32:29', '2026-03-08 07:32:29'),
('rtNs4sEWB1wONuFO', 5, '2025-12-20 09:31:27', 0, '2025-12-13 09:31:27', '2025-12-13 09:31:27'),
('SBSCX0AyPjukptSh', 6, '2025-12-22 23:35:24', 0, '2025-12-15 23:35:24', '2025-12-15 23:35:24');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `rating` tinyint NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comments` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_verified_purchase` tinyint(1) NOT NULL DEFAULT '0',
  `is_approved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_desc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_desc`) VALUES
('admin', 'Administrator with full access'),
('member', 'default user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint UNSIGNED NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reward_points` bigint UNSIGNED NOT NULL DEFAULT '0',
  `email_verified` tinyint(1) NOT NULL DEFAULT '0',
  `verification_code` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `membership_tier_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'silver',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password_hash`, `full_name`, `phone`, `avatar_url`, `date_of_birth`, `gender`, `reward_points`, `email_verified`, `verification_code`, `membership_tier_id`, `created_at`, `updated_at`) VALUES
(5, 'newatomicemail2005@atomicmail.io', '$2y$12$s9vdzcmH3yZEnS18SMU1r.dK.VUkBvBp/QVAst.D551p.d/7b90Gq', 'tester1', NULL, NULL, NULL, NULL, 452, 1, '105821', 'silver', '2025-12-13 01:56:07', '2025-12-17 23:51:09'),
(6, 'remembermyname2k5@gmail.com', '$2y$12$O0q1UoY0/Z3lwH14z5lv0O.6BW8heEH6CF0JFXoctTIWuaIAMFizm', 'test1', NULL, NULL, NULL, NULL, 0, 1, '807638', 'silver', '2025-12-15 23:30:31', '2025-12-15 23:35:17'),
(8, 'cheesemcrib2004@gmail.com', '$2y$12$0jmdiQVEmhclumqAc9mOLeJ8O.FPlIKxviryEIXoTPJQJt6yQZn2C', 'Donald Mc', NULL, NULL, NULL, NULL, 1536, 1, '606783', 'silver', '2026-03-08 04:44:38', '2026-03-08 07:44:36'),
(9, '22520283@gm.uit.edu.vn', NULL, 'Dũng Nguyễn Mạnh', NULL, NULL, NULL, NULL, 0, 1, NULL, 'silver', '2026-03-08 07:32:29', '2026-03-08 07:32:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_promotions`
--

CREATE TABLE `user_promotions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `promotion_id` bigint UNSIGNED NOT NULL,
  `is_used` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint UNSIGNED NOT NULL,
  `role_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(6, 'admin'),
(8, 'admin'),
(5, 'member'),
(6, 'member'),
(9, 'member');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `addresses_user_id_foreign` (`user_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`),
  ADD UNIQUE KEY `brands_slug_unique` (`slug`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `carts_user_id_unique` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `cart_items_cart_id_foreign` (`cart_id`),
  ADD KEY `cart_items_product_id_foreign` (`product_id`),
  ADD KEY `cart_items_variant_id_foreign` (`variant_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `membership_tiers`
--
ALTER TABLE `membership_tiers`
  ADD PRIMARY KEY (`tier_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `orders_order_code_unique` (`order_code`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_shipping_address_id_foreign` (`shipping_address_id`),
  ADD KEY `orders_billing_address_id_foreign` (`billing_address_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`),
  ADD KEY `order_items_variant_id_foreign` (`variant_id`);

--
-- Indexes for table `order_promotions`
--
ALTER TABLE `order_promotions`
  ADD PRIMARY KEY (`order_id`,`promotion_id`),
  ADD KEY `order_promotions_promotion_id_foreign` (`promotion_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`),
  ADD KEY `products_brand_id_foreign` (`brand_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `product_categories_category_id_foreign` (`category_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `product_images_product_id_foreign` (`product_id`),
  ADD KEY `product_images_variant_id_foreign` (`variant_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`variant_id`),
  ADD UNIQUE KEY `product_variants_sku_unique` (`sku`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`promotion_id`),
  ADD UNIQUE KEY `promotions_promotion_code_unique` (`promotion_code`);

--
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`token`),
  ADD KEY `refresh_tokens_user_id_foreign` (`user_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `reviews_product_id_foreign` (`product_id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_membership_tier_id_foreign` (`membership_tier_id`);

--
-- Indexes for table `user_promotions`
--
ALTER TABLE `user_promotions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_promotions_user_id_foreign` (`user_id`),
  ADD KEY `user_promotions_promotion_id_foreign` (`promotion_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `user_roles_role_id_foreign` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `address_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `image_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `variant_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `promotion_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_promotions`
--
ALTER TABLE `user_promotions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_billing_address_id_foreign` FOREIGN KEY (`billing_address_id`) REFERENCES `addresses` (`address_id`),
  ADD CONSTRAINT `orders_shipping_address_id_foreign` FOREIGN KEY (`shipping_address_id`) REFERENCES `addresses` (`address_id`),
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `order_items_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`) ON DELETE SET NULL;

--
-- Constraints for table `order_promotions`
--
ALTER TABLE `order_promotions`
  ADD CONSTRAINT `order_promotions_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_promotions_promotion_id_foreign` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`promotion_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`);

--
-- Constraints for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_categories_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_images_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`) ON DELETE SET NULL;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `refresh_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_membership_tier_id_foreign` FOREIGN KEY (`membership_tier_id`) REFERENCES `membership_tiers` (`tier_id`) ON DELETE SET NULL;

--
-- Constraints for table `user_promotions`
--
ALTER TABLE `user_promotions`
  ADD CONSTRAINT `user_promotions_promotion_id_foreign` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`promotion_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_promotions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
