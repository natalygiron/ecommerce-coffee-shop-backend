const jwt = require('jsonwebtoken');
const secret_code = 'm4r0on_6ur9ündy';

const jwtVerify = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).send({
            msg: `Token no existe.`,
            ok: false
        })
    }

    jwt.verify(token, secret_code, (error, payload) => {
        if (error) {
            console.log(error);
            return res.status(401).send({
                msg: `El token no es válido`,
                ok: false,
                error
            })
        }

        // console.log(`Payload`);
        // console.log(payload);

        req.user = payload;

        next();

    })
}

module.exports = {
    jwtVerify
}