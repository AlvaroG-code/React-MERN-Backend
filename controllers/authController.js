const { response } = require("express");
// Controlador de autenticación para manejar la creación de usuarios, inicio de sesión y revalidación de tokens
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Aquí podrías agregar lógica para verificar si el usuario ya existe
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe",
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar la contraseña antes de guardar el usuario
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        // Generar un JWT (JSON Web Token) al crear el usuario
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({
            ok: false,
            msg: "Error al crear usuario",
        });
    }
};

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    console.log("Login recibido:", email, password);

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        console.log("❌ Usuario no encontrado");
        return res
            .status(400)
            .json({ ok: false, msg: "Usuario o contraseña no válidos" });
    }

    console.log("🧑 Usuario encontrado:", usuario);

    const validPassword = bcrypt.compareSync(password, usuario.password);
    console.log("🔐 Password válida?", validPassword);

    if (!validPassword) {
        console.log("❌ Contraseña inválida");
        return res
            .status(400)
            .json({ ok: false, msg: "Credenciales no válidas" });
    }

    const token = await generarJWT(usuario.id, usuario.name);
    console.log("✅ Token generado:", token);

    res.status(200).json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token,
    });
};

const revalidarToken = async (req, res = response) => {
    const { uid, name } = req;
    // Generar un nuevo token
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
};
