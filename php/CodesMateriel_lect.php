<?php
/****************************************
 *
 *
 *
 ****************************************/

require_once "connect.inc";

$errorMsg = "";
$ok = true;
$req = "";
$codes = array();

//la requete par defaut
$req = "SELECT materiel.*, famille.libelle_famille_materiel
    FROM `famille_materiel` famille, `code_materiel` materiel
    WHERE famille.code_famille_materiel = materiel.code_famille_materiel";

//si filtre sur famille est demandée
if (!empty($_POST['code_famille_materiel'])) {
    $req = sprintf("$req AND materiel.code_famille_materiel = '%s'",
        $conn->real_escape_string($_POST['code_famille_materiel']));
    $req = $req . " ORDER BY materiel.code_famille_materiel";
}

//si filtre sur code_materiel est demandé
if (!empty($_POST['code_materiel'])) {
    $req = sprintf("SELECT * FROM `code_materiel` WHERE code_materiel LIKE '%s%%' ORDER BY code_materiel",
        $_POST['code_materiel']);
}

$result = $conn->query($req);
if ($result)
    while ($code = $result->fetch_assoc()) $codes[] = $code;
else {
    $ok = false;
    $errorMsg = "Exécution de la requête sur le serveur&nbsp;(code:" . $conn->errno . ")";
}

//encodage pour format JSON
echo json_encode(array(
    "success" => $ok,
    "MySQLError" => $conn->error,
    "errorMsg" => "Lecture Table «codesMateriel»:&nbsp;" . $errorMsg,
    "reqs" => $req,
    "codesMateriel" => $codes
));
