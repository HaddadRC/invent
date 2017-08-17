<?php
/****************************************
 *
 *
 *
 ****************************************/

require_once "variables.inc";
require_once $libPath;

//==============================================================
//=====================  Données ===============================
//==============================================================
$tri = "";
if (isset($_GET['s'])) {
    next($_GET); //sauter s=1
    $tri = " ORDER BY " . key($_GET) . " " . current($_GET);
    next($_GET);
}
$valeurs = json_decode($_GET['valeurs']);
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

//Si destination TXT
if (isset($_GET['d']) && $_GET['d'] == 't') {
    header("Content-type: text/plain");
    header("Content-Disposition: attachment; filename=invent.txt");
    $TXT = "";

    $req = "SELECT LPAD(i.code_siege, 2, '0'),
	LPAD(i.code_compte_general, 5, '0'),
	RIGHT(i.code_compte_analytique, 4),
	LPAD(code_materiel, 5, '0'),
	LPAD(gpe_appareil, 2, '0'),
	LPAD(code_appareil, 2, '0'),
	LPAD(rang_appareil, 1, '0'),
	RPAD(LEFT(design_appareil,35), 35, ' '),
	RPAD(COALESCE(num_appareil,''), 5, ' '),
	DATE_FORMAT(date_mise_serv, '%m%Y'),
	RPAD(annee_acqui, 4, ' '),
	'0001', -- qte
	LPAD(val_acqui, 11, '0'),
	LPAD(numero_ligne, 7, '0') AS numero_ligne,
	i.code_presence,
	LPAD(cumul_ammor, 11, '0'), -- cum ammort
	IFNULL(LPAD(code_entree, 2, '0'),'  '), -- cod-orig
	IFNULL(DATE_FORMAT(date_mvt, '%Y%m'),'      '),
	i.code_presence,
	'  ',
	RPAD(LEFT(REPLACE(compl_design_appareil,'\n', ' '), 35), 35, ' '),
	RPAD(CONCAT('CDE-',COALESCE(i.num_cmd,'SC')), 30, ' '),
    IFNULL(RPAD(RIGHT(i.num_bord,5), 5, ''),'     ')
FROM inventaire i
WHERE $params $tri";

    $result = $conn->query($req);
    if (!$result)
        error_report($resFichLogExport, "Erreur lors de la lecture de la table inventaire :$conn->error\n");

//    print $req."\r\n";
    while ($ligne = $result->fetch_row()) {
        $ligne = iconv("UTF-8", "Windows-1252", implode('', $ligne) . "\r\n");
        print $ligne;
    }
    exit;
}

$req = "SELECT *
FROM inventaire
WHERE $params $tri";

$result = $conn->query($req);

$reqTotaux = "SELECT SUM(val_acqui) AS total,COUNT(*) AS nb
FROM inventaire
WHERE $params";
$resultTotaux = $conn->query($reqTotaux);
$bas_table = $resultTotaux->fetch_assoc();

//==============================================================
//=====================  HTML  =================================
//==============================================================
$html = '
<table style="width: 100%; border-spacing:0;" border="0">
    <tr valign="middle">
        <td width="34" align="center" >
            <img src="../../resources/images/logo_1.png" alt="" width="42" height="42">
        </td>
        <td class="Titre" >Inventaire</td>
    </tr>
</table>
<br/>';
$html .= '
<style>
.TitreCol {
    background-color: #edefed;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
}
</style>

<table style="width: 100%; border-spacing:0;border-collapse:collapse;" border="1">
    <thead>
        <tr>
            <th class="TitreCol" rowspan="2" height="25px" width="70px">N°Ligne</th>
            <th class="TitreCol" colspan="4" >Codification du Matériel</th>
            <th class="TitreCol" rowspan="2">Désignation</th>
            <th class="TitreCol" rowspan="2" width="70px">N°</th>
            <th class="TitreCol" rowspan="2" width="60px">Mise En Srv</th>
            <th class="TitreCol" rowspan="2" width="50px">Ann. Acqui</th>
            <th class="TitreCol" rowspan="2" width="60px">Etat</th>
            <th class="TitreCol" rowspan="2" width="75px">N°Commande</th>
            <th class="TitreCol" rowspan="2" width="105px">Valeur</th>
        </tr>
        <tr>
            <th class="TitreCol" height="25px" width="25px">S</th>
            <th class="TitreCol" width="50px">Compte</th>
            <th class="TitreCol" width="50px">S.Analy</th>
            <th class="TitreCol" width="50px">Matériel</th>
            <!-- <th class="TitreCol" width="15px">G.App</th>
            <th class="TitreCol" width="15px">App</th>
            <th class="TitreCol" width="15px">R</th> -->
        </tr>
    </thead>';
$poste = 0;
while ($inv = $result->fetch_assoc()) {
    $html .= '
    <tr style="vertical-align: top; page-break-inside:avoid;">
        <td class="DonneesTab">' . $inv['numero_ligne'] . '</td>
        <td class="DonneesTab">' . $inv['code_siege'] . '</td>
        <td class="DonneesTab">' . $inv['code_compte_general'] . '</td>
        <td class="DonneesTab">' . $inv['code_compte_analytique'] . '</td>
        <td class="DonneesTab">' . $inv['code_materiel'] . '</td>
        <td class="DonneesTab" style="text-align: left">' . $inv['design_appareil'] . '</td>
        <td class="DonneesTab">' . $inv['num_appareil'] . '</td>
        <td class="DonneesTab">' . date("m-Y", strtotime($inv['date_mise_serv'])) . '</td>
        <td class="DonneesTab">' . $inv['annee_acqui'] . '</td>
        <td class="DonneesTab">';
    switch ($inv['code_presence']) {
        case 0:
            $html .= 'Actif';
            break;
        case 1:
            $html .= 'Réforme';
            break;
        case 2:
            $html .= 'Vente';
            break;
        case 3:
            $html .= 'Perte';
            break;
        case 5:
            $html .= 'Entrée';
            break;
    }
    $html .= '</td>
        <td class="DonneesTab">' . $inv['num_cmd'] . '</td>
        <td class="DonneesTab">' . number_format($inv['val_acqui'], 0, ',', ' ') . '</td>
    </tr>';
}
//bas de table
$html .= '
<tfoot>
    <tr>
        <td class="SummaryCol" colspan="10" height="25px">Nombre de lignes : ' . $bas_table['nb'] . '</td>
        <td class="SummaryCol" colspan="2" height="25px">Total : ' . number_format($bas_table['total'], 0, ',', ' ') . '</td>
    </tr>
</tfoot>';
$html .= '
</table>';

//==============================================================
//=====================  création PDF  =========================
//==============================================================
$mpdf = new mPDF('', // mode - default ''
    '', // format - A4, for example, default ''
    0, // font size - default 0
    '', // default font family
    5, // margin_left
    5, // margin right
    5, // margin top
    10, // margin bottom
    5, // margin header
    5, // margin footer
    'L'); // L - landscape, P - portrait

$mpdf->setProtection($protection);
$mpdf->AddPageByArray(array('orientation' => 'L')); //ajouté due un bug (ne prend pas le 'L' ds la declaration)

$stylesheet = file_get_contents('ImpressionPDF.css');
$mpdf->WriteHTML($stylesheet, 1); // The parameter 1 tells that this is css/style only and no body/html/text
$mpdf->SetDisplayMode('fullpage');
//$mpdf->setHeader($header);
$mpdf->setFooter($footer);

$mpdf->WriteHTML($html);

$mpdf->Output('Inventaire.pdf', 'I');

exit;

//==============================================================
//==============================================================
//==============================================================
