-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.7.14 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             9.4.0.5174
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Export de la structure de la base pour invent
DROP DATABASE IF EXISTS `invent`;
CREATE DATABASE IF NOT EXISTS `invent` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `invent`;

-- Export de la structure de la table invent. code_materiel
CREATE TABLE IF NOT EXISTS `code_materiel` (
  `code_materiel` varchar(5) NOT NULL,
  `code_famille_materiel` varchar(3) NOT NULL,
  `libelle_code_materiel` varchar(60) NOT NULL,
  PRIMARY KEY (`code_materiel`),
  KEY `fk_code_materiel_famille_materiel1_idx` (`code_famille_materiel`),
  CONSTRAINT `fk_code_materiel_famille_materiel1` FOREIGN KEY (`code_famille_materiel`) REFERENCES `famille_materiel` (`code_famille_materiel`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Les données exportées n'étaient pas sélectionnées.
-- Export de la structure de la table invent. compte_general
CREATE TABLE IF NOT EXISTS `compte_general` (
  `code_compte_general` varchar(5) NOT NULL,
  `taux_ammortissement` decimal(4,2) unsigned zerofill NOT NULL,
  `design_compte_general` varchar(45) DEFAULT NULL,
  `nature_depense` varchar(2) DEFAULT NULL COMMENT 'corresp 6xxx->ND',
  PRIMARY KEY (`code_compte_general`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Les données exportées n'étaient pas sélectionnées.
-- Export de la structure de la table invent. donnees
CREATE TABLE IF NOT EXISTS `donnees` (
  `nom` varchar(20) NOT NULL,
  `valeur` varchar(45) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Les données exportées n'étaient pas sélectionnées.
-- Export de la structure de la table invent. etat_93
CREATE TABLE IF NOT EXISTS `etat_93` (
  `id_ligne93` bigint(19) unsigned NOT NULL AUTO_INCREMENT,
  `annee` varchar(4) NOT NULL,
  `code_siege` varchar(2) NOT NULL,
  `mois_comptable` varchar(2) NOT NULL,
  `sequence_93` varchar(4) DEFAULT NULL,
  `code_projet` varchar(4) NOT NULL,
  `code_budget` varchar(6) NOT NULL,
  `code_compte_analytique` varchar(5) NOT NULL,
  `code_origine` varchar(2) NOT NULL,
  `groupe` varchar(2) NOT NULL,
  `ecriture` varchar(4) DEFAULT NULL,
  `libelle_93` varchar(45) DEFAULT NULL,
  `nature_depense` varchar(2) NOT NULL,
  `total_93` bigint(20) DEFAULT NULL,
  `etat` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '0: attente validation mensuelle\n1: non vidée\n2: en cours de traitement\n3: vidée non validée\n4: vidée et validée',
  `compte_general` varchar(5) DEFAULT NULL,
  `num_cmd` varchar(6) DEFAULT NULL,
  `parite` decimal(17,16) unsigned DEFAULT '1.0000000000000000' COMMENT 'taux de change',
  `num_bord` varchar(7) DEFAULT NULL,
  `avancement_vidage` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '0: pas encore\nV08\n1: natures vidage\n2: entrées physiques\n3: Exploitation\n4: Logiciel\n5: Charges A Repartir\n6: Modif comptable\n7: Correction\n8: Terminée\nV9323\n11: natures vidage\n12: Projet\n13: Exploitation\n14: Correction\n15: Terminée\nProdImmob\n21: Affectation Trvx\n22: Projets\n23: Expoitation\n24: Terminée',
  `vidage_correction` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'en cas de correction => choix effectué\n1: inventaire\n2: logiciel\n3: charge',
  `cg_modif_comptable` varchar(5) DEFAULT NULL COMMENT 'Compte general s''il y a lieu de modification comptable, NULL sinon',
  `cg_pertes` varchar(5) DEFAULT NULL,
  `commentaires` text,
  PRIMARY KEY (`id_ligne93`),
  KEY `fk_siege_etat_93_idx` (`code_siege`),
  KEY `fk_compte_analytique_etat_93_idx` (`code_compte_analytique`),
  KEY `fk_origine_etat_93_idx` (`code_origine`),
  CONSTRAINT `fk_compte_analytique_etat_93` FOREIGN KEY (`code_compte_analytique`) REFERENCES `compte_analytique` (`code_compte_analytique`) ON UPDATE CASCADE,
  CONSTRAINT `fk_origine_etat_93` FOREIGN KEY (`code_origine`) REFERENCES `origine` (`code_origine`) ON UPDATE CASCADE,
  CONSTRAINT `fk_siege_etat_93` FOREIGN KEY (`code_siege`) REFERENCES `siege` (`code_siege`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13268 DEFAULT CHARSET=utf8;

-- Les données exportées n'étaient pas sélectionnées.
-- Export de la structure de la table invent. inventaire
CREATE TABLE IF NOT EXISTS `inventaire` (
  `numero_ligne` bigint(19) unsigned NOT NULL AUTO_INCREMENT,
  `code_siege` varchar(2) DEFAULT NULL COMMENT 'null permit pour autoriser la sauvegarde de l''avancement',
  `code_compte_analytique` varchar(5) DEFAULT NULL COMMENT 'null permit pour autoriser la sauvegarde de l''avancement',
  `code_compte_general` varchar(5) DEFAULT NULL COMMENT 'null permit pour autoriser la sauvegarde de l''avancement',
  `code_materiel` varchar(5) DEFAULT NULL COMMENT 'null permit pour autoriser la sauvegarde de l''avancement',
  `gpe_appareil` decimal(2,0) unsigned zerofill NOT NULL DEFAULT '00',
  `code_appareil` decimal(2,0) unsigned zerofill NOT NULL DEFAULT '00',
  `rang_appareil` decimal(1,0) unsigned zerofill NOT NULL DEFAULT '0',
  `design_appareil` varchar(60) NOT NULL,
  `compl_design_appareil` tinytext,
  `num_appareil` varchar(10) DEFAULT NULL,
  `num_serie` varchar(45) DEFAULT NULL,
  `date_mise_serv` date DEFAULT NULL,
  `annee_acqui` varchar(4) DEFAULT NULL,
  `quantite` smallint(5) unsigned NOT NULL DEFAULT '1',
  `val_acqui` bigint(19) unsigned NOT NULL,
  `code_presence` tinyint(1) unsigned zerofill NOT NULL DEFAULT '5' COMMENT 'état du bien:\n0 : Actif\n1 : Reforme\n2 : Vente\n3 : Perte\n5 : entrée nouvelle',
  `cumul_ammor` bigint(19) unsigned DEFAULT '0',
  `date_mvt` date DEFAULT NULL,
  `num_bord` varchar(7) NOT NULL COMMENT '6 carac à l''origine, augmenté à 7 pour plus de marge',
  `numero_ligne_mere` bigint(19) unsigned DEFAULT NULL,
  `code_entree` enum('08','09') DEFAULT NULL,
  `matricule_affect` varchar(6) DEFAULT NULL,
  `desc_lieu_affectation` tinytext,
  `id_ligne93` bigint(19) unsigned DEFAULT NULL,
  `code_projet` varchar(10) DEFAULT NULL,
  `id_lignes_projet` bigint(19) unsigned DEFAULT NULL,
  `lot` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'vrai si un lot de matériel',
  `poste` mediumint(9) NOT NULL DEFAULT '0' COMMENT 'n° de poste lors du remplisaage du bordereau , il sera utilisé lors de la restitution de l''avancement du vidage 93',
  `commande_atl` varchar(8) DEFAULT NULL,
  `num_cmd` varchar(6) DEFAULT NULL,
  `creer_par` varchar(6) DEFAULT NULL COMMENT 'matricule créateur',
  `creer_le` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `existant` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`numero_ligne`),
  KEY `fk_compte_general_idx` (`code_compte_general`),
  KEY `fk_code_materiel_idx` (`code_materiel`),
  KEY `fk_n_ligne_mere_idx` (`numero_ligne_mere`),
  KEY `fk_ligne93_d_origine_idx` (`id_ligne93`),
  KEY `fk_inventaire_projet_idx` (`code_projet`),
  KEY `fk_inventaire_cmd_atl_idx` (`commande_atl`),
  KEY `fk_affectation_idx` (`code_siege`,`code_compte_analytique`),
  KEY `fk_inventaire_lignes_projet1_idx` (`id_lignes_projet`),
  CONSTRAINT `fk_affectation_inv` FOREIGN KEY (`code_siege`, `code_compte_analytique`) REFERENCES `section_analytique` (`code_siege`, `code_compte_analytique`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_code_materiel` FOREIGN KEY (`code_materiel`) REFERENCES `code_materiel` (`code_materiel`) ON UPDATE CASCADE,
  CONSTRAINT `fk_compte_general` FOREIGN KEY (`code_compte_general`) REFERENCES `compte_general` (`code_compte_general`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_inventaire_cmd_atl` FOREIGN KEY (`commande_atl`) REFERENCES `commande_atelier` (`commande_atl`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_inventaire_lignes_projet1` FOREIGN KEY (`id_lignes_projet`) REFERENCES `lignes_projet` (`id_lignes_projet`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_inventaire_projet` FOREIGN KEY (`code_projet`) REFERENCES `projet` (`code_projet`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_ligne93_d_origine` FOREIGN KEY (`id_ligne93`) REFERENCES `etat_93` (`id_ligne93`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_n_ligne_mere` FOREIGN KEY (`numero_ligne_mere`) REFERENCES `inventaire` (`numero_ligne`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1003361 DEFAULT CHARSET=utf8;

-- Les données exportées n'étaient pas sélectionnées.
-- Export de la structure de la table invent. lot_materiel
CREATE TABLE IF NOT EXISTS `lot_materiel` (
  `id_lot_materiel` int(11) NOT NULL AUTO_INCREMENT,
  `numero_ligne` bigint(19) unsigned NOT NULL,
  `libelle_lot_materiel` varchar(60) NOT NULL,
  `qte_lot_materiel` mediumint(8) unsigned NOT NULL DEFAULT '1',
  `prix_unitaire_lot_materiel` bigint(19) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_lot_materiel`),
  KEY `fk_lot_materiel_inventaire1_idx` (`numero_ligne`),
  CONSTRAINT `fk_lot_materiel_inventaire1` FOREIGN KEY (`numero_ligne`) REFERENCES `inventaire` (`numero_ligne`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Les données exportées n'étaient pas sélectionnées.
-- Export de la structure de la table invent. section_analytique
CREATE TABLE IF NOT EXISTS `section_analytique` (
  `code_siege` varchar(2) NOT NULL,
  `code_compte_analytique` varchar(5) NOT NULL,
  PRIMARY KEY (`code_siege`,`code_compte_analytique`),
  KEY `fk_compte_analytique_idx` (`code_compte_analytique`),
  CONSTRAINT `fk_compte_analytique` FOREIGN KEY (`code_compte_analytique`) REFERENCES `compte_analytique` (`code_compte_analytique`) ON UPDATE CASCADE,
  CONSTRAINT `fk_plan_comptable_siege` FOREIGN KEY (`code_siege`) REFERENCES `siege` (`code_siege`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Les données exportées n'étaient pas sélectionnées.
-- Export de la structure de la table invent. siege
CREATE TABLE IF NOT EXISTS `siege` (
  `code_siege` varchar(2) NOT NULL,
  `libelle_siege` varchar(40) NOT NULL,
  PRIMARY KEY (`code_siege`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Les données exportées n'étaient pas sélectionnées.
-- Export de la structure de la table invent. utilisateur
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `matricule` char(6) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `pass` char(60) NOT NULL,
  `profil` varchar(10) NOT NULL DEFAULT 'cons' COMMENT 'cons, compta, techcompta, dt',
  PRIMARY KEY (`matricule`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Les données exportées n'étaient pas sélectionnées.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
