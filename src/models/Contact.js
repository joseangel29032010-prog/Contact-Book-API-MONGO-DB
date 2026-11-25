
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [50, 'El nombre no puede superar 50 caracteres']
    },

    phone: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true,
        match: [
            /^[0-9+\-() ]{7,20}$/,
            'El teléfono debe tener entre 7 y 20 caracteres válidos'
        ]
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'El correo electrónico no es válido'
        ]
    },

    category: {
        type: String,
        enum: {
            values: ['family', 'friends', 'work', 'other'],
            message: 'La categoría no es válida'
        },
        default: 'other'
    },

    favorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Índice para optimizar búsquedas por categoría
contactSchema.index({ category: 1 });

module.exports = mongoose.model('Contact', contactSchema);
