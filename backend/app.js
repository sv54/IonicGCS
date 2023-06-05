const express = require('express');
const app = express();
const mysql = require('mysql2')
const bp = require('body-parser')
const moment = require('moment')
const cors = require('cors')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const connection = mysql.createConnection({
  // host: '192.168.1.122',
  // user: 'Desktop2',
  host: 'localhost',
  //user: 'root',
  //password: '',

  // @Angel
  user: 'dss',
  password: '12345678',
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

// Middleware
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
var corsOptions = {
    origin: "http://localhost:8100"
};  
app.use(cors(corsOptions));

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

app.get('/mensajeria-listado', (req, res) => {
  const { medico } = req.body
  const query = 'SELECT DISTINCT p.Nombre, p.Id, p.DNI FROM mensajes m, pacientes p WHERE m.fk_medico = ' + 5 + ' AND m.fk_paciente = p.id;'

  connection.query(query,(error, results, fields) => {
    if (error) {
      console.error(error)
      res.status(500).send('Error en el listado del médico')
    } 
    else {
      if (results.length == 0) {
        res.json("No tienes ningún chat abierto")
      }
      else {
        res.json(results)
      }
    }
  })
});

app.get('/mensajeria/:id', (req, res) => {
  const paciente = req.params.id

  var query = 'SELECT fk_medico FROM pacientes WHERE Id = ' + paciente + ';'
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error)
      res.status(500).send('Error encontrando al médico')
    } 
    else {
      const medico = results[0].fk_medico
      query = 'SELECT m.*, p.Nombre as Paciente, md.Nombre as Medico FROM mensajes m, pacientes p, medicos md WHERE m.fk_medico = ' + medico + ' AND m.fk_paciente = ' + paciente + ' AND m.fk_paciente = p.id AND m.fk_medico = md.id;'

      connection.query(query, (error, results, fields) => {
        if (error) {
          console.error(error)
          res.status(500).send('Error en el chat con el paciente')
        } 
        else {
          if (results.lengt == 0) {
            res.json("No tienes ningún chat abierto")
          }
          else {
            res.json(results)
          }
        }
      })
    }
  })

  
});

app.post('/mensajeria/:id', (req, res) => {
  const paciente = req.params.id
  const { mensaje } = req.body
  const date = moment().format('YYYY-MM-DD HH:mm:ss');

  var query = 'SELECT fk_medico FROM pacientes WHERE Id = ' + paciente + ';'
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error)
      res.status(500).send('Error encontrando al médico')
    } 
    else {
      const medico = results[0].fk_medico
      connection.query('INSERT INTO mensajes (fk_medico, fk_paciente, Remitente, Mensaje, FechaHora) VALUES (?, ?, ?, ?, ?)',
        [medico, paciente, 1, mensaje, date], (error, results, fields) => {
        if (error) {
          console.error(error)
          res.status(500).send('Error al enviar el mensaje')
        } 
        else {
          res.json("Mensaje enviado!!")
        }
      })
    }
  })
});

app.get('/', function (req, res) {
  res.send('Hola, mundo!');
});

app.listen(3000, function () {
  console.log('El servidor está escuchando en el puerto 3000');
});
