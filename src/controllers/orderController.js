import asyncHandler from "express-async-handler";
import Order from "../models/orders.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    name,
    contactNo,
  } = req.body;
  // console.log(req, "check");
  const vendors = orderItems
    .map((o) => o.vendorId)
    .filter((v, i, self) => self.indexOf(v) === i);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Items Ordered!");
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      name,
      vendors,
      contactNo,
      date: Date.now(),
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
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
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

const getOrdersByVendor = asyncHandler(async (req, res) => {
  const v = req.params.vendorId;
  const orders = await Order.find({ });
  const yourOrders = orders.filter(o => o.vendors.includes(v)).map(y => { 
    const items = y.orderItems.filter(o => o.vendorId == v);
    const total = items.reduce((a,v) => a + v.quantity * v.payPrice,0);
    return {
      items,
      total,
      orderedBy: y.name,
      address: y.shippingAddress,
      contact: y.contactNo,
      date: y.date,
    }
    // ({ items: y.orderItems });

  });

  // const modified = yourOrders.map(y => ({ items: y.orderItems }));
  // console.log(yourOrders);
  res.json(yourOrders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  getOrdersByVendor
};
