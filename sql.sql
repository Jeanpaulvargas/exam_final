create database final_vargas


CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_github VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL
);