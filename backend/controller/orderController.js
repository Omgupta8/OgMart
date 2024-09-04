import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    // console.log("hello");
    // console.log(orderItems);

    if (orderItems && orderItems.length == 0) {
      res.status(400).json({ message: "No order items" });
      //   throw new Error("No order items");
    }
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      // console.log(matchingItemFromDB);

      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // USE OF POPULATE
    // console.log("Hello");

    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    // console.log("Hello");

    // console.log(req);

    // const userId = req.
    const order = await Order.find({ user: req.user._id });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const countTotalOrders = async (req, res) => {
  try {
    // console.log("hello");

    const totalOrders = await Order.countDocuments();
    // console.log(totalOrders);

    res.json({ totalOrders: totalOrders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const calculateTotalSales = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const calculateTotalSalesByDate = async (req, res) => {
  try {
    // console.log("Hello");

    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json(salesByDate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findOrderByID = async (req, res) => {
  try {
    // const id= req.query;
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    }
  } catch (err) {
    req.status(500).json({ error: err.message });
  }
};

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderByID,
  markOrderAsPaid,
  markOrderAsDelivered,
};
