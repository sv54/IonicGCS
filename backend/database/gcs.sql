-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2023 at 06:50 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gcs`
--

-- --------------------------------------------------------

--
-- Table structure for table `medicamentos`
--

CREATE TABLE `medicamentos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(32) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `VecesDia` varchar(11) NOT NULL,
  `Detalles` text NOT NULL,
  `fk_paciente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `medicos`
--

CREATE TABLE `medicos` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(32) NOT NULL,
  `Email` varchar(32) NOT NULL,
  `DNI` varchar(32) NOT NULL,
  `FechaNac` date NOT NULL,
  `Password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicos`
--

INSERT INTO `medicos` (`Id`, `Nombre`, `Email`, `DNI`, `FechaNac`, `Password`) VALUES
(5, 'John Smith', 'johnsmith@example.com', '12345678A', '1990-01-01', 'password123'),
(6, 'Jane Doe', 'janedoe@example.com', '23456789B', '1985-05-12', 'secret123'),
(7, 'Alice Johnson', 'alicejohnson@example.com', '34567890C', '1995-12-31', 'mypassword'),
(8, 'Bob Brown', 'bobbrown@example.com', '45678901D', '1978-06-15', 'password321');

-- --------------------------------------------------------

--
-- Table structure for table `mensajes`
--

CREATE TABLE `mensajes` (
  `Id` int(11) NOT NULL,
  `fk_medico` int(11) NOT NULL,
  `fk_paciente` int(11) NOT NULL,
  `Mensaje` text NOT NULL,
  `FechaHora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO mensajes (Id, fk_medico, fk_paciente, Mensaje, FechaHora) VALUES (1, 5, 1, 'Hola, ¿cómo te sientes?', '2023-06-01 10:30:00');
INSERT INTO mensajes (Id, fk_medico, fk_paciente, Mensaje, FechaHora) VALUES (2, 5, 2, 'Recuerda tomar el medicamento a diario.', '2023-06-02 15:45:00');
INSERT INTO mensajes (Id, fk_medico, fk_paciente, Mensaje, FechaHora) VALUES (3, 5, 1, '¿Cómo ha sido tu progreso?', '2023-06-03 09:15:00');
INSERT INTO mensajes (Id, fk_medico, fk_paciente, Mensaje, FechaHora) VALUES (4, 6, 4, 'Recuerda programar tu próxima cita.', '2023-06-04 11:30:00');
INSERT INTO mensajes (Id, fk_medico, fk_paciente, Mensaje, FechaHora) VALUES (5, 7, 7, 'Estoy revisando tus análisis.', '2023-06-04 16:20:00');


-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
--

CREATE TABLE `notificaciones` (
  `Id` int(11) NOT NULL,
  `fk_medico` int(11) NOT NULL,
  `fk_mensaje` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
--

CREATE TABLE `pacientes` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(32) NOT NULL,
  `Email` varchar(32) NOT NULL,
  `DNI` varchar(32) NOT NULL,
  `FechaNac` date NOT NULL,
  `Password` varchar(32) NOT NULL,
  `fk_medico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO pacientes (Id, Nombre, Email, DNI, FechaNac, Password, fk_medico) VALUES (1, 'Juan Pérez', 'juan@example.com', '12345678A', '1990-01-01', 'laContraseña', 5);
INSERT INTO pacientes (Id, Nombre, Email, DNI, FechaNac, Password, fk_medico)VALUES (2, 'María López', 'maria@example.com', '98765432B', '1985-05-10', 'miContraseña', 5);
INSERT INTO pacientes (Id, Nombre, Email, DNI, FechaNac, Password, fk_medico) VALUES (3, 'Pedro Gómez', 'pedro@example.com', '54321678C', '1995-09-15', 'otraContraseña', 5);
INSERT INTO pacientes (Id, Nombre, Email, DNI, FechaNac, Password, fk_medico) VALUES (4, 'Ana García', 'ana@example.com', '87654321D', '1992-07-20', 'miOtraContraseña', 6);
INSERT INTO pacientes (Id, Nombre, Email, DNI, FechaNac, Password, fk_medico) VALUES (5, 'Carlos Rodríguez', 'carlos@example.com', '56781234E', '1988-04-05', 'miUltimaContraseña', 6);
INSERT INTO pacientes (Id, Nombre, Email, DNI, FechaNac, Password, fk_medico) VALUES (6, 'Laura Martínez', 'laura@example.com', '43218765F', '1993-11-12', 'miOtraUltimaContraseña', 5);
INSERT INTO pacientes (Id, Nombre, Email, DNI, FechaNac, Password, fk_medico) VALUES (7, 'Roberto Sánchez', 'roberto@example.com', '87654321G', '1990-08-25', 'laUltimaContraseña', 7);
INSERT INTO pacientes (Id, Nombre, Email, DNI, FechaNac, Password, fk_medico) VALUES (8, 'SofíaFernández', 'sofia@example.com', '76543218H', '1987-03-15', 'miContraseñaSegura', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_medicamentos_pacientes` (`fk_paciente`);

--
-- Indexes for table `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_mensajes_medicos` (`fk_medico`),
  ADD KEY `fk_mensajes_pacientes` (`fk_paciente`);

--
-- Indexes for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_notificaciones_medicos` (`fk_medico`),
  ADD KEY `fk_notificaciones_mensajes` (`fk_mensaje`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `fk_pacientes_medicos` (`fk_medico`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medicos`
--
ALTER TABLE `medicos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD CONSTRAINT `fk_medicamentos_pacientes` FOREIGN KEY (`fk_paciente`) REFERENCES `pacientes` (`Id`);

--
-- Constraints for table `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `fk_mensajes_medicos` FOREIGN KEY (`fk_medico`) REFERENCES `medicos` (`Id`),
  ADD CONSTRAINT `fk_mensajes_pacientes` FOREIGN KEY (`fk_paciente`) REFERENCES `pacientes` (`Id`);

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_notificaciones_medicos` FOREIGN KEY (`fk_medico`) REFERENCES `medicos` (`Id`),
  ADD CONSTRAINT `fk_notificaciones_mensajes` FOREIGN KEY (`fk_mensaje`) REFERENCES `mensajes` (`Id`);

--
-- Constraints for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `fk_pacientes_medicos` FOREIGN KEY (`fk_medico`) REFERENCES `medicos` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
