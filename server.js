const express = require('express');
const cors = require('cors'); // Para manejar CORS
const bodyParser = require('body-parser'); // Para manejar el cuerpo de las peticiones

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para analizar JSON

// Datos de ejemplo (simulando una base de datos)
let tareas = [
    {
        userId: 1,
        title: "Completar el informe de ventas",
        completed: false,
        people: [
            { fullName: "Juan Pérez", age: 30, skills: ["ventas", "negociación"] },
            { fullName: "María García", age: 28, skills: ["marketing", "comunicación"] }
        ]
    },
    {
        userId: 2,
        title: "Desarrollar nueva funcionalidad",
        completed: true,
        people: [
            { fullName: "Pedro Sánchez", age: 35, skills: ["programación", "gestión de proyectos"] }
        ]
    }
];

// Ruta para obtener todas las tareas
app.get('/api/tareas', (req, res) => {
    res.json(tareas);
});

// Ruta para añadir una nueva tarea
app.post('/api/tareas', (req, res) => {
    const nuevaTarea = req.body;
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
