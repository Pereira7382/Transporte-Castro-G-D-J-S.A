-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2023 a las 08:11:34
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sistema_transporte`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos_combustible`
--

CREATE TABLE `gastos_combustible` (
  `id` int(11) NOT NULL,
  `numero_factura` varchar(100) NOT NULL,
  `monto` double NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `proveedor` int(11) NOT NULL,
  `kilometrajeAnterior` int(11) NOT NULL,
  `kilometrajeActual` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `litros` double NOT NULL,
  `estado` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_aceite`
--

CREATE TABLE `gasto_aceite` (
  `id` int(11) NOT NULL,
  `matricula` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kilometraje` int(11) NOT NULL,
  `km_proximo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` double NOT NULL,
  `proveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto_rodaje_llantas`
--

CREATE TABLE `gasto_rodaje_llantas` (
  `id` int(11) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `kilometrajeActual` int(11) NOT NULL,
  `km_proximo` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `monto` double NOT NULL,
  `proveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id` int(11) NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id`, `codigo`, `nombre`, `descripcion`, `id_proveedor`, `cantidad`, `tipo`, `activo`) VALUES
(1, 'pz1', 'llave', 'una llave', 1, 11, 'herramienta', 1),
(2, 'asas', 'actualizado', 'asasas', 2, 200, 'Inventario', 1),
(4, 'GTJ345', 'LLAVE', 'DFS', 3, 4, 'Herramienta', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento_inventario`
--

CREATE TABLE `movimiento_inventario` (
  `id` int(11) NOT NULL,
  `id_pieza` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `tipo_movimiento` varchar(30) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_movimiento` date NOT NULL,
  `estado` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `movimiento_inventario`
--

INSERT INTO `movimiento_inventario` (`id`, `id_pieza`, `descripcion`, `tipo_movimiento`, `cantidad`, `fecha_movimiento`, `estado`) VALUES
(1, 2, 'pruebas generales', 'Salida', 25, '2023-10-16', 1),
(2, 2, 'pruebas generales', 'Entrada', 50, '2023-10-23', 1),
(3, 2, 'refil de inventario', 'Entrada', 100, '2023-10-12', 1),
(4, 2, 'refil de inventario', 'Entrada', 100, '2023-10-24', 1),
(5, 2, 'refil de inventario', 'Entrada', 100, '2023-10-02', 1),
(6, 2, 'asasas', 'Salida', 121, '2023-10-16', 1),
(7, 2, 'salida', 'Salida', 50, '2023-10-10', 1),
(9, 2, 'asas', 'Entrada', 12, '2023-10-28', 0),
(10, 2, 'pruebas generales', 'Entrada', 100, '2023-10-19', 0),
(11, 2, 'ASASA', 'Entrada', 10, '2023-10-16', 0),
(13, 2, 'una actualizacion de inventario por entrada de piezas ', 'Entrada', 99, '2023-01-05', 0),
(14, 1, 'descargue', 'Salida', 15, '2023-10-25', 0),
(15, 1, 'nada', 'Entrada', 15, '2023-10-11', 0),
(16, 1, 'salida de piezas por mantenimiento mensual', 'Salida', 15, '2023-10-09', 0),
(17, 1, 'robo', 'Salida', 15, '2023-10-09', 0),
(18, 4, 'perdida de inventario', 'Salida', 10, '2023-10-09', 0),
(19, 4, 'relleno de inventario.', 'Entrada', 100, '2023-10-09', 0),
(20, 4, 'perdida de inventario', 'Entrada', 2, '2023-10-10', 0),
(21, 4, 'perdida', 'Salida', 2, '2023-10-10', 0),
(22, 4, 'aula', 'Entrada', 2, '2023-10-16', 0),
(23, 4, 'aula', 'Salida', 2, '2023-10-16', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `contacto` varchar(50) NOT NULL,
  `direccion` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id_proveedor`, `correo_electronico`, `telefono`, `estado`, `contacto`, `direccion`) VALUES
(1, 'actualizado', '70942307', 1, 'Jeffry actualizado actualizado', 'La victoria sarapiqui'),
(2, 'machadofernanda455@gmail.com', '72459827', 1, 'sdsd', 'sdf'),
(3, 'jefrry@gmail.com', '72459827', 1, 'ds', 'dsd'),
(4, 'pablo455@gmail.com', '72459827', 1, 'cv', 'dfd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_camion`
--

CREATE TABLE `tb_camion` (
  `id` int(11) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `anio` int(11) NOT NULL,
  `numero_bin` varchar(100) NOT NULL,
  `kilometraje` double NOT NULL,
  `tipo_camion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `tb_camion`
--

INSERT INTO `tb_camion` (`id`, `matricula`, `modelo`, `estado`, `anio`, `numero_bin`, `kilometraje`, `tipo_camion`) VALUES
(4, 'AAA002', 'Modelo002', 0, 2024, 'BIN-002', 1000, 'Tipo002'),
(5, 'AAA003', 'Modelo003', 0, 2025, 'BIN-003', 2000, 'Tipo003'),
(6, 'AAA004', 'Modelo004', 0, 2026, 'BIN-004', 3000, 'Tipo004'),
(7, 'AAA005', 'Modelo005', 0, 2027, 'BIN-005', 4000, 'Tipo005'),
(8, 'AAA006', 'Modelo006', 0, 2028, 'BIN-006', 5000, 'Tipo006'),
(10, 'AAA008', 'Modelo008', 0, 2030, 'BIN-008', 7000, 'Tipo008'),
(11, 'AAA009', 'Modelo009', 0, 2031, 'BIN-009', 8000, 'Tipo009'),
(12, 'AAA010', 'Modelo010', 0, 2032, 'BIN-010', 9000, 'Tipo010'),
(13, 'AAA011', 'Modelo011', 0, 2033, 'BIN-011', 10000, 'Tipo011'),
(15, 'AAA013', 'Modelo013', 0, 2035, 'BIN-013', 12000, 'Tipo013'),
(17, 'AAA015', 'Modelo015', 0, 2037, 'BIN-015', 14000, 'Tipo015'),
(18, 'AAA016', 'Modelo016', 0, 2038, 'BIN-016', 15000, 'Tipo016'),
(19, 'AAA017', 'Modelo017', 0, 2039, 'BIN-017', 16000, 'Tipo017'),
(20, 'AAA018', 'Modelo018', 0, 2040, 'BIN-018', 17000, 'Tipo018'),
(21, 'AAA019', 'Modelo019', 0, 2041, 'BIN-019', 18000, 'Tipo019'),
(22, 'AAA020', 'Modelo020', 0, 2042, 'BIN-020', 19000, 'Tipo020'),
(23, 'AAA021', 'Modelo021', 0, 2043, 'BIN-021', 20000, 'Tipo021'),
(25, 'AAA023', 'Modelo023', 0, 2045, 'BIN-023', 22000, 'Tipo023'),
(26, 'AAA024', 'Modelo024', 0, 2046, 'BIN-024', 23000, 'Tipo024'),
(27, 'AAA025', 'Modelo025', 0, 2047, 'BIN-025', 24000, 'Tipo025'),
(28, 'AAA026', 'Modelo026', 0, 2048, 'BIN-026', 25000, 'Tipo026'),
(29, 'AAA027', 'Modelo027', 0, 2049, 'BIN-027', 26000, 'Tipo027'),
(30, 'AAA028', 'Modelo028', 0, 2050, 'BIN-028', 27000, 'Tipo028'),
(31, 'AAA029', 'Modelo029', 0, 2051, 'BIN-029', 28000, 'Tipo029'),
(32, 'AAA030', 'Modelo030', 0, 2052, 'BIN-030', 29000, 'Tipo030'),
(33, 'AAA031', 'Modelo031', 0, 2053, 'BIN-031', 30000, 'Tipo031'),
(34, 'AAA032', 'Modelo032', 0, 2054, 'BIN-032', 31000, 'Tipo032'),
(35, 'AAA033', 'Modelo033', 0, 2055, 'BIN-033', 32000, 'Tipo033'),
(36, 'AAA034', 'Modelo034', 0, 2056, 'BIN-034', 33000, 'Tipo034'),
(37, 'AAA035', 'Modelo035', 0, 2057, 'BIN-035', 34000, 'Tipo035'),
(38, 'AAA036', 'Modelo036', 0, 2058, 'BIN-036', 35000, 'Tipo036'),
(39, 'AAA037', 'Modelo037', 0, 2059, 'BIN-037', 36000, 'Tipo037'),
(40, 'AAA038', 'Modelo038', 0, 2060, 'BIN-038', 37000, 'Tipo038'),
(41, 'AAA039', 'Modelo039', 0, 2061, 'BIN-039', 38000, 'Tipo039'),
(42, 'AAA040', 'Modelo040', 0, 2062, 'BIN-040', 39000, 'Tipo040'),
(43, 'AAA041', 'Modelo041', 0, 2063, 'BIN-041', 40000, 'Tipo041'),
(44, 'AAA042', 'Modelo042', 0, 2064, 'BIN-042', 41000, 'Tipo042'),
(45, 'AAA043', 'Modelo043', 0, 2065, 'BIN-043', 42000, 'Tipo043'),
(46, 'AAA044', 'Modelo044', 0, 2066, 'BIN-044', 43000, 'Tipo044'),
(47, 'AAA045', 'Modelo045', 0, 2067, 'BIN-045', 44000, 'Tipo045'),
(48, 'AAA046', 'Modelo046', 0, 2068, 'BIN-046', 45000, 'Tipo046'),
(49, 'AAA047', 'Modelo047', 0, 2069, 'BIN-047', 46000, 'Tipo047'),
(50, 'AAA048', 'Modelo048', 0, 2070, 'BIN-048', 47000, 'Tipo048'),
(51, 'AAA049', 'Modelo049', 0, 2071, 'BIN-049', 48000, 'Tipo049'),
(52, 'AAA050', 'Modelo050', 0, 2072, 'BIN-050', 49000, 'Tipo050'),
(53, 'AAA051', 'Modelo051', 0, 2073, 'BIN-051', 50000, 'Tipo051'),
(54, 'AAA052', 'Modelo052', 0, 2074, 'BIN-052', 51000, 'Tipo052'),
(55, 'AAA053', 'Modelo053', 0, 2075, 'BIN-053', 52000, 'Tipo053'),
(56, 'AAA054', 'Modelo054', 0, 2076, 'BIN-054', 53000, 'Tipo054'),
(57, 'AAA055', 'Modelo055', 0, 2077, 'BIN-055', 54000, 'Tipo055'),
(58, 'AAA056', 'Modelo056', 0, 2078, 'BIN-056', 55000, 'Tipo056'),
(59, 'AAA057', 'Modelo057', 0, 2079, 'BIN-057', 56000, 'Tipo057'),
(60, 'AAA058', 'Modelo058', 0, 2080, 'BIN-058', 57000, 'Tipo058'),
(61, 'AAA059', 'Modelo059', 0, 2081, 'BIN-059', 58000, 'Tipo059'),
(62, 'AAA060', 'Modelo060', 0, 2082, 'BIN-060', 59000, 'Tipo060'),
(63, 'AAA061', 'Modelo061', 0, 2083, 'BIN-061', 60000, 'Tipo061'),
(64, 'AAA062', 'Modelo062', 0, 2084, 'BIN-062', 61000, 'Tipo062'),
(65, 'AAA063', 'Modelo063', 0, 2085, 'BIN-063', 62000, 'Tipo063'),
(66, 'AAA064', 'Modelo064', 0, 2086, 'BIN-064', 63000, 'Tipo064'),
(67, 'AAA065', 'Modelo065', 0, 2087, 'BIN-065', 64000, 'Tipo065'),
(68, 'AAA066', 'Modelo066', 0, 2088, 'BIN-066', 65000, 'Tipo066'),
(69, 'AAA067', 'Modelo067', 0, 2089, 'BIN-067', 66000, 'Tipo067'),
(70, 'AAA068', 'Modelo068', 0, 2090, 'BIN-068', 67000, 'Tipo068'),
(71, 'AAA069', 'Modelo069', 0, 2091, 'BIN-069', 68000, 'Tipo069'),
(72, 'AAA070', 'Modelo070', 0, 2092, 'BIN-070', 69000, 'Tipo070'),
(73, 'AAA071', 'Modelo071', 0, 2093, 'BIN-071', 70000, 'Tipo071'),
(74, 'AAA072', 'Modelo072', 0, 2094, 'BIN-072', 71000, 'Tipo072'),
(75, 'AAA073', 'Modelo073', 0, 2095, 'BIN-073', 72000, 'Tipo073'),
(76, 'AAA074', 'Modelo074', 0, 2096, 'BIN-074', 73000, 'Tipo074'),
(77, 'AAA075', 'Modelo075', 0, 2097, 'BIN-075', 74000, 'Tipo075'),
(78, 'AAA076', 'Modelo076', 0, 2098, 'BIN-076', 75000, 'Tipo076'),
(79, 'AAA077', 'Modelo077', 0, 2099, 'BIN-077', 76000, 'Tipo077'),
(80, 'AAA078', 'Modelo078', 0, 2100, 'BIN-078', 77000, 'Tipo078'),
(81, 'AAA079', 'Modelo079', 0, 2101, 'BIN-079', 78000, 'Tipo079'),
(82, 'AAA080', 'Modelo080', 0, 2102, 'BIN-080', 79000, 'Tipo080'),
(83, 'AAA081', 'Modelo081', 0, 2103, 'BIN-081', 80000, 'Tipo081'),
(84, 'AAA082', 'Modelo082', 0, 2104, 'BIN-082', 81000, 'Tipo082'),
(85, 'AAA083', 'Modelo083', 0, 2105, 'BIN-083', 82000, 'Tipo083'),
(86, 'AAA084', 'Modelo084', 0, 2106, 'BIN-084', 83000, 'Tipo084'),
(87, 'AAA085', 'Modelo085', 0, 2107, 'BIN-085', 84000, 'Tipo085'),
(88, 'AAA086', 'Modelo086', 0, 2108, 'BIN-086', 85000, 'Tipo086'),
(89, 'AAA087', 'Modelo087', 0, 2109, 'BIN-087', 86000, 'Tipo087'),
(90, 'AAA088', 'Modelo088', 0, 2110, 'BIN-088', 87000, 'Tipo088'),
(91, 'AAA089', 'Modelo089', 0, 2111, 'BIN-089', 88000, 'Tipo089'),
(92, 'AAA090', 'Modelo090', 0, 2112, 'BIN-090', 89000, 'Tipo090'),
(93, 'AAA091', 'Modelo091', 0, 2113, 'BIN-091', 90000, 'Tipo091'),
(94, 'AAA092', 'Modelo092', 0, 2114, 'BIN-092', 91000, 'Tipo092'),
(95, 'AAA093', 'Modelo093', 0, 2115, 'BIN-093', 92000, 'Tipo093'),
(96, 'AAA094', 'Modelo094', 0, 2116, 'BIN-094', 93000, 'Tipo094'),
(97, 'AAA095', 'Modelo095', 0, 2117, 'BIN-095', 94000, 'Tipo095'),
(98, 'AAA096', 'Modelo096', 0, 2118, 'BIN-096', 95000, 'Tipo096'),
(99, 'AAA097', 'Modelo097', 0, 2119, 'BIN-097', 96000, 'Tipo097'),
(100, 'AAA098', 'Modelo098', 0, 2120, 'BIN-098', 97000, 'Tipo098'),
(101, 'AAA099', 'Modelo099', 0, 2121, 'BIN-099', 98000, 'Tipo099'),
(102, 'AAA100', 'Modelo100', 0, 2122, 'BIN-100', 99000, 'Tipo100'),
(104, 'registro', 'registro', 1, 2023, 'asbcsd', 1000, 'liviano'),
(105, 'kkkkkk', 'kkkkk', 1, 2023, 'aska12', 121212, 'pesado'),
(106, 'natalia', 'actualizado', 1, 3233, 'assasa', 121212, 'pesado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `contrasenia` varchar(250) NOT NULL,
  `estado` int(11) NOT NULL,
  `token_recuperacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `contrasenia`, `estado`, `token_recuperacion`) VALUES
(1, 'A00149043', '$2a$10$YdlpCTQ.MaCjXAHHe8B5pu13LgkipZvI6MJIrM02xBNn7ESiYNFFO', 0, ''),
(2, 'natalia', '$2a$10$JbW8o7CK8PMRjIq7ASmuPOLRRf4Y4PiPyMnWAsDICPs/TiYgB91Y.', 0, ''),
(3, 'bianca', '$2a$10$4IVBIobVUpWZ55sSgDfOh.HIoJI7avGsWrfxfaTFsPr2zn9HlVvJy', 0, ''),
(4, 'fernanda', '$2a$10$JPKwhr3eFqtiekOGk1VY8.T6w/rKAcyyF2ICYz7oVzYdsmsVFrFwi', 0, ''),
(5, 'pablo', '$2a$10$gBxUxH1UocArwzJhGcZPfuPa.qvbYx4uAN/TGyP9OF5/lvnw/OpkO', 0, ''),
(11, 'nuevo', '$2a$10$X.60YpZWPQDii4zB6Gyh2OUioRcKpoELk9CEm.GXdMInIDhBsHG62', 0, ''),
(12, 'Johan', '$2a$10$XKSYLgSTuWMcWaXTQQ6n/eZWpvjIUqalhoHQlajZ0wbfIzsTYODtK', 0, ''),
(13, 'usuario', '$2a$10$JlN8z3WbjhAVZ.JA.HIutu0G2TIYaYt9zXrDn8pFq84TVcIw4yd.G', 0, ''),
(14, 'registro', '$2a$10$WW6ckb4DvYiqy8A.XDrjgelZiyddIdBM8Mw9A4JoO2YOGhg9fuBNC', 0, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gastos_combustible`
--
ALTER TABLE `gastos_combustible`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idxProv` (`proveedor`),
  ADD KEY `fk_matricula` (`matricula`);

--
-- Indices de la tabla `gasto_aceite`
--
ALTER TABLE `gasto_aceite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idxProve` (`proveedor`);

--
-- Indices de la tabla `gasto_rodaje_llantas`
--
ALTER TABLE `gasto_rodaje_llantas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proveedor` (`proveedor`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `movimiento_inventario`
--
ALTER TABLE `movimiento_inventario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_inventario` (`id_pieza`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `tb_camion`
--
ALTER TABLE `tb_camion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gastos_combustible`
--
ALTER TABLE `gastos_combustible`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gasto_aceite`
--
ALTER TABLE `gasto_aceite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gasto_rodaje_llantas`
--
ALTER TABLE `gasto_rodaje_llantas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `movimiento_inventario`
--
ALTER TABLE `movimiento_inventario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_camion`
--
ALTER TABLE `tb_camion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `gastos_combustible`
--
ALTER TABLE `gastos_combustible`
  ADD CONSTRAINT `gastos_combustible_ibfk_1` FOREIGN KEY (`proveedor`) REFERENCES `proveedor` (`id_proveedor`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`);

--
-- Filtros para la tabla `movimiento_inventario`
--
ALTER TABLE `movimiento_inventario`
  ADD CONSTRAINT `movimiento_inventario_ibfk_1` FOREIGN KEY (`id_pieza`) REFERENCES `inventario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
