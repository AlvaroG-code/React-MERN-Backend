const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
const {
    getEventos,
    createEvento,
    updateEvento,
    deleteEvento,
} = require("../controllers/events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

//Todas tienen que pasar por la validación de JWT
// obtener eventos
router.get("/", validarJWT, getEventos);

// crear un nuevo evento
router.post(
    "/",
    validarJWT,
    [
        check("title", "El título es obligatorio").not().isEmpty(),
        check("start", "La fecha de inicio es obligatoria").custom(isDate),
        check("end", "La fecha de fin es obligatoria").custom(isDate),
        validarCampos,
    ],

    createEvento
);

// actualizar evento
router.put(
    "/:id",
    validarJWT,
    [
        check("title", "El título es obligatorio").not().isEmpty(),
        check("start", "La fecha de inicio es obligatoria").custom(isDate),
        check("end", "La fecha de fin es obligatoria").custom(isDate),
        validarCampos,
    ],

    updateEvento
);

// eliminar evento
router.delete("/:id", validarJWT, deleteEvento);

module.exports = router;
