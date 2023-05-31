const User = require('../schemas/user.schema');

const authorization = (roles) => async (req, res, next) => {

    const token = req.headers.authorization;
    
    const jwt_parse = JSON.parse(Buffer.from(token?.split('.')[1], 'base64').toString());
    const user = await User.findById(jwt_parse._id);

    if(jwt_parse._id) {
        
        if([].concat(roles).includes(user.role)) next();
        else {
            res.status(409).send({ error: 'No tiene los permisos necesarios.'})
        }
    }
}

module.exports = {
    authorization
}