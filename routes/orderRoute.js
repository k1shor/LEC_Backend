const { placeOrder, getAllOrders, getOrderDetails, getAllOrdersByUser, updateOrder, deleteOrder } = require('../controllers/orderController')

const router = require('express').Router()

router.post('/placeorder', placeOrder)

router.get('/getallorders', getAllOrders)
router.get('/getorderdetails/:id', getOrderDetails)

router.get('/getordersbyuser/:userId', getAllOrdersByUser)

router.put('/updateorder/:id', updateOrder)
router.delete('/deleteorder/:orderId', deleteOrder)

module.exports = router
