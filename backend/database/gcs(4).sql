-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2023 at 06:52 PM
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

--
-- Dumping data for table `medicamentos`
--

INSERT INTO `medicamentos` (`Id`, `Nombre`, `FechaInicio`, `FechaFin`, `VecesDia`, `Detalles`, `fk_paciente`) VALUES
(1, 'Paracetamol', '2023-06-10', '2023-06-20', '3 veces al ', 'Tomar con comida', 1),
(2, 'Amoxicilina', '2023-06-11', '2023-06-21', '2 veces al ', 'Tomar con abundante agua', 2),
(3, 'Ibuprofeno', '2023-06-12', '2023-06-22', '3 veces al ', 'No exceder la dosis recomendada', 3),
(4, 'Omeprazol', '2023-06-13', '2023-06-23', '1 vez al dí', 'Tomar en ayunas', 4),
(5, 'Loratadina', '2023-06-14', '2023-06-24', '1 vez al dí', 'Tomar antes de dormir', 5),
(6, 'Simvastatina', '2023-06-15', '2023-06-25', '1 vez al dí', 'Tomar con alimentos', 6),
(7, 'Metformina', '2023-06-16', '2023-06-26', '2 veces al ', 'Tomar con comida', 7),
(8, 'Losartan', '2023-06-17', '2023-06-27', '1 vez al dí', 'Tomar a la misma hora todos los días', 8),
(9, 'Warfarina', '2023-06-18', '2023-06-28', '1 vez al dí', 'Seguir las indicaciones del médico', 9);

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
  `Remitente` tinyint(1) DEFAULT NULL,
  `Mensaje` text NOT NULL,
  `FechaHora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mensajes`
--

