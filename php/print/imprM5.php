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
$validee = false;
$num_bord = $_GET['num_bord'];
//lignes M5
$req = "SELECT * FROM inventaire
WHERE num_bord = '" . $num_bord . "'
ORDER BY poste, numero_ligne";
$result = $conn->query($req);
$req_bas_table = "SELECT COUNT(val_acqui) as nb,
SUM(val_acqui) as total
 FROM inventaire
 WHERE num_bord = '" . $num_bord . "'";
$result_bas_table = $conn->query($req_bas_table);
$bas_table = $result_bas_table->fetch_assoc();

//==============================================================
//=====================  HTML  =================================
//==============================================================
//*on lit la 1ere entrée pour avoir qq données de l'entete*/
$inv = $result->fetch_assoc();
//on vérifie si la source est validée
if (!empty($inv['id_ligne93'])) {
    $reqV = "SELECT etat FROM etat_93 WHERE id_ligne93 = '" . $inv['id_ligne93'] . "'";
    $resV = $conn->query($reqV);
    $resultValidee = $resV->fetch_array()[0];
    $validee = ($resultValidee == '4') || ($resultValidee == '5');
}

$html = '
<table style="width: 100%; border-spacing:0;" border="0">
    <tr valign="middle">
        <td width="34" align="center" >
            <img src="../../resources/images/logo_1.png" alt="" width="42" height="42">
        </td>
        <td class="Titre" >BORDEREAU DES ENTREES NOUVELLES<br/>N° ' . $num_bord . '</td>
        <td width="34" align="center">Année 20' . substr($num_bord, 0, 2) . '</td> <!-- année comptable du bord ;) -->
    </tr>
    <tr valign="middle">
        <td colspan = "3" style="font-size:10px;">
            Code Document : M5
            &nbsp;&nbsp;&nbsp;
            Code Entrée : ' . $inv['code_entree'] . '
        </td>
    </tr>
</table>';
$html .= '
<style>
.TitreCol {
    background-color: #edefed;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
}
.DonneesTab {
    font-size: 12px;
    text-align: center;
}
</style>
<div class="LibZT">Commande N°:' . $inv['num_cmd'] . '</div>

<table style="width: 100%; border-spacing:0;border-collapse:collapse;" border="1">
    <thead>
        <tr>
            <th class="TitreCol" rowspan="2" height="25px" width="70px">N°Ligne</th>
            <th class="TitreCol" colspan="7" >Codification du Matériel</th>
            <th class="TitreCol" rowspan="2" width="300px">Désignation</th>
            <th class="TitreCol" rowspan="2" width="70px">N°</th>
            <th class="TitreCol" rowspan="2" width="60px">Mise En Srv</th>
            <th class="TitreCol" rowspan="2" width="60px">Ann.Entrée</th>
            <th class="TitreCol" rowspan="2" width="105px">Valeur</th>
        </tr>
        <tr>
            <th class="TitreCol" height="25px" width="25px">S</th>
            <th class="TitreCol" width="50px">Compte</th>
            <th class="TitreCol" width="50px">S.Analy</th>
            <th class="TitreCol" width="50px">Matériel</th>
            <th class="TitreCol" width="15px">G.App</th>
            <th class="TitreCol" width="15px">App</th>
            <th class="TitreCol" width="15px">R</th>
        </tr>
    </thead>';
$poste = 0;
do { //1ere entree déjà lue (num_cmd)
    if ($inv['poste'] != $poste) {//on imprime le n° de poste
        $html .= '
    <tr style="vertical-align: top; page-break-inside:avoid;">
        <td class="DonneesTab" colspan="13" style="text-align: left;text-decoration: underline">Poste ' . $inv['poste'] . ' :</td>
    </tr>';
        $poste++;
    }
    $html .= '
    <tr style="vertical-align: top; page-break-inside:avoid;">
        <td class="DonneesTab">' . $inv['numero_ligne'] . '</td>
        <td class="DonneesTab">' . $inv['code_siege'] . '</td>
        <td class="DonneesTab">' . $inv['code_compte_general'] . '</td>
        <td class="DonneesTab">' . $inv['code_compte_analytique'] . '</td>
        <td class="DonneesTab">' . $inv['code_materiel'] . '</td>
        <td class="DonneesTab">' . $inv['gpe_appareil'] . '</td>
        <td class="DonneesTab">' . $inv['code_appareil'] . '</td>
        <td class="DonneesTab">' . $inv['rang_appareil'] . '</td>
        <td class="DonneesTab" style="text-align: left">' . $inv['design_appareil'] . '</td>
        <td class="DonneesTab">' . $inv['num_appareil'] . '</td>
        <td class="DonneesTab">' . date("m-Y", strtotime($inv['date_mise_serv'])) . '</td>
        <td class="DonneesTab">' . $inv['annee_acqui'] . '</td>
        <td class="DonneesTab">' . number_format($inv['val_acqui'], 0, ',', ' ') . '</td>
    </tr>';
} while ($inv = $result->fetch_assoc());
//bas de table
$html .= '
<tfoot>
    <tr>
        <td class="SummaryCol" colspan="11" height="25px">Nombre de lignes : ' . $bas_table['nb'] . '</td>
        <td class="SummaryCol" colspan="2" height="25px">Total : ' . number_format($bas_table['total'], 0, ',', ' ') . '</td>
    </tr>
</tfoot>';
$html .= '
</table>';

$html .= '
<br/>
<style>
    .center-bottom{
        width: 14cm;
        position: fixed ;
        left: 7cm;
        bottom: 25px;
    }
</style>
<div class="center-bottom">
<table class="center-bottom" style="width: 100%; border-spacing:0; background-color: #F3F3F3; page-break-inside:avoid" border="1">
    <tr>
        <td style="height: 30px; width: 50%; text-align:center">AGENT</td>
        <td style="text-align:center">CHEF DE SERVICE</td>
    </tr>
    <tr>
        <td style="height: 55px; text-align:left">

            Signature: ...........
        </td>
        <td style="text-align:left">

            Signature: ..........
        </td>
    </tr>
</table>
</div>';

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

$mpdf->SetWatermarkText('Non Validée');
$mpdf->showWatermarkText = !$validee;

$stylesheet = file_get_contents('ImpressionPDF.css');
$mpdf->WriteHTML($stylesheet, 1); // The parameter 1 tells that this is css/style only and no body/html/text
$mpdf->SetDisplayMode('fullpage');
//$mpdf->setHeader($header);
$mpdf->setFooter($footer);

$mpdf->WriteHTML($html);

$mpdf->Output('M5_' . $_GET['num_bord'] . '.pdf', 'I');
//$mpdf->Output('M5_'.$_GET['num_bord'].'.pdf', 'D');

exit;

//==============================================================
//==============================================================
//==============================================================
