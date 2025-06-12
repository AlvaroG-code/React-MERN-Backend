const { response } = require("express");
const { validationResult } = require("express-validator"); // Importar express-validator para validaciones

const validarCampos = (req, res, next) => {
    //manejo de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    next(); // Llamar al siguiente middleware si no hay errores
}; // Middleware para validar campos de solicitud

module.exports = {
    validarCampos, // Exportar el middleware para su uso en otras partes de la aplicación
};
