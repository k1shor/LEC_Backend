const OrderModel = require('../models/OrderModel')
const OrderItemsModel = require('../models/OrderItemsModel')

// place order 
exports.placeOrder = async (req, res) => {
    let orderItemsIds = await Promise.all(req.body.orderItems.map(
        async orderItem => {
            let orderItemData = await OrderItemsModel.create({
                product: orderItem.product,
                quantity: orderItem.quantity
            })
            if (!orderItemData) {
                return res.status(400).json({ error: "something went wrong" })
            }
            return orderItemData._id
        }
    ))

    let individual_total = await Promise.all(orderItemsIds.map(async (orderItemId) => {
        let orderItemData = await OrderItemsModel.findById(orderItemId).populate('product', 'product_price')
        return orderItemData.product.product_price * orderItemData.quantity
    })
    )

    let total = individual_total.reduce((a, c) => a + c)

    let order = await OrderModel.create({
        orderItemsIds,
        total,
        user: req.body.user,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
        phone: req.body.phone,
        country: req.body.country
    })

    if (!order) {
        return res.status(400).json({ error: "Failed to place order" })
    }

    res.send(order)

}


// get all orders
exports.getAllOrders = async (req, res) => {
    let orders = await OrderModel.find().populate('user', 'username')
        .populate({ path: 'orderItemsIds', populate: { path: 'product', populate: 'category' } })
    if (!orders) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(orders)
}

// get order details
exports.getOrderDetails = async (req, res) => {
    let order = await OrderModel.findById(req.params.id).populate('user', 'username')
        .populate({ path: 'orderItemsIds', populate: { path: 'product', populate: 'category' } })
    if (!order) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(order)
}

// get all orders by user
exports.getAllOrdersByUser = async (req, res) => {
    let orders = await OrderModel.find({ user: req.params.userId }).populate('user', 'username')
        .populate({ path: 'orderItemsIds', populate: { path: 'product', populate: 'category' } })
    if (!orders) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(orders)
}


// update order
exports.updateOrder = async (req, res) => {
    let order = await OrderModel.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, { new: true })
    if (!order) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(order)
}

// deleteOrder
exports.deleteOrder = (req, res) => {
    OrderModel.findByIdAndDelete(req.params.orderId)
        .then((deletedOrder) => {
            if (!deletedOrder) {
                return res.status(400).json({ error: "Order not found" })
            }
            deletedOrder.orderItemsIds.map((orderItem) => {
                OrderItemsModel.findByIdAndDelete(orderItem)
                    .then(deletedItem => {
                        if (!deletedItem) {
                            return res.status(400).json({ error: "Something went wrong" })
                        }
                    })
            })
            res.send({ message: "Order Deleted successfully" })
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong" })
        })
}

/*

orderItems: [{product: 'a', quantity:2}, {product: 'b', quantity: 4}],
user: '',
shipping_address: {....}
*/