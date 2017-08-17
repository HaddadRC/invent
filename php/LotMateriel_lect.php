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
$lotsMateriel = array();

//Lots par n°lgn (inventaire)
if (isset($_POST['op']) && $_POST['op'] == 'parNumLgn' && !empty($_POST['numero_ligne'])) {
    $req = sprintf("SELECT * FROM lot_materiel
                    WHERE numero_ligne = %s
                    ORDER BY id_lot_materiel",
        $_POST['numero_ligne']);
}

//Lots par ID Lot
if (isset($_POST['op']) && $_POST['op'] == 'parID' && !empty($_POST['id_lot_materiel'])) {
    $req = sprintf("SELECT * FROM lot_materiel
                    WHERE id_lot_materiel = %s",
        $_POST['id_lot_materiel']);
}


if (!empty($req)) {
    $result = $conn->query($req);
    //fait une boucle et crée un tableau avec des champs de requête
    if ($result)
        while ($lotMateriel = $result->fetch_assoc()) $lotsMateriel[] = $lotMateriel;
    else {
        $ok = false;
        $errorMsg = "Exécution de la requête sur le serveur&nbsp;(code:" . $conn->errno . ")";
    }
}
else {
    $ok = false;
    $errorMsg = "requête vide";
}
//encodage pour format JSON
echo json_encode(array(
    "success" => $ok,
    "MySQLError" => $conn->error,
    "errorMsg" => "Lecture Table «LotMateriel»:&nbsp;" . $errorMsg,
    "reqs" => $req,
    "lotsMateriel" => $lotsMateriel,
));
