<?php
require_once '../modelos/conexion.php';

class Usuario extends Conexion
{
    public $nombreGithub;
    public $telefono;
    public $correo;

    public function __construct($args = [])
    {
        $this->nombreGithub = $args['nombreGithub'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->correo = $args['correo'] ?? '';
    }

    public function guardar()
    {
        $sql = "INSERT INTO usuarios (nombre_github, telefono, correo_electronico) VALUES (:nombreGithub, :telefono, :correo)";
        $params = [
            ':nombreGithub' => $this->nombreGithub,
            ':telefono' => $this->telefono,
            ':correo' => $this->correo
        ];
        $resultado = self::ejecutar($sql, $params);
        return $resultado;
    }

    public function buscar()
    {
        $sql = "SELECT * FROM usuarios WHERE nombre_github LIKE :nombreGithub";
        $params = [
            ':nombreGithub' => '%' . $this->nombreGithub . '%'
        ];
        $resultado = self::servir($sql, $params);
        return $resultado;
    }

   

   
}
?>
