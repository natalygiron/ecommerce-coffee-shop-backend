const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            minlength: 8,
            maxlength: 45,
            validate: { 
                validator: function(v) { return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); }, 
                message: props => `${props.value} no es un email valido.` 
            }
        },
        password: {
            type:String,
            required: true
        },
        dni: {
            type: String,
            required: true,
            maxlength: 8
        }, 
        phone: {
            type: String,
            required: true
        },
        role: {
            type: String, 
            enum: ['admin', 'customer'], 
            default: 'customer'
        },
        image: { 
            type: String 
        }, 
        permissions : [
            {
                type: String,
                enum: [
                    "read_prod", "create_prod", "update_prod", 
                    "delete_prod","manage_roles"
                ]
            }
        ],
        createdAt: { 
            type: Number, 
            default: Date.now 
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;