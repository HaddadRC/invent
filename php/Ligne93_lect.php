<?php
/****************************************
 *
 *
 *
 ****************************************/

require_once "connect.inc";
require_once "fonctionsCRUD.inc";

/**
 * Lit l'année & mois comptables depuis table données
 * @return array valeurs comptable tq [annee,mois]
 */
function get_annee_mois_comtable()
{

    global $conn;
    $annee_comptable = "";
    $req = "SELECT valeur FROM donnees WHERE nom = 'annee_comptable'";
    $result = $conn->query($req);
    if ($result)
        $annee_comptable = $result->fetch_assoc()['valeur'];

    $mois_comptable = "";
    $req = "SELECT valeur FROM donnees WHERE nom = 'mois_comptable'";
    $result = $conn->query($req);
    if ($result)
        $mois_comptable = $result->fetch_assoc()['valeur'];

    return [$annee_comptable, $mois_comptable];
}

$errorMsg = "";
$ok = true;
$req = "";
$lignes = array();
$req = "";
$success = false;
$annee_comptable = get_annee_mois_comtable()[0];

//Vidage 08 et Vidage 9323
if (!empty($_POST['op']) && $_POST['op'] == 'V08') {
    if (!empty($_POST['mois_comptable']) && !empty($_POST['code_origine']) && !empty($_POST['groupe']) && !empty($_POST['ecriture']) && !empty($_POST['code_siege']) && !empty($_POST['code_compte_analytique']) && !empty($_POST['code_budget'])) {
        $req = sprintf("SELECT *,CONCAT(code_siege,mois_comptable,sequence_93) as num_ordre FROM `etat_93`
         WHERE mois_comptable='%s' AND code_origine='%s' AND groupe='%s' AND ecriture='%s' AND code_siege='%s' AND code_compte_analytique='%s' AND code_budget='%s' AND nature_depense = '54'
         AND annee = '%s'
         ORDER BY num_ordre",
            $conn->real_escape_string($_POST['mois_comptable']),
            $conn->real_escape_string($_POST['code_origine']),
            $conn->real_escape_string($_POST['groupe']),
            $conn->real_escape_string($_POST['ecriture']),
            $conn->real_escape_string($_POST['code_siege']),
            $conn->real_escape_string($_POST['code_compte_analytique']),
            $conn->real_escape_string($_POST['code_budget']),
            $conn->real_escape_string($annee_comptable)
        );
    }
    else {
        $ok = false;
        $errorMsg = 'Manque de paramètres(Vidage 08)';
    }
}

//par num_cmd (pour consultation M5)
if (!empty($_POST['op']) && $_POST['op'] == 'parCmdM5') {
    if (!empty($_POST['num_cmd']))
        $req = sprintf("SELECT num_bord,total_93 FROM `etat_93`
         WHERE num_cmd='%s'
         AND num_bord IS NOT NULL",
            $conn->real_escape_string($_POST['num_cmd'])
        );
    else {
        $ok = false;
        $errorMsg = 'Manque de paramètres(num cmd)';
    }
}

//verif que la req a ete cree
if ($req == "") {
    $ok = false;
    $errorMsg = 'Manque de paramètres(Pas de req)';
}

//exec requete
if ($ok) {
    $result = $conn->query($req);
    if ($result)
        while ($ligne = $result->fetch_assoc()) $lignes[] = $ligne;
    else {
        $ok = false;
        $errorMsg = "Exécution de la requête sur le serveur&nbsp;(code:" . $conn->errno . ")";
    }
}

//encodage pour format JSON
echo json_encode(array(
    "success"    => $ok,
    "MySQLError" => $conn->error,
    "errorMsg"   => "Lecture Table «etat93»:&nbsp;" . $errorMsg,
    "reqs"       => $req,
    "lignes93"   => $lignes
));
