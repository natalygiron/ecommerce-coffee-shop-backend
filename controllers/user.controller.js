const User = require('../schemas/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret_code = 'm4r0on_6ur9ündy';


const getAllUsers = async (req,res) => {
    try{
        const users = await User.find();

        // console.log(`Longitud de la búsqueda`, users.length);

        const totalUsera = await User.countDocuments();
        // console.log(`Total de usuarios `,totalUsera);

        return res.status(200).send({
            ok: true,
            msg: 'Usuarios obtenidos exitosamente.',
            users,
            total: totalUsera
        })
    } catch (error) {
        return res.status(400).send({
            ok: false,
            msg: 'No se pudieron obtener los productos.',
            error
        })
    }
}

const createUser = async (req,res) => {

    try {
        const userToCreate = new User(req.body);
        userToCreate.email = userToCreate.email.toLowerCase();

        const email = await User.findOne({ email: userToCreate.email });

        if (email) return res.status(400).send(`El email ya ha sido registrado.`)

        if (userToCreate.role.toLowerCase() != 'admin') userToCreate.role = 'customer';
        
        const password = req.body.password;
        const hash = await bcrypt.hash(password, 10);

        userToCreate.password = hash;

        const userSaved = await userToCreate.save();
        userSaved.password = undefined;

        return res.status(201).send({
            msg: `El usuario ha sido creado correctamente`,
            ok: true,
            user: userSaved
        })

    } catch (error) {
        return res.send({
            msg: `Error al guardar el usuario`,
            ok: false,
            error
        })
    }
}

const getUserById = async (req, res) => {

    try {
        const id = req.params.id;
        const user = await User.findById(id , { password: 0} );

        if(!user) {
            return res.status(404).send({
                msg: `Usuario no encontrado :(`,
                ok: false
            })
        }

        return res.status(200).send({
            msg: `El usuario ha sido encontrado.`,
            ok: true,
            user
        })


    } catch (error) {
        return res.send({
            msg: `Error al obtener usuario.`,
            ok: false
        })
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if(!user){
            return res.status(404).send({
                msg: `Usuario no encontrado :(`,
                ok: false
            })
        }

        const userData = req.body;

        if (userData.password.length != 0) {
            const password = userData.password;
            const hash = await bcrypt.hash( password, 10);
    
            userData.password = hash;
        } else {
            userData.password = user.password;
        }

    
        const userUpdated = await User.findByIdAndUpdate(id, userData, {new: true});

        return res.status(200).send({ 
                    msg: `Usuario actualizado ${id}`,
                    ok:true,
                    user: userUpdated
                });

    } catch (error) {
        return res.status(400).send(`Error al modificar usuario`)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findByIdAndDelete(id);

        if(!user) res.status(404).send({
            msg: `No se encontró al usuario con ID ${id}.`,
            ok: true
        })

        return res.status(200).send({
            msg:`El usuario ha sido eliminado.`,
            ok: true,
            user: {
                email: user.email
            }
        });

    } catch (error) {
        return res.send({
            msg: `Error al borrar usuario.`,
            ok: false
        })
    }
}

const loginUser = async (req, res) => {
    try {
        // Datos del usuario a logearse
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne( { email });

        if(!user) return res.status(404).send(`Login incorrecto. Usuario no encontrado.`);

        const result = await bcrypt.compare(password, user.password);

        if(!result) {
            return res.status(404).send({
                msg: `Login incorrecto`,
                ok: false
            })
        }
        
        user.password = undefined;

        const token = await jwt.sign(user.toJSON(), secret_code, {expiresIn:'2h'});

        return res.status(200).send({
            msg: `Login correcto`,
            ok: true,
            token,
            user
        })
        
    } catch (error) {
        res.status(400).send({
            msg: `No se pudo logear`,
            ok: true,
            error
        })
    }
}

const logout = async (req, res) => {
    // code
}

const findUserByEmail = async (req, res) => {

    try {
        const email = req.params.email;

        const user = await User.find({ email });

        return res.send(user);

    } catch (error) {
        res.status(400).send({
            msg: `Error al obtener usuario`,
            ok: true,
            error
        })
    }

}



module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById,
    findUserByEmail,
    loginUser,
    logout
}