const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED, // Clave secreta para firmar el token
            {
                expiresIn: "2h",
            },
            (err, token) => {
                if (err) {
                    console.error("Error al generar el token JWT:", err);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generarJWT,
    // crearUsuario,
    // loginUsuario,
    // revalidarToken
};
