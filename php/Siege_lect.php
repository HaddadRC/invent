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
$sieges = array();

$req = "SELECT * FROM `siege`";

if (isset($_POST['code_siege']))
    $req = sprintf("$req WHERE code_siege LIKE '%s%%'",
        $conn->real_escape_string($_POST['code_siege']));


$req = $req . " ORDER BY code_siege";

$result = $conn->query($req);

//fait une boucle et crée un tableau avec des champs de requête
if ($result)
    while ($siege = $result->fetch_assoc()) $sieges[] = $siege;
else {
    $ok = false;
    $errorMsg = "Exécution de la requête sur le serveur&nbsp;(code:" . $conn->errno . ")";
}

//encodage pour format JSON
echo json_encode(array(
    "success" => $ok,
    "MySQLError" => $conn->error,
    "errorMsg" => "Lecture Table «sieges»:&nbsp;" . $errorMsg,
    "reqs" => $req,
    "sieges" => $sieges,
));
