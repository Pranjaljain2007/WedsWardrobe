const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");


// PLACE ORDER
router.post("/place-order", async (req, res) => {
    try {
        const {
            uid,
            items,
            totalAmount,
            address,
            refundableDeposit,
            paymentMethod
        } = req.body;

        //console.log("Received product IDs:", items.map(i => i.productId));

        //  Validate each product from MongoDB instead of JSON
        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.name}`
                });
            }

            if (product.status !== "available") {
                return res.status(400).json({
                    message: `Product not available: ${item.name}`
                });
            }
        }

        // Save Order to DB
        const order = new Order({
            uid,
            items,
            totalAmount,
            refundableDeposit,
            address,
            payment: { method: paymentMethod, status: "pending" },
            orderStatus: "placed",
            placedAt: new Date(),
        });

        await order.save();

        // Push order into user's rentalHistory
        await User.findOneAndUpdate(
            { uid },
            { $push: { rentalHistory: order._id } }
        );

        res.status(201).json({
            message: "Order placed successfully",
            order,
        });

    } catch (err) {
        console.error("Order error:", err);
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
});


// router.post("/place-order", async (req, res) => {
//     console.log("POST /place-order hit");
//     console.log("Request body:", req.body);
//     res.json({ order: true });
// });



// GET USER ORDERS
router.get("/user-orders/:uid", async (req, res) => {
    try {
        const { uid } = req.params;

        //console.log("UID received:", uid);

        const orders = await Order.find({ uid });

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this user",
            });
        }

        res.json({ success: true, orders });
    } catch (err) {
        console.error("Get user orders error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});



//fetch current orders from db
router.get("/curr-order/:uid", async (req, res) => {
    try {
        const { uid } = req.params;
        //console.log("UID received:", uid);

        const order = await Order.findOne({ uid }).sort({ createdAt: -1 });

        res.json({
            success: true,
            order,
        });

    } catch (err) {
        console.error("Get current order error:", err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});



module.exports = router;