
const Contact = require('../models/Contact');

// GET: Obtener todos los contactos

const getAllContacts = async (req, res) => {
    try {
        const filter = {};

        // Filtrar por categoría si se proporciona
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // Filtrar por favoritos si se proporciona
        if (req.query.favorite !== undefined) {
            filter.favorite = req.query.favorite === 'true';
        }

        const contacts = await Contact.find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json({
            total: contacts.length,
            contacts
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener contactos',
            error: error.message
        });
    }
};


// GET: Obtener contacto por ID
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: 'Contacto no encontrado'
            });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({
            message: 'ID inválido o error al buscar contacto',
            error: error.message
        });
    }
};

// POST: Crear contacto
const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);

        res.status(201).json({
            message: 'Contacto creado correctamente',
            contact
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al crear contacto',
            error: error.message
        });
    }
};

// PUT: Actualizar contacto
const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({
                message: 'Contacto no encontrado'
            });
        }

        res.status(200).json({
            message: 'Contacto actualizado correctamente',
            contact
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al actualizar contacto',
            error: error.message
        });
    }
};

// PATCH: Cambiar favorito
const toggleFavorite = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: 'Contacto no encontrado'
            });
        }

        contact.favorite = !contact.favorite;
        await contact.save();

        res.status(200).json({
            message: 'Favorito actualizado',
            contact
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al cambiar favorito',
            error: error.message
        });
    }
};

// DELETE: Eliminar contacto
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                message: 'Contacto no encontrado'
            });
        }

        res.status(200).json({
            message: 'Contacto eliminado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al eliminar contacto',
            error: error.message
        });
    }
};

// GET: Estadísticas con agregaciones
const getContactStats = async (req, res) => {
    try {
        const contactsByCategory = await Contact.aggregate([
            {
                $group: {
                    _id: '$category',
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { total: -1 }
            }
        ]);

        const favoritesStats = await Contact.aggregate([
            {
                $group: {
                    _id: '$favorite',
                    total: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            contactsByCategory,
            favoritesStats
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener estadísticas',
            error: error.message
        });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    toggleFavorite,
    deleteContact,
    getContactStats
};
