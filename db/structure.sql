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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Piezas de motor'),(2,'Filtros y aceite'),(3,'Electroventiladores'),(4,'Frenos'),(5,'Repuestos de exterior'),(6,'Encendido');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Kit de distribución KTB108','Kit de distribución completo KTB108',1,5300,'fotoproducto1.jpg'),(2,'Kit de distribución con bomba KTBWP1960','Kit de distribución con bomba completo KTBWP1960',2,9600,'fotoproducto2.jpg'),(3,'Tensor ATB2323','Tensor de distribución ATB2323',3,3400,'fotoproducto3.jpg'),(4,'Correa de distribución 095SP190H ','Correa de distribución 095SP190H',4,2000,'fotoproducto4.jpg'),(5,'Producto 5','Descripción del producto 5...',5,5000,'fotoproducto5.jpg'),(6,'Producto 6','Descripción del producto 6...',5,7000,'1640183243508.jpg'),(7,'Producto Prueba ','Producto prueba Nº91920',3,9191,'1640348712155.jpg'),(8,'Kit de distribución KTB309','Kit de distribución completo KTB309',1,6700,'fotoproducto7.jpg'),(9,'Kit de distribución con bomba KTBWP3211','Kit de distribución con bomba completo KTBWP3211',2,12600,'fotoproducto8.jpg'),(10,'Tensor ATB2314','Tensor de distribución ATB2314',3,2700,'fotoproducto9.jpg'),(11,'Correa de distribución 095SP170H','Correa de distribución 095SP170H',4,1800,'fotoproducto10.jpg');
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
INSERT INTO `subcategories` VALUES (1,'Kit de distribucion',1),(2,'Kit de distribución con bomba',1),(3,'Tensor',1),(4,'Correa de distribucion',1),(5,'Correa Poly-V',1),(6,'Filtro de aire ',2),(7,'Filtro de aceite',2),(8,'Filtro de nafta',2),(9,'Electroventilador',3),(10,'Helice',3),(11,'Forzador',3),(12,'Polea Viscosa',3),(13,'Pastillas de freno',4),(14,'Escobillas',5),(15,'Bujías',6);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Juan Pablo','Carta','juanpcarta@gmail.com','Juanpcarta','$2a$10$Z8BLSDDEDT22AQb2WPlPoeyyWFrfSNqZlPlqROnbyqJNMqLyMs/YK','1641879732566.jpg',1),(2,'Agustín','Narvaez','agus.narvaez@outlook.com','Agus','$2a$10$nxqE.w.TwnokQph5jeQ22uGCnrdDcZaEnRMRH7f8Of0mNQmEL/RMK','1641880662603.jpg',1),(3,'Nicolás','Di Renzo','nicodirenzo@gmail.com','Nico','$2a$10$CAUiRbGOqG2HfybiyIEp4eRy4Jsx9FHVtS.IPepQpIV8VwjtGAFzG','1641880814326.jpg',1),(4,'Ana','Lopez','alopez@gmail.com','Ana','$2a$10$2QEzsqdKUtWJ4TZLJfSo6.ZxvEedjUNkkfg4gBHrLoYTZsSKAK6kK','1641882574166.jpg',1),(5,'Jorge','Roca','jroca@hotmail.com','Jorge','$2a$10$yBkezsGE50or19Lc9oNEt.udJ9AiypSkLgXz7HNv7w5wlPaO28C7C','1641882648004.jpg',1),(6,'Patricia','Rodriguez','prodriguez@gmail.com','Patri','$2a$10$QYHXGh5J8kAVESIlR7ZaJucqmMzkCGFLKc5L.aEuiBhFZYXswM8lK','1641882724180.jpg',1),(7,'Rubén','Tagliaferro','rtagliaferro@hotmail.com','Rubén','$2a$10$wPPek64z3nbmzSYT1kuTH.HIylw3mMtvJJ073DZub40IDnW9kKSiS','1641882786607.jpg',1),(8,'Esteban','Trotta','etrotta@gmail.com','Esteban','$2a$10$5qcjobHuo3m7qKOHkyC6putuvbSQOso7UQFeYIJKMK7M8d06gJm46','1641882886665.jpg',1),(9,'Agustina','Fernandez','afernandez@hotmail.com','Agustina','$2a$10$Ci0Xrov/.nfKhR5SZTxLoeGLGcXBr1zGE0gDNBJgqi3cfg/tO1TAK','1641882940148.jpg',1),(10,'Florencia','Carrizo','fcarrizo@hotmail.com','Flor','$2a$10$i1OekIxWYwEuzCV2ZgGWveekETvhi7z8XE6duhJ/N7qK9wWihCe/e','1641882978432.jpg',1),(11,'Marcos','Bernardez','mbernardez@yahoo.com','Marquitos','$2a$10$u21s6GIiJqgcq3AypN0fOegr0NrYNrkCVKixhKDiy295nIudhhYbK','1641883021442.jpg',1),(12,'Carlos','Ramirez','cramirez@yahoo.com','Charly','$2a$10$AaQlAaGkag3YNO0afSqbIempTBdDTMm5jcUI328R7A5Zj8Ei4LIbG','1641883517011.jpg',1),(13,'Sergio','Achaval','sachaval@hotmail.com','Serge','$2a$10$fcbcccU3yJ8E9rBf6xQorOwNumCXI/eL.y1KHzsvBGZfBgTXzVcNK','1641883582294.jpg',1),(14,'Yanina','Serrano','yserrano@hotmail.com','Yani','$2a$10$Hv2fAum5EQ/nKcmDxTXSYeP9.C9rd7kpxIhfH7PdjXkJ6gr1zA3D.','1641883634195.jpg',1),(15,'Susana','Horia','shoria@yahoo.com','Susi','$2a$10$qReVlt0hkO/MKM1ykSVnbuioc67/DKKbC1eZTev8kVRoMmshenrj2','1641883670558.jpg',1),(16,'Armando Esteban','Quito','aquito@hotmail.com','Armando','$2a$10$k6tK.YtULqYYAopswVBZu.lXxD9ic6BINTDnNndNUPqL9pGV2JA9G','1641883768338.jpg',1),(17,'Aquiles','Baeza','abaeza@yahoo.com','Aquiles','$2a$10$oU4pNxHXWfSBDF42FkJ/s.xD.sVdngZj.kJrUHoAn4eAXZ7hmIwKm','1641883816013.jpg',1),(18,'Elena','Nito','enito@hotmail.com','Elena','$2a$10$l/7bkfSiFe23Uk7nDW8thOQV.Sjv4v.DQopoURj9lFaOYIr1XGHCu','1641883889193.jpg',1),(19,'Elba','Lazo','elazo@hotmail.com','Elba','$2a$10$/mDyGXl.vPgro0XZsg63Ku1OYWwz27YU8m7gBnzsasA6vZeh9jyd6','1641883941004.jpg',1),(20,'Armando','Casas','acasas@yahoo.com','Armi','$2a$10$.z3bgkAcgGGUNX.zK4rqMuhI0HW4hHIHGqS3VtqzZUnXLhl5fCwzm','1641884029136.jpg',1);
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

-- Dump completed on 2022-01-11  4:02:56
