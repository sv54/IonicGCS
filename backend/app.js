const express = require('express');
const app = express();
const mysql = require('mysql2')
const bp = require('body-parser')
const moment = require('moment')
const cors = require('cors')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const connection = mysql.createConnection({
  // //@Serhii
  host: '192.168.1.122',
  user: 'Desktop2',
  // @Angel
  //user: 'dss',
  //password: '12345678',
  // @David
  //user: 'root',
  //password: 'root',
  // @Nikita
  // user: 'root',
  // password: '',
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
  const sql = 'SELECT * FROM medicos WHERE Email = "' + String(email) + '" LIMIT 1'
  console.log(sql)
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener el médico');
    } else {
      console.log(results)

      if (results.length === 0) {
        response = {
          status: "email " + email + " no encontrado",
        }
        res.json(response);
      } else {
        if (results[0].Password != password) {
          response = {
            status: "password incorrecto",
          }
          res.json(response);

        } else {
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

app.post('/regPaciente', (req, res) => {
  console.log(req.body)
  const nombre = req.body.Nombre;
  const dni = req.body.DNI;
  const email = req.body.Email;
  const fechaNac = req.body.FechaNac;
  const password = req.body.Password;
  const fk_medico = req.body.fk_medico;
  connection.query('SELECT dni FROM pacientes WHERE dni = ?', [dni], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al verificar el DNI');
    } else {
      if (results.length > 0) {
        // El DNI ya está registrado, enviar una respuesta de error
        res.status(400).send('El DNI ya está registrado');
      } else {
        connection.query('SELECT email FROM pacientes WHERE email = ?', [email], (error, emailResults) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error al verificar el Email');
          } else {
            if (emailResults.length > 0) {
              // El Email ya está registrado, enviar una respuesta de error
              res.status(400).send('El Email ya está registrado');
            } else {
              // El DNI no está registrado, insertar el nuevo paciente
              connection.query('INSERT INTO pacientes (nombre, dni, email, fechaNac, password, fk_medico) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre, dni, email, fechaNac, password, fk_medico],
                (error, results) => {
                  if (error) {
                    console.error(error);
                    res.status(500).send('Error al insertar nuevo paciente');
                  } else {
                    response = {
                      status: "Ok",
                    }
                    console.log("ok")
                    res.status(200).send(response);
                  }
                }
              );
            }
          }
        });
      }
    }
  });
});

//Añadir
app.post('/formMedicamento/:idPaciente/agregar', (req, res) => {
  const nombre = req.body.Nombre;
  const fechaInicio = req.body.FechaInicio;
  const fechaFin = req.body.FechaFin;
  const vecesDia = req.body.VecesDia;
  const detalles = req.body.Detalles;
  const idPaciente = req.params.idPaciente;

  connection.query('INSERT INTO medicamentos (Nombre, FechaInicio, FechaFin, VecesDia, Detalles, fk_paciente) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, fechaInicio, fechaFin, vecesDia, detalles, idPaciente],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar el medicamento' });
      } else {
        res.status(200).json({ message: 'Medicamento insertado correctamente' });
      }
    });
});

// Obtener datos iniciales del medicamento
app.get('/formMedicamento/:idMedicamento', (req, res) => {
  const idMedicamento = req.params.idMedicamento;

  connection.query('SELECT * FROM medicamentos WHERE Id = ?', [idMedicamento], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los datos del medicamento');
    } else {
      if (results.length > 0) {
        const medicamento = results[0];
        res.status(200).json(medicamento);
      } else {
        res.status(404).send('Medicamento no encontrado');
      }
    }
  });
});

// Editar
app.put('/formMedicamento/:idMedicamento/editar', (req, res) => {
  const idMedicamento = req.params.idMedicamento;

  const nombre = req.body.Nombre;
  const fechaInicio = req.body.FechaInicio;
  const fechaFin = req.body.FechaFin;
  const vecesDia = req.body.VecesDia;
  const detalles = req.body.Detalles;
  const idPaciente = req.body.idPaciente;

  connection.query('UPDATE medicamentos SET Nombre = ?, FechaInicio = ?, FechaFin = ?, VecesDia = ?, Detalles = ?, fk_paciente = ? WHERE Id = ?',
    [nombre, fechaInicio, fechaFin, vecesDia, detalles, idPaciente, idMedicamento],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al editar el medicamento');
      } else {
        res.status(200).send('Medicamento editado correctamente');
      }
    });
});

