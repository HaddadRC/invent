<?php
/****************************************
 *
 *
 *
 ****************************************/
require_once "connect.inc";
require_once "fonctionsCRUD.inc";

$tab_data = json_decode($_POST['inventaires']);

$conn->query("START TRANSACTION");
//construction et execution des reqs
foreach ($tab_data as $data) {
    $req = construitRequete_maj($data, 'inventaire', ['numero_ligne']);
    gestion_err($conn->query($req));
}
if ($ok) $conn->query("COMMIT");
else $conn->query("ROLLBACK");


echo json_encode(array(
    "success" => $ok,
    "MySQLError" => $MySQLErr,
    "errorMsg" => "MAJ Table «inventaire»:" . $errorMsg,
    "reqs" => $reqs
));
