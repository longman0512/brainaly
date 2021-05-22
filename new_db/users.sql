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

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(30) DEFAULT NULL,
  `u_birthday` date DEFAULT NULL,
  `u_email` varchar(30) DEFAULT NULL,
  `u_pwd` varchar(100) DEFAULT NULL,
  `u_payment_info` varchar(30) DEFAULT NULL,
  `u_type` varchar(20) DEFAULT NULL,
  `u_school` varchar(80) DEFAULT NULL,
  `u_avatar` varchar(40) DEFAULT NULL,
  `u_score` int(11) DEFAULT 0,
  `u_email_verified` tinyint(1) DEFAULT 0,
  `u_email_verify_code` varchar(11) DEFAULT NULL,
  `u_membership_type` varchar(20) DEFAULT 'free',
  `u_status` varchar(40) DEFAULT 'approved',
  `u_expire_date` date DEFAULT NULL,
  `u_created_at` timestamp NULL DEFAULT current_timestamp(),
  `u_free_remain_time` int(11) DEFAULT 7,
  `u_updated_at` timestamp NULL DEFAULT NULL,
  `u_phonenumber` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