INSERT INTO `mensajes` (`Id`, `fk_medico`, `fk_paciente`, `Remitente`, `Mensaje`, `FechaHora`) VALUES
(1, 5, 1, 1, 'Hola, ¿cómo te sientes?', '2023-06-01 10:30:00'),
(2, 5, 2, 1, 'Recuerda tomar el medicamento a diario.', '2023-06-02 15:45:00'),
(3, 5, 1, 1, '¿Cómo ha sido tu progreso?', '2023-06-03 09:15:00'),
(4, 6, 4, 1, 'Recuerda programar tu próxima cita.', '2023-06-04 11:30:00'),
(5, 7, 7, 1, 'Estoy revisando tus análisis.', '2023-06-04 16:20:00'),
(10, 5, 9, 1, 'Hola, ¿cómo te encuentras?', '2023-06-05 11:08:29'),
(11, 5, 9, 0, 'Hola, estoy bien, gracias.', '2023-06-05 11:08:30'),
(12, 5, 9, 1, 'Me alegra escuchar eso. ¿Necesitas algo?', '2023-06-05 11:08:31'),
(13, 5, 9, 0, 'No, por ahora estoy bien. Gracias por preguntar.', '2023-06-05 11:08:32'),
(14, 5, 9, 1, 'Si tienes alguna pregunta o necesitas ayuda, no dudes en decírmelo.', '2023-06-05 11:08:33'),
(15, 5, 9, 0, 'Lo tendré en cuenta. Gracias.', '2023-06-05 11:08:34'),
(16, 5, 9, 1, 'Recuerda tomar tus medicamentos según lo indicado.', '2023-06-05 11:08:35'),
(17, 5, 9, 0, 'Sí, no lo olvidaré. Gracias por recordármelo.', '2023-06-05 11:08:36'),
(18, 5, 9, 1, 'Si tienes alguna preocupación o síntoma nuevo, avísame de inmediato.', '2023-06-05 11:08:37'),
(19, 5, 9, 0, 'Está bien, lo tendré en cuenta. Gracias por tu atención.', '2023-06-05 11:08:38'),
(20, 5, 9, 1, 'Nos vemos en la próxima cita. Cuídate.', '2023-06-05 11:08:39'),
(21, 5, 10, 1, 'Hola, ¿cómo estás?', '2023-06-05 11:08:40'),
(22, 5, 10, 0, 'Hola, bien. Gracias.', '2023-06-05 11:08:41'),
(23, 5, 10, 1, '¿Hay algo en lo que pueda ayudarte?', '2023-06-05 11:08:42'),
(24, 5, 10, 0, 'No, por ahora todo está bien.', '2023-06-05 11:08:43'),
(25, 5, 10, 1, 'Si necesitas algo o tienes alguna pregunta, no dudes en decírmelo.', '2023-06-05 11:08:44'),
(26, 5, 10, 0, 'Gracias, lo tendré en cuenta.', '2023-06-05 11:08:45'),
(27, 5, 10, 1, 'Recuerda tomar tus medicamentos según lo indicado.', '2023-06-05 11:08:46'),
(28, 5, 10, 0, 'Sí, lo recordaré. Gracias por tu atención.', '2023-06-05 11:08:47'),
(29, 5, 10, 1, 'Si experimentas algún síntoma nuevo o tienes alguna inquietud, házmelo saber.', '2023-06-05 11:08:48'),
(30, 5, 10, 0, 'Está bien, lo tendré presente. Hasta la próxima.', '2023-06-05 11:08:49'),
(31, 5, 11, 1, 'Hola, cómo te sientes hoy?', '2023-06-05 11:08:50'),
(32, 5, 11, 0, 'Hola, me siento un poco cansado.', '2023-06-05 11:08:51'),
(33, 5, 11, 1, 'Entiendo, asegúrate de descansar lo suficiente.', '2023-06-05 11:08:52'),
(34, 5, 11, 0, 'Sí, lo tendré en cuenta.', '2023-06-05 11:08:53'),
(35, 6, 12, 1, 'Buenos días, ¿cómo amaneciste?', '2023-06-05 11:08:54'),
(36, 6, 12, 0, 'Buenos días, estoy bien, gracias.', '2023-06-05 11:08:55'),
(37, 6, 12, 1, 'Me alegra escuchar eso. ¿Necesitas algo hoy?', '2023-06-05 11:08:56'),
(38, 6, 12, 0, 'No, por ahora estoy bien. Gracias.', '2023-06-05 11:08:57'),
(39, 6, 13, 1, 'Hola, ¿cómo ha sido tu día?', '2023-06-05 11:08:58'),
(40, 6, 13, 0, 'Hola, ha sido un día tranquilo.', '2023-06-05 11:08:59'),
(41, 6, 13, 1, 'Si necesitas algo o tienes alguna pregunta, no dudes en decírmelo.', '2023-06-05 11:09:00'),
(42, 6, 13, 0, 'Gracias, lo tendré en cuenta.', '2023-06-05 11:09:01'),
(43, 7, 14, 1, 'Hola, ¿cómo te encuentras hoy?', '2023-06-05 11:09:02'),
(44, 7, 14, 0, 'Hola, me siento mejor que ayer.', '2023-06-05 11:09:03'),
(45, 7, 14, 1, 'Me alegra escuchar eso. Recuerda tomar tus medicamentos.', '2023-06-05 11:09:04'),
(46, 7, 14, 0, 'Sí, no lo olvidaré. Gracias por recordármelo.', '2023-06-05 11:09:05'),
(47, 7, 15, 1, 'Buenas tardes, ¿cómo te ha ido el día?', '2023-06-05 11:09:06'),
(48, 7, 15, 0, 'Buenas tardes, ha sido un día ocupado.', '2023-06-05 11:09:07'),
(49, 7, 15, 1, 'Si tienes alguna preocupación o síntoma nuevo, avísame de inmediato.', '2023-06-05 11:09:08'),
(50, 7, 15, 0, 'Está bien, lo tendré en cuenta. Gracias por tu atención.', '2023-06-05 11:09:09'),
(51, 5, 13, 1, 'Buenos días, ¿cómo te encuentras hoy?', '2023-06-05 11:09:10'),
(52, 5, 13, 0, 'Hola, me he sentido un poco mareado en los últimos días.', '2023-06-05 11:09:11'),
(53, 5, 14, 1, 'Hola, ¿has tenido alguna mejora en tus síntomas?', '2023-06-05 11:09:12'),
(54, 5, 14, 0, 'No, mis síntomas siguen iguales. ¿Hay algo más que pueda hacer?', '2023-06-05 11:09:13'),
(55, 5, 15, 1, 'Hola, ¿cómo te ha ido con tu rutina de ejercicios?', '2023-06-05 11:09:14'),
(56, 5, 15, 0, 'He estado haciendo los ejercicios que me recomendaste, me siento mejor.', '2023-06-05 11:09:15'),
(57, 5, 16, 1, 'Buenos días, ¿has notado algún cambio en tu dieta?', '2023-06-05 11:09:16'),
(58, 5, 16, 0, 'Sí, he estado siguiendo las recomendaciones y me siento más saludable.', '2023-06-05 11:09:17'),
(59, 5, 17, 1, 'Hola, ¿cómo ha sido tu calidad de sueño?', '2023-06-05 11:09:18'),
(60, 5, 17, 0, 'Mi calidad de sueño ha mejorado, gracias a tus consejos.', '2023-06-05 11:09:19'),
(61, 5, 1, 1, 'Estimado paciente, espero que este mensaje le encuentre bien. Me gustaría brindarle información detallada sobre su condición de salud y el tratamiento recomendado. Según los resultados de sus exámenes médicos, hemos identificado algunos aspectos que requieren atención. Es importante seguir las indicaciones y pautas que le proporcionaremos para lograr una mejoría en su estado de salud. Recuerde tomar los medicamentos prescritos de acuerdo a las indicaciones y realizar las consultas de seguimiento programadas. Si tiene alguna pregunta o inquietud, no dude en comunicarse con nosotros. Estamos aquí para brindarle el apoyo necesario en su proceso de recuperación. Atentamente, Dr. Jogn Smith.', '2023-06-05 11:09:20');

