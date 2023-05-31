const Order = require('../schemas/order.schema');
const Product = require('../schemas/product.schema');
// const User = require('../schemas/user.schema');

const getOrders = async (req, res) => {
    try {

        const orders = await Order.find().populate('orderProducts.product', {name:1, price:1} );

        if(!orders) throw new Error('Error al obtener las ordenes');

        return res.status(200).send(orders);
        
    } catch (error) {
        return res.status(500).send(error)
    }
}

const createOrder = async(req, res) => {

    try {
        const order = new Order(req.body);
        order.totalPrice = await verifyAndCalculate(req.body.orderProducts)

        const jwt_parse = JSON.parse(Buffer.from(req.headers.autorization.split('.')[1], 'base64').toString());
        if(!jwt_parse._id) throw new Error('Usuario no encontrado.');
        order.userId = jwt_parse._id;

        const newOrder = await order.save();

        if(!newOrder) throw new Error('Error creando la orden')

        return res.status(200).send(newOrder);


    } catch (error) {
        return res.status(500)
                    .send(error instanceof Error ? error.message : 'Error al crear la orden')
    }
}

const updateOrder = async (req, res) => {

    try {
        const id = req.params.id;
        const order = req.body;
        order.totalPrice = await verifyAndCalculate(order.orderProducts);
        const updatedOrder = await Order.findByIdAndUpdate(id, order, {new:true});

        if(!updatedOrder)  throw new Error('Error actualizando el producto.');

        return res.status(200).send(updatedOrder);

    } catch (error) {
        return res.status(500).send(error);
    }

}

async function verifyAndCalculate( orderProducts ) {

    let total = 0;
    for (const prod of orderProducts ) {
        const product = await Product.findById(prod.product);

        if(!product) throw new Error('Producto no encontrado');

        if(product.price !== prod.price) throw new Error('El precio no coincide.');

        total += (prod.price * prod.quantity);
    }

    return total.toFixed(2);

}

const getOrderById = async (req, res) => {

    try {
        const id = req.params.id;
        const order = await Order.findById(id).populate('orderProducts.product', {name: 1, price: 1});

        if(!order) throw new Error(`Error al obtener la orden de ID ${id}`);
        return res.status(200).send(order);

    } catch (error) {
        return res.status(500).send(error instanceof Error ? error.message : 'Error al obtener la orden')
    }

}


const getOrderByUserId = async (req, res) => {

    try {
        const user_id = req.params.userId;
        const orders = await Order.find({userId: user_id});

        if(!orders) throw new Error(`Error al obtener la orden de ID ${user_id}`);
        return res.status(200).send(orders);

    } catch (error) {
        return res.status(500).send(error instanceof Error ? error.message : 'Error al obtener la orden')
    }

}


module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    getOrderById,
    getOrderByUserId
}