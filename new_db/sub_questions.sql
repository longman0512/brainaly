/*
SQLyog Community
MySQL - 10.4.14-MariaDB : Database - brainaly
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`brainaly` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `brainaly`;

/*Table structure for table `sub_questions` */

DROP TABLE IF EXISTS `sub_questions`;

CREATE TABLE `sub_questions` (
  `sub_id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_title` varchar(30) DEFAULT NULL,
  `sub_description` varchar(100) DEFAULT NULL,
  `sub_image` varchar(50) DEFAULT NULL,
  `sub_type` varchar(10) DEFAULT NULL,
  `sub_time_limit` int(11) DEFAULT NULL,
  `sub_point` int(11) DEFAULT NULL,
  `sub_ans_type` varchar(10) DEFAULT NULL,
  `sub_sequence` int(11) DEFAULT NULL,
  `sub_created_at` date DEFAULT NULL,
  `sub_updated_at` date DEFAULT NULL,
  `sub_quiz_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
