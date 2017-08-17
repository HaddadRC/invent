<?php
/****************************************
 *
 *
 *
 ****************************************/

$errorMsg = "";
$MySQLErr = array();
$ok = true;
$rs = true;
$req = "";
$reqs = array();
$Ids = array();

/**
 * @param object $parametres Objet champs/valeurs contenant les paramètres de recherche
 * @param string $table nom de la table à màj
 * @return string requete de selection
 */
function construitRequete_consult($parametres, $table) {
    global $conn, $req;
    $params = "";
    $req = sprintf("SELECT * FROM %s WHERE ", $table);
    foreach ($parametres as $colonne => $valeur) {

        if ($valeur != '') {
            switch (gettype($valeur)) {
                case "boolean":
                    $params = sprintf(" %s %s = %d AND", $params, $colonne, $conn->real_escape_string($valeur));
                    break;
                case "integer":
                    $params = sprintf(" %s %s = '%d' AND", $params, $colonne, $conn->real_escape_string($valeur));
                    break;
                case "double":
                    $params = sprintf(" %s %s = '%s' AND", $params, $colonne, $conn->real_escape_string($valeur)); //%s au lieu de %f pour la precision
                    break;
                case "string":
                    $params = sprintf(" %s %s = '%s' AND", $params, $colonne, $conn->real_escape_string($valeur));
                    break;
                case "NULL":
                    $params = sprintf(" %s %s = NULL AND", $params, $colonne, $valeur);
                    break;
            }
        }
    }
    $params = substr($params, 0, strlen($params) - 3); //supp de la derniere "AND"

    $req = sprintf("%s %s", $req, $params);
    return $req;
}


/**
 * @param object $enreg Objet {champs:valeurs} contenant les valeurs à màj
 * @param string $table nom de la table à màj
 * @param array $cles noms clés primaires de la table
 * @param bool $cle_modifiable vrai si la clé primaire peut être modifiée (default=false).
 *  Si vrai $enreg doit contenir la proprieté id qui contient la concaténation des clés séparés par '$$'.
 *  L'ordre ds id doit être le même que dans $cles
 * @return string requete de màj
 */
function construitRequete_maj($enreg, $table, $cles, $cle_modifiable = false) {
    global $conn, $req;
    $params = "";
    $req = sprintf("UPDATE %s SET ", $table);
    foreach ($enreg as $colonne => $valeur) {
        if ($colonne != 'id' && !array_search($colonne, $cles, true)) {
            switch (gettype($valeur)) {
                case "boolean":
                    $params = sprintf(" %s %s = %d,", $params, $colonne, $conn->real_escape_string($valeur));
                    break;
                case "integer":
                    $params = sprintf(" %s %s = '%d',", $params, $colonne, $conn->real_escape_string($valeur));
                    break;
                case "double":
                    $params = sprintf(" %s %s = '%s',", $params, $colonne, $conn->real_escape_string($valeur)); //%s au lieu de %f pour la precision
                    break;
                case "string":
                    $params = sprintf(" %s %s = '%s',", $params, $colonne, $conn->real_escape_string($valeur));
                    break;
                case "NULL":
                    $params = sprintf(" %s %s = NULL,", $params, $colonne, $conn->real_escape_string($valeur));
                    break;
            }
        }
    }
    $params = substr($params, 0, strlen($params) - 1); //supp de la derniere ","

    //codition WHERE
    $params .= " WHERE ";
    if ($cle_modifiable) {
        $tab_anciennes_cles = explode('$$', $enreg->id);
        $i = 0;
        foreach ($cles as $cle) {
            $params = sprintf("%s %s = '%s' AND ", $params, $cle, $tab_anciennes_cles[$i]);
            $i++;
        }
    }
    else {
        foreach ($cles as $cle) {
            $params = sprintf("%s %s = '%s' AND ", $params, $cle, $enreg->$cle);
        }
    }

    $params = substr($params, 0, strlen($params) - 4); //supp du dernier "AND "
    $req = sprintf("%s %s", $req, $params);
    return $req;
}

/**
 * @param object $enreg Objet champs/valeurs contenant les valeurs à supp
 * @param string $table nom de la table à supp depius
 * @param array $cles noms clés primaires de la table
 * @return string requete de supp
 */
function construitRequete_supp($enreg, $table, $cles) {
    global $req;
    $params = "";

    $req = sprintf("DELETE FROM %s ", $table);
    //codition WHERE
    $params .= " WHERE ";

    foreach ($cles as $cle) {
        $params = sprintf("%s %s = '%s' AND ", $params, $cle, $enreg->$cle);
    }
    $params = substr($params, 0, strlen($params) - 4); //supp du dernier "AND "
    $req = sprintf("%s %s", $req, $params);
    return $req;
}

/**
 * @param object $enreg Objet champs/valeurs contenant les valeurs à ajouter
 * @param string $table nom de la table ds la quelle ajouter
 * @return string requete d'ajout
 */
function construitRequete_ajout($enreg, $table) {
    global $conn, $req;
    $params = "";
    $req = sprintf("INSERT INTO %s (", $table);
    foreach ($enreg as $colonne => $valeur)
        if ($colonne != 'id') {
            $req = sprintf("%s %s,", $req, $colonne);
            switch (gettype($valeur)) {
                case "boolean":
                    $params = sprintf("%s %d,", $params, $valeur);
                    break;
                case "integer":
                    $params = sprintf("%s '%d',", $params, $valeur);
                    break;
                case "double":
                    $params = sprintf("%s '%f',", $params, $valeur);
                    break;
                case "string":
                    $params = sprintf("%s '%s',", $params, $conn->real_escape_string($valeur));
                    break;
                case "NULL":
                    $params = sprintf("%s NULL,", $params, $valeur);
                    break;
            }
        }
    $req = substr($req, 0, strlen($req) - 1); //supp de la derniere ","
    $req .= ") VALUES(";
    $params = substr($params, 0, strlen($params) - 1); //supp de la derniere ","
    $params .= ")";
    $req = sprintf("%s %s", $req, $params);
    return $req;
}

/**
 * Gestion des erreurs de la BD
 * @param mixed $rs resultat de l'execution de da la req
 * @param bool $returnIds si on veut retourner les nv Id
 * @return array liste des nv Id ajoutés
 */
function gestion_err($rs, $returnIds = false) {
    global $conn, $errorMsg, $ok, $req, $reqs, $MySQLErr, $Ids;
    if (!$rs) {
        $errorMsg .= "<br />&nbsp;&nbsp;*";
        switch ($conn->errno) {
            case 1062:
                $errorMsg .= "Duplication";
                break;
            case 1451:
                $errorMsg .= "Erreur d'itergité(Mère)";
                break;
            case 1452:
                $errorMsg .= "Erreur d'itergité(Fille)";
                break;
            default:
                $errorMsg .= "Non répertoriée";
        }
        $ok = false;
        $errorMsg .= "&nbsp;(code:" . $conn->errno . ")";
        $MySQLErr[] = $conn->error;
    }
    else
        if ($returnIds)
            $Ids[] = $conn->insert_id;
    $ok = $ok && $rs;
    $reqs[] = $req;
    return $Ids;
}



