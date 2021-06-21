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

/*Table structure for table `questions` */

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `q_id` int(11) NOT NULL AUTO_INCREMENT,
  `q_name` varchar(30) DEFAULT NULL,
  `q_description` varchar(200) DEFAULT NULL,
  `q_cover` varchar(255) DEFAULT NULL,
  `q_share` tinyint(1) DEFAULT 0,
  `q_music_id` int(11) DEFAULT NULL,
  `q_play_num` int(11) DEFAULT NULL,
  `q_user_id` int(11) DEFAULT NULL,
  `q_updated_at` date DEFAULT NULL,
  `q_uid` varchar(100) DEFAULT NULL,
  `q_content` text DEFAULT NULL,
  `q_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`q_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
