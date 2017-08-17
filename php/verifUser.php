<?php
/****************************************
 *
 *
 *
 ****************************************/
require_once("connect.inc");

$success = false;
$profil = '';
$msg = '';
$login = '';
$pass = '';
if (isset($_POST['login'])) $login = $conn->real_escape_string($_POST['login']);
if (isset($_POST['pass'])) $pass = $conn->real_escape_string($_POST['pass']);

//requête SQL
$req = sprintf("SELECT * FROM utilisateur WHERE matricule='%s'",
    $conn->real_escape_string($login));

$result = $conn->query($req);
if ($result) {
    if ($result->num_rows == 0) {
        //Utilisateur non trouvé
        $success = false;
        $profil = '';
        $msg = "Pas d'utilsateur avec ce matricule!";
    }
    else {
        $utilisateur = $result->fetch_assoc();
        //verif MDP
        if (!password_verify($pass, $utilisateur['pass'])) {
            $success = false;
            $profil = '';
            $msg = 'Mot de passe incorrect!';
        }
        else {
            $success = true;
            $profil = $utilisateur['profil'];
            $msg = 'Acces authorise';
        }
    }

//encodage pour format JSON
    echo json_encode(array(
        "success" => $success,
        "profil"  => $profil,
        "msg"     => $msg
    ));
}
else
    echo json_encode(array(
        "success" => false,
        "profil"  => '',
        "msg"     => "Erreur lors de l'exec de la requete"
    ));


