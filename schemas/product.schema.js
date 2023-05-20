const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        }, 
        description: {
            type: String, 
            required: true 
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean, 
            default: true
        },
        image: {
            type: String, 
            required: true 
        },
        createdAt: {
            type: Number, 
            default: Date.now 
        }
    }
)
const Product = mongoose.model('Product', productSchema)

module.exports = Product