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
    $numeroBin = $data["numero_bin"];
    $kilometraje = $data["kilometraje"];
    $tipoCamion = $data["tipo_camion"];

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
    echo $res;
    curl_close($curl);
}

if (isset($_GET["accion"]) && $_GET["accion"] == "listar") {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "http://localhost:8080/camion");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($curl);
    
    if (curl_error($curl)) {
        echo curl_error($curl);
    }
    
    curl_close($curl);

    $camion = json_decode($response, true);

    $responseModified = json_encode($camion);
    
    echo $responseModified; 
}