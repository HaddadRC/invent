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
$sections = array();

//Affectation
if (isset($_POST['combo_siege_affect'])) {
    $req = sprintf("SELECT DISTINCT SA.code_siege, S.libelle_siege
    FROM `section_analytique` SA, `siege` S
    WHERE SA.code_siege LIKE '%s%%'
    AND LEFT(SA.code_compte_analytique,2) IN ('91','92','94')
    AND SA.code_siege = S.code_siege
    ORDER BY code_siege",
        $conn->real_escape_string($_POST['combo_siege_affect']));
}
if (isset($_POST['combo_compte_affect'])) {
    $req = sprintf("SELECT DISTINCT SA.code_siege, SA.code_compte_analytique , CA.libelle_compte_analytique
    FROM `section_analytique` SA, `compte_analytique` CA
    WHERE SA.code_compte_analytique LIKE '%s%%'
    AND LEFT(SA.code_compte_analytique,2) IN ('91','92','94')
    AND SA.code_compte_analytique = CA.code_compte_analytique
    GROUP BY SA.code_siege,SA.code_compte_analytique
    ORDER BY code_compte_analytique",
        $conn->real_escape_string($_POST['combo_compte_affect']));
}

if (!empty($req)) {
    $result = $conn->query($req);
    //fait une boucle et crée un tableau avec des champs de requête
    if ($result)
        while ($section = $result->fetch_assoc()) $sections[] = $section;
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
    "errorMsg" => "Lecture Table «Section Analytique»:&nbsp;" . $errorMsg,
    "reqs" => $req,
    "sections" => $sections
));
