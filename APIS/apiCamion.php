<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);

if (isset($_GET["accion"]) && $_GET["accion"] == "agregar") {
    $matricula = $data["matricula"];
    $modelo = $data["modelo"];
    $estado = $data["estado"];
    $anio = $data["anio"];
    $numero_bin = $data["numero_bin"]; // Corregido: Cambiado de $numero_bin a $numeroBin
    $kilometraje = $data["kilometraje"];
    $tipo_camion = $data["tipo_camion"];

    $camion = array(
        'matricula' => $matricula,
        'modelo' => $modelo,
        'estado' => $estado,
        'anio' => $anio,
        'numero_bin' => $numero_bin,
        'kilometraje' => $kilometraje,
        'tipo_camion' => $tipo_camion
    );

    $data_camion = json_encode($camion);

    $curl = curl_init('http://localhost:8080/camion');
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data_camion);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_camion)
    ));

    $res = curl_exec($curl);
    if ($res === false) {
        echo 'Error de cURL: ' . curl_error($curl);
    } else {
        echo $res;
    }
    curl_close($curl);
}
?>
