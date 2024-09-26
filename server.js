const express = require('express');
const cors = require('cors'); // Para manejar CORS
const bodyParser = require('body-parser'); // Para manejar el cuerpo de las peticiones
const fs = require('fs'); // Para manejar el sistema de archivos
const path = require('path'); // Para manejar rutas

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para analizar JSON

const dataFilePath = path.join(__dirname, 'data.json');

// Función para leer tareas del archivo JSON
function leerTareas() {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}

// Función para escribir tareas en el archivo JSON
function escribirTareas(tareas) {
    fs.writeFileSync(dataFilePath, JSON.stringify(tareas, null, 2));
}

// Ruta para obtener todas las tareas
app.get('/api/tareas', (req, res) => {
    const tareas = leerTareas();
    res.json(tareas);
});

// Ruta para añadir una nueva tarea
app.post('/api/tareas', (req, res) => {
    const nuevaTarea = req.body;
    const tareas = leerTareas();
    tareas.push(nuevaTarea);
    escribirTareas(tareas);
    res.status(201).json(nuevaTarea);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