// Eliminar
app.delete('/formMedicamento/:idMedicamento/eliminar', (req, res) => {
  const idMedicamento = req.params.idMedicamento;

  connection.query('DELETE FROM medicamentos WHERE Id = ?',
    [idMedicamento],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el medicamento');
      } else {
        res.status(200).send('Medicamento eliminado correctamente');
      }
    });
});

app.get('/mensajeria-listado', (req, res) => {
  const { medico } = req.query

  const query = 'SELECT p.Nombre, p.Id, p.DNI, m.Mensaje, m.FechaHora ' +
    'FROM pacientes p ' +
    'INNER JOIN mensajes m ON m.fk_paciente = p.Id ' +
    'WHERE m.fk_medico = ' + medico + ' AND m.FechaHora = (SELECT MAX(FechaHora) FROM mensajes WHERE fk_paciente = p.Id) ' +
    'ORDER BY p.Id';

  connection.query(query, (error, results, fields) => {
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
          if (results.length == 0) {
            query = 'SELECT p.Nombre as Paciente, m.Nombre as Medico FROM pacientes p, medicos m WHERE m.id = ' + medico + ' AND p.fk_medico = ' + medico + ' AND p.id = ' + paciente + ';';

            connection.query(query, (error, results, fields) => {
              if (error) {
                console.error(error)
                res.status(500).send('Error en el chat con el paciente')
              }
              else {
                res.json(results)
              }
            })
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

app.get('/pacientes', (req, res) => {
  console.log("/pacientes (GET)");
  connection.query('SELECT * FROM pacientes', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los pacientes');
    } else {
      res.json(results);
    }
  });
});


// app.get('/medicamentos', (req, res) => {
//   console.log("/medicamentos (GET)");
//   connection.query('SELECT * FROM medicamentos', (error, results, fields) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Error al obtener los medicamentos.');
//     } else {
//       res.json(results);
//     }
//   });
// });


app.get('/medicamentos/:paciente', (req, res) => {
  console.log(`/medicamentos/${req.params.paciente} (GET)`);
  const paciente = req.params.paciente;
  connection.query('SELECT * FROM medicamentos WHERE fk_paciente = ?', [paciente], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener el medicamento.');
    } else {
      if (results.length > 0) {
        res.json(results);
      }
    }
  });
});

app.put('/pacientes/:id', (req, res) => {
  const pacienteId = req.params.id;
  const observaciones = req.body.observaciones;

  console.log(`/pacientes/${pacienteId}/observaciones (PUT) - Observaciones: ${observaciones}`);

  connection.query('UPDATE pacientes SET observaciones = ? WHERE id = ?', [observaciones, pacienteId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al actualizar las observaciones del paciente');
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/pacientes/:id', (req, res) => {
  const pacienteId = req.params.id;
  console.log(`/pacientes/${pacienteId} (GET)`);

  // Query the database to fetch the patient with the specified ID
  const query = `SELECT * FROM pacientes WHERE id = ${pacienteId}`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener el paciente');
    } else {
      if (results.length > 0) {
        const paciente = results[0];
        res.json(paciente);
      } else {
        res.status(404).send('Paciente no encontrado');
      }
    }
  });
});

app.get('/notificaciones', (req, res) => {
  const idMedico = req.body.id;

  const query = `SELECT * FROM notificaciones WHERE id_medico = ${idMedico}`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener notificaciones');
    } else {
      const notificaciones = results;
      res.json(results);
    }
  });
});

app.delete('/notificaciones/:id', (req, res) => {
  const idNotificacion = req.params.id;

  const query = `Delete FROM notificaciones WHERE id = ${idNotificacion}`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al borrar notificaciones');
    } else {
      const notificaciones = results;
      res.json("ok");
    }
  });
});
