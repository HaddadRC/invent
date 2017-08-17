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
$comptes = array();


//la requete par defaut
$req = "SELECT * FROM `compte_general`";

//si filtre sur code_compte_general est demandé (depuis les combos)
if (!empty($_POST['code_compte_general'])) {
    $req = sprintf("%s WHERE code_compte_general LIKE '%s%%'",
        $req,
        $_POST['code_compte_general']);
}

$req .= " ORDER BY code_compte_general";

$result = $conn->query($req);
//fait une boucle et crée un tableau avec des champs de requête
if ($result)
    while ($compte = $result->fetch_assoc()) $comptes[] = $compte;
else {
    $ok = false;
    $errorMsg = "Exécution de la requête sur le serveur&nbsp;(code:" . $conn->errno . ")";
}

//encodage pour format JSON
echo json_encode(array(
    "success" => $ok,
    "MySQLError" => $conn->error,
    "errorMsg" => "Lecture Table «compte general»:&nbsp;" . $errorMsg,
    "reqs" => $req,
    "comptes" => $comptes,
));
