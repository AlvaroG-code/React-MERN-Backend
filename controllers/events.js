const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
    // Extraer los eventos de la base de datos
    const eventos = await Evento.find().populate("user", "name"); // populate para obtener los datos del usuario

    res.json({
        ok: true,
        eventos,
    });
};

const createEvento = async (req, res = response) => {
    const evento = new Evento(req.body);
    const uid = req.uid;

    // Guardar en la base de datos
    try {
        // Extraer el usuario del request
        evento.user = uid;
        const eventoDB = await evento.save();
        res.json({
            ok: true,
            evento: eventoDB,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al crear el evento",
        });
    }
};

const updateEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado",
            });
        }

        // Verificar que el usuario que actualiza el evento es el mismo que lo creó
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permisos para actualizar este evento",
            });
        }

        // Actualizar el evento
        const nuevoEvento = {
            ...req.body,
            user: uid,
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(
            eventoId,
            nuevoEvento,
            { new: true }
        );

        res.json({
            ok: true,
            evento: eventoActualizado,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al actualizar el evento",
        });
    }
};

const deleteEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado",
            });
        }

        // Verificar que el usuario que actualiza el evento es el mismo que lo creó
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene permisos para actualizar este evento",
            });
        }

        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al actualizar el evento",
        });
    }
};

module.exports = {
    getEventos,
    createEvento,
    updateEvento,
    deleteEvento,
};
