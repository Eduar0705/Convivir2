-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 06-06-2025 a las 14:04:47
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `convivir`
--
CREATE DATABASE IF NOT EXISTS `convivir` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `convivir`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

DROP TABLE IF EXISTS `cargo`;
CREATE TABLE `cargo` (
  `id_cargo` int NOT NULL,
  `Catergoria` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`id_cargo`, `Catergoria`) VALUES
(1, 'Administrador'),
(2, 'Residente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inf_usuarios`
--

DROP TABLE IF EXISTS `inf_usuarios`;
CREATE TABLE `inf_usuarios` (
  `id` int NOT NULL,
  `nombre_apellido` varchar(100) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `edificio` varchar(50) NOT NULL,
  `apartamento` varchar(50) NOT NULL,
  `id_cargo` int NOT NULL,
  `fecha` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `inf_usuarios`
--

INSERT INTO `inf_usuarios` (`id`, `nombre_apellido`, `usuario`, `clave`, `email`, `telefono`, `cedula`, `edificio`, `apartamento`, `id_cargo`, `fecha`) VALUES
(1, 'Eduar Suarez', 'EduarSG', '123456789', 'eduar@gmail.com', '04145003573', '31466704', 'A', '45', 1, '18/05/2025'),
(7, 'Luis Hernandez', 'LuisH', '123456789', 'luis@gmail.com', '04145013573', '31258741', 'A', '43', 2, '14/05/2025'),
(35, 'eduarjose', 'eduarjose', '123456789', 'eduarjose@gmail.com', '04145621478', '36549987', 'D', '7', 2, '5/6/2025');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id_cargo`),
  ADD KEY `Catergoria` (`Catergoria`);

--
-- Indices de la tabla `inf_usuarios`
--
ALTER TABLE `inf_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cargo` (`id_cargo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id_cargo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inf_usuarios`
--
ALTER TABLE `inf_usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inf_usuarios`
--
ALTER TABLE `inf_usuarios`
  ADD CONSTRAINT `inf_usuarios_ibfk_1` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`id_cargo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
