<?php
/****************************************
 *
 *
 *
 ****************************************/
$serv = "127.0.0.1";
$user = "invent";
$pass = "invent";
$dbInvent = "invent";

$conn = new mysqli($serv, $user, $pass, $dbInvent);
if ($conn->connect_errno) {
    die("Echec de la connexion : " . $conn->connect_error);
}
$conn->set_charset("utf8");