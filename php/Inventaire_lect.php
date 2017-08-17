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
$inventaires = array();

if (!empty($_POST['op'])) {
    //verif unicité num_appareil
    if ($_POST['op'] == 'verif_unic_nums_appareil' && !empty($_POST['nums_appareil']) && !empty($_POST['nums_lgn'])) {
        $nums_lgn = explode(",", $_POST['nums_lgn']);
        $nums_appareil = explode(",", $_POST['nums_appareil']);
        $params = "";
        $taille = count($nums_lgn);

        for ($i = 0; $i < $taille; $i++) {
            if ($nums_appareil[$i] != '') {
                if (!empty($params)) $params = $params . " OR ";
                {
                    $params = $params . " num_appareil = '" . $nums_appareil[$i] . "'";
                    if ($nums_lgn[$i] != 'null')
                        $params = $params . " AND numero_ligne != " . $nums_lgn[$i];
                }
            }

        }
        if (!empty($params))
            $req = sprintf("SELECT numero_ligne,num_appareil, design_appareil
        FROM `inventaire`
        WHERE %s",
                $params
            );
    }

    //verif unicité num_serie
    if ($_POST['op'] == 'verif_unic_nums_serie' && !empty($_POST['nums_serie']) && !empty($_POST['nums_lgn'])) {
        $nums_lgn = explode(",", $_POST['nums_lgn']);
        $nums_serie = explode(",", $_POST['nums_serie']);
        $params = "";
        $taille = count($nums_lgn);

        for ($i = 0; $i < $taille; $i++) {
            if ($nums_serie[$i] != '') {
                if (!empty($params)) $params = $params . " OR ";
                {
                    $params = $params . " num_serie = '" . $nums_serie[$i] . "'";
                    if ($nums_lgn[$i] != 'null')
                        $params = $params . " AND numero_ligne != " . $nums_lgn[$i];
                }
            }

        }
        if (!empty($params))
            $req = sprintf("SELECT numero_ligne,num_serie, design_appareil
            FROM `inventaire` WHERE %s",
                $params);
    }


    //par num_bord
    if ($_POST['op'] == 'parNBord') {
        if (!empty($_POST['num_bord'])) {
            $req = sprintf("SELECT * FROM inventaire WHERE num_bord = %s ORDER BY poste, numero_ligne",
                $_POST['num_bord']);
        }
    }

    //par Num Appareil
    if ($_POST['op'] == 'parNumApp') {
        if (!empty($_POST['num_appareil'])) {
            $req = sprintf("SELECT * FROM inventaire
                        WHERE num_appareil = '%s'",
                $_POST['num_appareil']);

            if (isset($_POST['code_presence']))
                $req = sprintf("%s AND code_presence IN (%s)",
                    $req,
                    $_POST['code_presence']);

            $req .= " ORDER BY numero_ligne";
        }
    }

    //par Num Ligne
    if ($_POST['op'] == 'ParNumLgn') {
        if (!empty($_POST['numero_ligne'])) {
            $req = sprintf("SELECT * FROM inventaire
                        WHERE numero_ligne = %s
                        LIMIT 1",
                $_POST['numero_ligne']);
        }
    }

    //Recherche generique (RechercheInventaire)
    if ($_POST['op'] == 'Rech') {
        $params = '';
        $valeurs = json_decode($_POST['valeurs']);
        //mise en place des paramètres de la req
        foreach ($valeurs as $colonne => $valeur) {
            switch ($colonne) {
                case 'numero_ligne':
                    if ($valeur != '') $params = "numero_ligne = '$valeur'";
                    break;
                case 'code_siege':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "code_siege = '$valeur'";
                    }
                    break;
                case 'code_compte_analytique':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "code_compte_analytique = '$valeur'";
                    }
                    break;
                case 'code_compte_general':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "code_compte_general = '$valeur'";
                    }
                    break;
                case 'code_materiel':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "code_materiel LIKE '$valeur%'";
                    }
                    break;
                case 'gpe_appareil':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "gpe_appareil = '$valeur'";
                    }
                    break;
                case 'code_appareil':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "code_appareil = '$valeur'";
                    }
                    break;
                case 'rang_appareil':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "rang_appareil = '$valeur'";
                    }
                    break;
                case 'design_appareil':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "design_appareil LIKE '%$valeur%'";
                    }
                    break;
                case 'num_appareil':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "num_appareil = '$valeur'";
                    }
                    break;
                case 'num_serie':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "num_serie LIKE '%$valeur%'";
                    }
                    break;
                case 'date_mise_serv':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "date_mise_serv " . $valeurs->DMESop . " '$valeur'";
                    }
                    break;
                case 'date_mvt':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "date_mvt " . $valeurs->DMVTop . " '$valeur'";
                    }
                    break;
                case 'annee_acqui':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "annee_acqui " . $valeurs->AAop . " '$valeur'";
                    }
                    break;
                case 'code_presence':
                    if ($valeur != '') {
                        if (is_array($valeur)) {
                            if ($params != "") $params = $params . " AND ";
                            $param_cp = "";
                            foreach ($valeur as $valeur_tab) {
                                if ($param_cp != "") $param_cp = $param_cp . " OR ";
                                $param_cp .= "code_presence = '$valeur_tab'";
                            }
                            $params = $params . "(" . $param_cp . ") ";
                        }
                        else {
                            if ($params != "") $params = $params . " AND ";
                            $params .= "code_presence = '$valeur'";
                        }
                    }
                    break;
                case 'ammortissement':
                    if ($valeur != '') {
                        if (!is_array($valeur)) { //si array: on a demandé tout -> pas de filtrage
                            if ($params != "") $params = $params . " AND ";
                            if ($valeur == "1") {
                                $params .= "val_acqui - cumul_ammor = 0";
                            }
                            else {
                                $params .= "val_acqui - cumul_ammor != 0";
                            }
                        }
                    }
                    break;
                case 'num_cmd':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "num_cmd = '$valeur'";
                    }
                    break;
                case 'num_bord':
                    if ($valeur != '') {
                        if ($params != "") $params = $params . " AND ";
                        $params .= "num_bord LIKE '$valeur%'";
                    }
                    break;
                case 'code_entree':
                    if ($valeur != '') {
                        if (!is_array($valeur)) { //si array: on a demandé tout -> pas de filtrage
                            if ($params != "") $params = $params . " AND ";
                            $params .= "code_entree = '$valeur'";
                        }
                    }
                    break;
                case 'existant':
                    if ($valeur != '') {
                        if (is_array($valeur)) {
                            if ($params != "") $params = $params . " AND ";
                            $param_cp = "";
                            foreach ($valeur as $valeur_tab) {
                                if ($param_cp != "") $param_cp = $param_cp . " OR ";
                                $param_cp .= "existant = '$valeur_tab'";
                            }
                            $params = $params . "(" . $param_cp . ") ";
                        }
                        else {
                            if ($params != "") $params = $params . " AND ";
                            $params .= "existant = '$valeur'";
                        }
                    }
                    break;
            }
        }

        $req = "SELECT *
                        FROM inventaire
                        WHERE $params
                        ORDER BY numero_ligne";
    }
}

//Verif & exec
if (!empty($req)) {
    $result = $conn->query($req);
    //fait une boucle et crée un tableau avec des champs de requête
    if ($result)
        while ($inventaire = $result->fetch_assoc()) $inventaires[] = $inventaire;
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
    "success"     => $ok,
    "MySQLError"  => $conn->error,
    "errorMsg"    => "Lecture Table «inventaire»:&nbsp;" . $errorMsg,
    "reqs"        => $req,
    "inventaires" => $inventaires
));
