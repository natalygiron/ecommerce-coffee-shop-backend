const Product = require('./../schemas/product.schema.js')

const getAllProducts = async (req,res) => {
    try{
        const products = await Product.find().sort({ createdAt: 'desc' });
        return res.status(200).send({
            ok: true,
            msg: 'Productos obtenidos exitosamente.',
            products
        })
    } catch (error) {
        return res.status(400).send({
            ok: false,
            msg: 'No se pudieron obtener los productos.',
            error
        })
    }
}

const getProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if(!product) {
            return formatRes(res, 404, `Producto no encontrado.`, false);
        }
        
        return res.status(200).send({
            msg: `Producto ID ${id} encontrado.`,
            ok: true,
            product
        })
    } catch (error) {
        res.status(400).send({
            msg: `Error al obtener producto`,
            ok: false,
            error
        })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);

        await product.save();

        return res.status(201).send({
            msg: `Producto insertado`,
            ok: true,
            product
        })

    } catch (e) {
        return res.status(400).send({
            ok: false,
            msg: `Error al registrar el producto`,
            error
        })
    }
}

const deleteProduct = async (req, res) => {
    
    try {
        const id = req.params.id;

        const product = await Product.findOneAndDelete({_id: id});

        if(!product) {
            return formatRes(res, 404, `No se encontró el producto con ID ${id}`, false);
        }

        return res.status(200).send({
            msg: 'Producto eliminado.',
            ok: true,
            product: {
                name: product.name
            }
        })

    } catch(e) {
        return formatRes(res, 400, 'Error al eliminar el producto.', false);
    }
}

const updateProduct = async (req, res) => {
    try{
        const id = req.params.id
        const data = req.body;
        
        const product = await Product.findOne({_id: id});

        if(!product){
            return formatRes(res, 404, 'Producto no encontrado.', false);
        }

        const updated = await Product.findByIdAndUpdate(id, data, { new: true, runValidators:true})
        
        return res.status(200).send({
            msg: `Producto ID ${id} actualizado.`,
            ok: true,
            updated
        })

    } catch(e) {
        return formatRes(res, 400, 'Error al actualizar el producto.', false);
    }
}

function formatRes(res, code, msg, ok) {
    return res.status(code).send({ msg, ok });
}



module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
};