const cors = require('cors');
const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 3000;


// Initialize Firebase Admin with your project's credentials
var serviceAccount = require('./notas2-a0164-0381ccea8de3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notas2-a0164-default-rtdb.firebaseio.com"
});

app.use(cors());

const db = admin.database();

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Welcome to the Note App API');
});

// Endpoint para obtener notas
app.get('/api/notas', (req, res) => {
  const notasRef = db.ref('notas');
  notasRef.once('value', (snapshot) => {
    const notasFirebase = snapshot.val();
    const listaNota = [];
    for (let id in notasFirebase) {
      listaNota.push({ id, ...notasFirebase[id] });
    }
    res.json(listaNota);
  }, (errorObject) => {
    console.error('The read failed: ' + errorObject.name);
    res.status(500).send('Error fetching notes');
  });
});

// Endpoint para agregar una nueva nota
app.post('/api/notas', (req, res) => {
  const { titulo, contenido, fecha } = req.body;
  const notasRef = db.ref('notas');
  const newNotaRef = notasRef.push();
  newNotaRef.set({
    titulo,
    contenido,
    fecha
  }, (error) => {
    if (error) {
      res.status(500).send('Error saving note');
    } else {
      res.status(201).send('Note added successfully');
    }
  });
});

// Endpoint para eliminar una nota
app.delete('/api/notas/:id', (req, res) => {
  const noteId = req.params.id;
  const noteRef = db.ref('notas/' + noteId);
  noteRef.remove((error) => {
    if (error) {
      res.status(500).send('Error deleting note');
    } else {
      res.status(200).send('Note deleted successfully');
    }
  });
});

// Endpoint para editar una nota
app.put('/api/notas/:id', (req, res) => {
  const noteId = req.params.id;
  const { titulo, contenido, fecha } = req.body;

  // Update the note in Firebase Realtime Database
  const noteRef = db.ref(`notas/${noteId}`);
  noteRef.update({
    titulo,
    contenido,
    fecha
  }, (error) => {
    if (error) {
      console.error('Error updating note:', error);
      res.status(500).send('Error updating note');
    } else {
      console.log('Note updated successfully');
      res.status(200).send('Note updated successfully');
    }
  });
});

// Endpoint para marcar una nota como completada
app.patch('/api/notas/:id', (req, res) => {
  const noteId = req.params.id;
  const { completado } = req.body;

  // Update the completion status in Firebase Realtime Database
  const noteRef = db.ref(`notas/${noteId}`);
  noteRef.update({
    completado
  }, (error) => {
    if (error) {
      console.error('Error updating completion status:', error);
      res.status(500).send('Error updating completion status');
    } else {
      console.log('Completion status updated successfully');
      res.status(200).send('Completion status updated successfully');
    }
  });
});


// Manejador para rutas no definidas
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});