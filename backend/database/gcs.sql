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
CREATE DATABASE IF NOT EXISTS gcs;
USE gcs;

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
  `Remitente` TINYINT(1),
  `Mensaje` text NOT NULL,
  `FechaHora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `mensajes` (`Id`, `fk_medico`, `fk_paciente`, `Remitente`, `Mensaje`, `FechaHora`) VALUES
(1, 5, 1, 1, 'Hola, ¿cómo te sientes?', '2023-06-01 10:30:00'),
(2, 5, 2, 1, 'Recuerda tomar el medicamento a diario.', '2023-06-02 15:45:00'),
(3, 5, 1, 1, '¿Cómo ha sido tu progreso?', '2023-06-03 09:15:00'),
(4, 6, 4, 1, 'Recuerda programar tu próxima cita.', '2023-06-04 11:30:00'),
(5, 7, 7, 1, 'Estoy revisando tus análisis.', '2023-06-04 16:20:00'),
(10, 5, 9, 1, 'Hola, ¿cómo te encuentras?', NOW()),
(11, 5, 9, 0, 'Hola, estoy bien, gracias.', NOW()),
(12, 5, 9, 1, 'Me alegra escuchar eso. ¿Necesitas algo?', NOW()),
(13, 5, 9, 0, 'No, por ahora estoy bien. Gracias por preguntar.', NOW()),
(14, 5, 9, 1, 'Si tienes alguna pregunta o necesitas ayuda, no dudes en decírmelo.', NOW()),
(15, 5, 9, 0, 'Lo tendré en cuenta. Gracias.', NOW()),
(16, 5, 9, 1, 'Recuerda tomar tus medicamentos según lo indicado.', NOW()),
(17, 5, 9, 0, 'Sí, no lo olvidaré. Gracias por recordármelo.', NOW()),
(18, 5, 9, 1, 'Si tienes alguna preocupación o síntoma nuevo, avísame de inmediato.', NOW()),
(19, 5, 9, 0, 'Está bien, lo tendré en cuenta. Gracias por tu atención.', NOW()),
(20, 5, 9, 1, 'Nos vemos en la próxima cita. Cuídate.', NOW()),
(21, 5, 10, 1, 'Hola, ¿cómo estás?', NOW()),
(22, 5, 10, 0, 'Hola, bien. Gracias.', NOW()),
(23, 5, 10, 1, '¿Hay algo en lo que pueda ayudarte?', NOW()),
(24, 5, 10, 0, 'No, por ahora todo está bien.', NOW()),
(25, 5, 10, 1, 'Si necesitas algo o tienes alguna pregunta, no dudes en decírmelo.', NOW()),
(26, 5, 10, 0, 'Gracias, lo tendré en cuenta.', NOW()),
(27, 5, 10, 1, 'Recuerda tomar tus medicamentos según lo indicado.', NOW()),
(28, 5, 10, 0, 'Sí, lo recordaré. Gracias por tu atención.', NOW()),
(29, 5, 10, 1, 'Si experimentas algún síntoma nuevo o tienes alguna inquietud, házmelo saber.', NOW()),
(30, 5, 10, 0, 'Está bien, lo tendré presente. Hasta la próxima.', NOW()),
(31, 5, 11, 1, 'Hola, cómo te sientes hoy?', NOW()),
(32, 5, 11, 0, 'Hola, me siento un poco cansado.', NOW()),
(33, 5, 11, 1, 'Entiendo, asegúrate de descansar lo suficiente.', NOW()),
(34, 5, 11, 0, 'Sí, lo tendré en cuenta.', NOW()),
(35, 6, 12, 1, 'Buenos días, ¿cómo amaneciste?', NOW()),
(36, 6, 12, 0, 'Buenos días, estoy bien, gracias.', NOW()),
(37, 6, 12, 1, 'Me alegra escuchar eso. ¿Necesitas algo hoy?', NOW()),
(38, 6, 12, 0, 'No, por ahora estoy bien. Gracias.', NOW()),
(39, 6, 13, 1, 'Hola, ¿cómo ha sido tu día?', NOW()),
(40, 6, 13, 0, 'Hola, ha sido un día tranquilo.', NOW()),
(41, 6, 13, 1, 'Si necesitas algo o tienes alguna pregunta, no dudes en decírmelo.', NOW()),
(42, 6, 13, 0, 'Gracias, lo tendré en cuenta.', NOW()),
(43, 7, 14, 1, 'Hola, ¿cómo te encuentras hoy?', NOW()),
(44, 7, 14, 0, 'Hola, me siento mejor que ayer.', NOW()),
(45, 7, 14, 1, 'Me alegra escuchar eso. Recuerda tomar tus medicamentos.', NOW()),
(46, 7, 14, 0, 'Sí, no lo olvidaré. Gracias por recordármelo.', NOW()),
(47, 7, 15, 1, 'Buenas tardes, ¿cómo te ha ido el día?', NOW()),
(48, 7, 15, 0, 'Buenas tardes, ha sido un día ocupado.', NOW()),
(49, 7, 15, 1, 'Si tienes alguna preocupación o síntoma nuevo, avísame de inmediato.', NOW()),
(50, 7, 15, 0, 'Está bien, lo tendré en cuenta. Gracias por tu atención.', NOW()),
(51, 5, 13, 1, 'Buenos días, ¿cómo te encuentras hoy?', NOW()),
(52, 5, 13, 0, 'Hola, me he sentido un poco mareado en los últimos días.', NOW()),
(53, 5, 14, 1, 'Hola, ¿has tenido alguna mejora en tus síntomas?', NOW()),
(54, 5, 14, 0, 'No, mis síntomas siguen iguales. ¿Hay algo más que pueda hacer?', NOW()),
(55, 5, 15, 1, 'Hola, ¿cómo te ha ido con tu rutina de ejercicios?', NOW()),
(56, 5, 15, 0, 'He estado haciendo los ejercicios que me recomendaste, me siento mejor.', NOW()),
(57, 5, 16, 1, 'Buenos días, ¿has notado algún cambio en tu dieta?', NOW()),
(58, 5, 16, 0, 'Sí, he estado siguiendo las recomendaciones y me siento más saludable.', NOW()),
(59, 5, 17, 1, 'Hola, ¿cómo ha sido tu calidad de sueño?', NOW()),
(60, 5, 17, 0, 'Mi calidad de sueño ha mejorado, gracias a tus consejos.', NOW()),
(61, 5, 1, 1, 'Estimado paciente, espero que este mensaje le encuentre bien. Me gustaría brindarle información detallada sobre su condición de salud y el tratamiento recomendado. Según los resultados de sus exámenes médicos, hemos identificado algunos aspectos que requieren atención. Es importante seguir las indicaciones y pautas que le proporcionaremos para lograr una mejoría en su estado de salud. Recuerde tomar los medicamentos prescritos de acuerdo a las indicaciones y realizar las consultas de seguimiento programadas. Si tiene alguna pregunta o inquietud, no dude en comunicarse con nosotros. Estamos aquí para brindarle el apoyo necesario en su proceso de recuperación. Atentamente, Dr. Jogn Smith.', NOW());


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

INSERT INTO `pacientes` (`Id`, `Nombre`, `Email`, `DNI`, `FechaNac`, `Password`, `fk_medico`) VALUES
(1, 'David Martinez', 'david@example.com', '65456321T', '1990-01-01', 'laContraseña', 5),
(2, 'María López', 'maria@example.com', '98765432B', '1985-05-10', 'miContraseña', 5),
(3, 'Pedro Gómez', 'pedro@example.com', '54321678C', '1995-09-15', 'otraContraseña', 5),
(4, 'Ana García', 'ana@example.com', '87654321D', '1992-07-20', 'miOtraContraseña', 6),
(5, 'Carlos Rodríguez', 'carlos@example.com', '56781234E', '1988-04-05', 'miUltimaContraseña', 6),
(6, 'Laura Martínez', 'laura@example.com', '43218765F', '1993-11-12', 'miOtraUltimaContraseña', 5),
(7, 'Roberto Sánchez', 'roberto@example.com', '87654321G', '1990-08-25', 'laUltimaContraseña', 7),
(8, 'SofíaFernández', 'sofia@example.com', '76543218H', '1987-03-15', 'miContraseñaSegura', 8),
(9, 'Juan Pérez', 'juanperez@example.com', '12345678A', '1990-01-01', 'password1', 5),
(10, 'María González', 'mariagonzalez@example.com', '23456789B', '1990-02-01', 'password2', 5),
(11, 'Luis Fernández', 'luisfernandez@example.com', '34567890C', '1990-03-01', 'password3', 5),
(12, 'Ana Rodríguez', 'anarodriguez@example.com', '45678901D', '1990-04-01', 'password4', 5),
(13, 'Carlos Sánchez', 'carlossanchez@example.com', '56789012E', '1990-05-01', 'password5', 5),
(14, 'Laura López', 'lauralopez@example.com', '67890123F', '1990-06-01', 'password6', 5),
(15, 'Pedro Martínez', 'pedromartinez@example.com', '78901234G', '1990-07-01', 'password7', 5),
(16, 'Isabel Torres', 'isabeltorres@example.com', '89012345H', '1990-08-01', 'password8', 5),
(17, 'Sergio Ramírez', 'sergioramirez@example.com', '90123456J', '1990-09-01', 'password9', 5),
(18, 'Elena Castro', 'elenacastro@example.com', '01234567K', '1990-10-01', 'password10', 5),
(19, 'Mario Herrera', 'marioherrera@example.com', '12345678L', '1990-11-01', 'password11', 6),
(20, 'Silvia Núñez', 'silvianunez@example.com', '23456789M', '1990-12-01', 'password12', 6),
(21, 'Hugo Rojas', 'hugorojas@example.com', '34567890N', '1991-01-01', 'password13', 6),
(22, 'Carolina León', 'carolinaleon@example.com', '45678901P', '1991-02-01', 'password14', 6),
(23, 'Fernando Méndez', 'fernandomendez@example.com', '56789012Q', '1991-03-01', 'password15', 6),
(24, 'Gabriela Silva', 'gabrielasilva@example.com', '67890123R', '1991-04-01', 'password16', 6),
(25, 'Diego Vargas', 'diegovargas@example.com', '78901234S', '1991-05-01', 'password17', 6),
(26, 'Valentina Cordero', 'valentinacordero@example.com', '89012345T', '1991-06-01', 'password18', 6),
(27, 'Jorge Rojas', 'jorgerojas@example.com', '90123456U', '1991-07-01', 'password19', 6),
(28, 'Marcela Pérez', 'marcelaperez@example.com', '01234567V', '1991-08-01', 'password20', 6);


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
