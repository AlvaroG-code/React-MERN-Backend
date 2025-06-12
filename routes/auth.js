const { Router } = require("express");
const { check } = require("express-validator"); // Importar express-validator para validaciones

const router = Router(); // Crear el enrutador
// Importar los controladores de autenticación
const { validarJWT } = require("../middlewares/validar-jwt"); // Importar el middleware de validación JWT

// Definir las rutas de autenticación
const { crearUsuario } = require("../controllers/authController");
const { loginUsuario } = require("../controllers/authController");
const { revalidarToken } = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validar-campos");

router.post(
    "/new",
    [
        // Middleware para validar el cuerpo de la solicitud
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").not().isEmpty(),
        check(
            "password",
            "La contraseña debe ser de al menos 6 caracteres"
        ).isLength({ min: 6 }),
    ],
    validarCampos, // Middleware para validar los campos

    crearUsuario
); // Ruta para crear un nuevo usuario

router.post(
    "/",
    [
        check("email", "El email es obligatorio").not().isEmpty(),
        check(
            "password",
            "La contraseña debe ser de al menos 6 caracteres"
        ).isLength({ min: 6 }),
    ],
    validarCampos, // Middleware para validar los campos
    loginUsuario
); // Ruta para iniciar sesión de usuario

router.get("/renew", validarJWT, revalidarToken); // Ruta para revalidar el token
module.exports = router; // Exportar el enrutador
