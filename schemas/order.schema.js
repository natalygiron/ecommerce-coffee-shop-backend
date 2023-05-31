const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderProducts: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product',
                 required: true 
            },
            quantity: { 
                type: Number, 
                required: true, 
                default: 1 
            },
            price: { 
                type: Number, 
                required: true 
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    shippingAddress: { 
        address: String, 
        city: String,  
        postalCode: String 
    },
    totalPrice: { type: Number, required: true },
    paymentMethod: String,
    status: { 
        type: String, required: true, 
        enum: [
            'Pendiente', 
            'En proceso', 
            'Enviado'
        ], 
        default: 'Pendiente'
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
})

module.exports = mongoose.model('Order', OrderSchema);