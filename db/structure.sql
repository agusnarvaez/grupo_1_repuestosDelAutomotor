CREATE DATABASE  IF NOT EXISTS `proyecto-integrador_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `proyecto-integrador_db`;
-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: proyecto-integrador_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Categoría A'),(2,'Categoría B'),(3,'Categoría C');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoicing_addresses`
--

DROP TABLE IF EXISTS `invoicing_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoicing_addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `number` int(11) NOT NULL,
  `floor` varchar(10) DEFAULT NULL,
  `apartment` varchar(10) DEFAULT NULL,
  `zip_code` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_da87780d-bed3-465f-aa83-6a900099cde4` (`user_id`),
  CONSTRAINT `FK_da87780d-bed3-465f-aa83-6a900099cde4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoicing_addresses`
--

LOCK TABLES `invoicing_addresses` WRITE;
/*!40000 ALTER TABLE `invoicing_addresses` DISABLE KEYS */;
INSERT INTO `invoicing_addresses` VALUES (1,'Nueve de Julio','Buenos Aires','Tucumán',1566,NULL,NULL,6500,2),(2,'Mar del Plata','Buenos Aires','Avenida Cristobal Colón',4351,'10','b',4351,3),(3,'Comodoro Rivadavia','Chubut','Clarin',542,NULL,NULL,9002,1);
/*!40000 ALTER TABLE `invoicing_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `product_image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_38813cbc-978f-4ffa-a4c4-81593354abc2` (`subcategory_id`),
  CONSTRAINT `FK_38813cbc-978f-4ffa-a4c4-81593354abc2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Producto 1','Descripción del producto 1…',1,1075,'fotoproducto1.jpg'),(2,'Producto 2','Descripción del producto 2…',2,3600,'fotoproducto2.jpg'),(3,'Producto 3','Descripción del producto 3…',3,1000,'fotoproducto3.jpg'),(4,'Producto 4','Descripción del producto 4…',4,2000,'fotoproducto4.jpg'),(5,'Producto 5','Descripción del producto 5…',5,5000,'fotoproducto5.jpg'),(6,'Producto 6','Descripción del producto 6…',6,7000,'fotoproducto6.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador'),(2,'Usuario');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sales_date` datetime NOT NULL,
  `total_amount` decimal(10,0) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ddff7f90-7efa-4761-acd5-ab9e50731d1c` (`user_id`),
  CONSTRAINT `FK_ddff7f90-7efa-4761-acd5-ab9e50731d1c` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,'2020-12-03 18:45:05',18000,3),(2,'2017-03-19 15:18:08',430000,1),(3,'2015-04-21 07:55:55',35000,2);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_detail`
--

DROP TABLE IF EXISTS `sales_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_detail` (
  `id` int(11) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `sales_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f5867f7b-40c3-4304-aa3e-07dbf3ac04cc` (`product_id`),
  KEY `FK_7f5ee110-70a8-4c93-abcb-7ff2d5e13104` (`sales_id`),
  CONSTRAINT `FK_7f5ee110-70a8-4c93-abcb-7ff2d5e13104` FOREIGN KEY (`sales_id`) REFERENCES `sales` (`id`),
  CONSTRAINT `FK_f5867f7b-40c3-4304-aa3e-07dbf3ac04cc` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_detail`
--

LOCK TABLES `sales_detail` WRITE;
/*!40000 ALTER TABLE `sales_detail` DISABLE KEYS */;
INSERT INTO `sales_detail` VALUES (1,18000,1,2,5),(2,430000,2,1,400),(3,35000,3,3,35);
/*!40000 ALTER TABLE `sales_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_adresses`
--

DROP TABLE IF EXISTS `shipping_adresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_adresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `number` int(11) NOT NULL,
  `floor` varchar(10) DEFAULT NULL,
  `apartment` varchar(10) DEFAULT NULL,
  `zip_code` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8aa8e955-7877-48a1-aa7e-db6a83ecaba4` (`user_id`),
  CONSTRAINT `FK_8aa8e955-7877-48a1-aa7e-db6a83ecaba4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_adresses`
--

LOCK TABLES `shipping_adresses` WRITE;
/*!40000 ALTER TABLE `shipping_adresses` DISABLE KEYS */;
INSERT INTO `shipping_adresses` VALUES (1,'Nueve de Julio','Buenos Aires','Tucumán',1566,NULL,NULL,6500,2),(2,'Mar del Plata','Buenos Aires','Avenida Cristobal Colón',4351,'10','b',4351,3),(3,'Comodoro Rivadavia','Chubut','Clarin',542,NULL,NULL,9002,1);
/*!40000 ALTER TABLE `shipping_adresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `subcategory_name` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_99b44f90-2ccc-4626-a9a8-f66407cf84fb` (`category_id`),
  CONSTRAINT `FK_99b44f90-2ccc-4626-a9a8-f66407cf84fb` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Subcategoría 1',1),(2,'Subcategoría 2',1),(3,'Subcategoría 3',2),(4,'Subcategoría 4',2),(5,'Subcategoría 5',3),(6,'Subcategoría 6',3);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(80) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_image` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7fa81561-bb77-4172-a156-e0c2025eb060` (`role_id`),
  CONSTRAINT `FK_7fa81561-bb77-4172-a156-e0c2025eb060` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Agustín','Narvaez','agus.narvaez@outlook.com','Agus','$2a$10$j2exIjfT7qLVY7Q.C9/ireGVxfxsL4qC7oz2UNwtKlgTKnr7GzG42','1635958088645.jpg',1),(2,'Juan Pablo','Carta','juanpcarta@gmail.com','Juan','$2a$10$s6nyMNt4ajvHr0RUmZTj1.EucfVXOSitkqLvQm9lmjNe3I9iBPhqO','1635958175306.jpg',1),(3,'Nicolás','Di Renzo','nicodirenzo@gmail.com','Nico','$2a$10$DJl57omVzoqYfngIatJROOW2rK2QvWQ/OvtJzY.rbpL6bjbv94Y62','1635958242689.jpg',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'proyecto-integrador_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-24 11:54:40
