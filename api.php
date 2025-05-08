<?php
$archivo = 'datos.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  echo file_get_contents($archivo);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $entrada = json_decode(file_get_contents('php://input'), true);
  file_put_contents($archivo, json_encode($entrada, JSON_PRETTY_PRINT));
  echo json_encode(["mensaje" => "Datos guardados"]);
  exit;
}
?>
