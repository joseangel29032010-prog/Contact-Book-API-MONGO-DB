
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const contactRoutes = require('./routes/contacts.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Contact Book API con MongoDB funcionando'
    });
});

// Rutas de contactos
app.use('/contacts', contactRoutes);

// Iniciar servidor
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();
