const express = require('express');
const app = express();
const mysql = require('mysql2')
const bp = require('body-parser')
const cors = require('cors');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const connection = mysql.createConnection({
  // host: '192.168.1.122',
  // user: 'Desktop2',
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'gcs'
});
app.use(cors()); // Habilitar CORS para todas las rutas


connection.connect((error) => {
  if (error) {
    console.error('Error al conectarse a la base de datos: ' + error.stack);
    return;
  }

  console.log('Conexión a la base de datos exitosa con ID: ' + connection.threadId);
});


app.get('/medicos', (req, res) => {
  connection.query('SELECT * FROM medicos', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los médicos');
    } else {
      res.json(results);
    }
  });
});

app.post('/medicos/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql =  'SELECT * FROM medicos WHERE Email = "'+ String(email) +'" LIMIT 1'
  console.log(sql)
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener el médico');
    } else {
      console.log(results)

      if (results.length === 0){
        response = {
          status: "email " + email + " no encontrado",
        }
        res.json(response);
      }else{
        if(results[0].Password != password){
          response = {
            status: "password incorrecto",
          }
          res.json(response);

        }else{
          response = {
            status: "Ok",
            datos: results[0]
          }
          res.json(response);
        }
      }
    }
  });
});

app.post('/medicos', (req, res) => {
  console.log(req.body)
  const nombre = req.body.Nombre;
  const dni = req.body.DNI;
  const email = req.body.Email;
  const fechaNac = req.body.FechaNac;
  const password = req.body.Password;
  connection.query('INSERT INTO medicos (nombre, dni, email, fechaNac, password) VALUES (?, ?, ?, ?, ?)',
    [nombre, dni, email, fechaNac, password],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al insertar el médico');
      } else {
        res.status(200).send('Médico insertado correctamente');
      }
    });
});

//Añadir
app.post('/formMedicamento/:idPaciente', (req, res) => {
  console.log(req.body)
  const nombre = req.body.Nombre;
  const fechaInicio = req.body.FechaInicio;
  const fechaFin = req.body.FechaFin;
  const vecesDia = req.body.VecesDia;
  const detalles = req.body.Detalles;
  const idPaciente = req.params.idPaciente;

  console.log(nombre)
  console.log(fechaInicio)
  console.log(fechaFin)
  console.log(vecesDia)
  console.log(detalles)
  console.log(idPaciente)

  connection.query('INSERT INTO medicamentos (Nombre, FechaInicio, FechaFin, VecesDia, Detalles, fk_paciente) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, fechaInicio, fechaFin, vecesDia, detalles, idPaciente],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al insertar el medicamento');
      } else {
        res.status(200).send('Medicamento insertado correctamente');
      }
    });
});

app.get('/', function (req, res) {
  res.send('Hola, mundo!');
});

app.listen(3000, function () {
  console.log('El servidor está escuchando en el puerto 3000');
});