-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `hora` datetime NOT NULL,
  `texto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `id_paciente`, `id_medico`, `hora`, `texto`) VALUES
(1, 1, 4, '2023-06-10 08:00:00', 'Estimado Dr. López, quisiera programar una consulta para discutir mis síntomas recientes.'),
(2, 2, 5, '2023-06-11 14:30:00', 'Hola Dr. Rodríguez, tengo algunas preguntas sobre los resultados de mis análisis de sangre.'),
(3, 1, 5, '2023-06-12 09:15:00', 'Dr. Smith, necesito renovar mi receta médica. ¿Podría proporcionarme una nueva?'),
(4, 2, 5, '2023-06-13 16:45:00', 'Querido Dr. García, me gustaría discutir los efectos secundarios de mi medicamento actual.'),
(5, 3, 5, '2023-06-14 11:00:00', 'Dr. Lee, necesito su consejo sobre un plan de alimentación saludable para controlar mi diabetes.'),
(6, 4, 5, '2023-06-15 09:30:00', 'Hola Dr. Rodríguez, me gustaría cambiar mi cita programada para la próxima semana.'),
(7, 5, 5, '2023-06-16 13:15:00', 'Dr. Smith, ¿podría recomendarme un especialista para una segunda opinión médica?'),
(8, 8, 5, '2023-06-16 14:30:00', 'Estimado Dr. García, ¿podría proporcionarme un informe médico detallado sobre mi condición actual?'),
(9, 9, 5, '2023-06-16 10:45:00', 'Dr. Lee, tengo programada una cirugía la próxima semana. ¿Cuáles son las precauciones que debo tomar?'),
(10, 10, 6, '2023-06-16 11:30:00', 'Hola Dr. Rodríguez, ¿podría recomendarme algún libro sobre salud y bienestar?');

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
  `observaciones` text NOT NULL DEFAULT 'Ninguna',
  `fk_medico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pacientes`
--

INSERT INTO `pacientes` (`Id`, `Nombre`, `Email`, `DNI`, `FechaNac`, `Password`, `observaciones`, `fk_medico`) VALUES
(1, 'David Martinez', 'david@example.com', '65456321T', '1990-01-01', 'laContraseña', 'Ninguna', 5),
(2, 'María López', 'maria@example.com', '98765432B', '1985-05-10', 'miContraseña', 'Alergia a los frutos secos', 5),
(3, 'Pedro Gómez', 'pedro@example.com', '54321678C', '1995-09-15', 'otraContraseña', 'Asma', 5),
(4, 'Ana García', 'ana@example.com', '87654321D', '1992-07-20', 'miOtraContraseña', 'Hipertensión', 6),
(5, 'Carlos Rodríguez', 'carlos@example.com', '56781234E', '1988-04-05', 'miUltimaContraseña', 'Ninguna', 6),
(6, 'Laura Martínez', 'laura@example.com', '43218765F', '1993-11-12', 'miOtraUltimaContraseña', 'Diabetes tipo 2', 5),
(7, 'Roberto Sánchez', 'roberto@example.com', '87654321G', '1990-08-25', 'laUltimaContraseña', 'Ninguna', 7),
(8, 'SofíaFernández', 'sofia@example.com', '76543218H', '1987-03-15', 'miContraseñaSegura', 'Ninguna', 8),
(9, 'Juan Pérez', 'juanperez@example.com', '12345678A', '1990-01-01', 'password1', 'Ninguna', 5),
(10, 'María González', 'mariagonzalez@example.com', '23456789B', '1990-02-01', 'password2', 'Alergia al polen', 5),
(11, 'Luis Fernández', 'luisfernandez@example.com', '34567890C', '1990-03-01', 'password3', 'Intolerancia a la lactosa', 5),
(12, 'Ana Rodríguez', 'anarodriguez@example.com', '45678901D', '1990-04-01', 'password4', 'Ninguna', 6),
(13, 'Carlos Sánchez', 'carlossanchez@example.com', '56789012E', '1990-05-01', 'password5', 'Asma', 5),
(14, 'Laura López', 'lauralopez@example.com', '67890123F', '1990-06-01', 'password6', 'Ninguna', 5),
(15, 'Pedro Martínez', 'pedromartinez@example.com', '78901234G', '1990-07-01', 'password7', 'Ninguna', 5),
(16, 'Isabel Torres', 'isabeltorres@example.com', '89012345H', '1990-08-01', 'password8', 'Alergia al marisco', 5),
(17, 'Sergio Ramírez', 'sergioramirez@example.com', '90123456J', '1990-09-01', 'password9', 'Ninguna', 5),
(18, 'Elena Castro', 'elenacastro@example.com', '01234567K', '1990-10-01', 'password10', 'Ninguna', 5),
(19, 'Mario Herrera', 'marioherrera@example.com', '12345678L', '1990-11-01', 'password11', 'Ninguna', 6),
(20, 'Silvia Núñez', 'silvianunez@example.com', '23456789M', '1990-12-01', 'password12', 'Ninguna', 6),
(21, 'Hugo Rojas', 'hugorojas@example.com', '34567890N', '1991-01-01', 'password13', 'Ninguna', 6),
(22, 'Carolina León', 'carolinaleon@example.com', '45678901P', '1991-02-01', 'password14', 'Ninguna', 6),
(23, 'Fernando Méndez', 'fernandomendez@example.com', '56789012Q', '1991-03-01', 'password15', 'Ninguna', 6),
(24, 'Gabriela Silva', 'gabrielasilva@example.com', '67890123R', '1991-04-01', 'password16', 'Ninguna', 6),
(25, 'Diego Vargas', 'diegovargas@example.com', '78901234S', '1991-05-01', 'password17', 'Ninguna', 6),
(26, 'Valentina Cordero', 'valentinacordero@example.com', '89012345T', '1991-06-01', 'password18', 'Ninguna', 6),
(27, 'Jorge Rojas', 'jorgerojas@example.com', '90123456U', '1991-07-01', 'password19', 'Ninguna', 6),
(28, 'Marcela Pérez', 'marcelaperez@example.com', '01234567V', '1991-08-01', 'password20', 'Ninguna', 6);

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `medicos`
--
ALTER TABLE `medicos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `fk_mensajes_medicos` FOREIGN KEY (`fk_medico`) REFERENCES `medicos` (`Id`),
  ADD CONSTRAINT `fk_mensajes_pacientes` FOREIGN KEY (`fk_paciente`) REFERENCES `pacientes` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
