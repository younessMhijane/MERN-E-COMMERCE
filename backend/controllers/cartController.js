import Order from "../models/Cart.js";
import Product from "../models/product.js";

// Utility Function
function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalPrice = itemsPrice.toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    totalPrice,
  };
}

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress } = req.body;

    // Vérification initiale des données
    if (!orderItems || orderItems.length === 0) {
      res.status(400).json({ error: "No order items" });
      return;
    }

    console.log("Request Body:", req.body);

    // Récupérer les produits de la base de données
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    if (!itemsFromDB || itemsFromDB.length === 0) {
      res.status(404).json({ error: "No matching products found in database" });
      return;
    }

    // Construire les items de la commande
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined, // Supprime l'ID pour éviter les conflits
      };
    });

    console.log("Mapped Order Items:", dbOrderItems);

    // Calculer les prix
    const { itemsPrice, totalPrice } = calcPrices(dbOrderItems);

    // Créer la commande
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      itemsPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ error: error.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findOrderById = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const countTotalOrders = async (req, res) => {
      try {
        const totalOrders = await Order.countDocuments(); // Compte les commandes dans la base
        res.json({ totalOrders }); // Retourne le total sous forme de JSON
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    const updateStatus = async (req, res) => {
      const { status } = req.body;
    
      try {
        const order = await Order.findById(req.params.id);
    
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }
    
        order.status = status; // Mettre à jour le statut
        await order.save();
    
        res.status(200).json({ message: "Order status updated successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    

export { createOrder, getAllOrders, getUserOrders, findOrderById,countTotalOrders,updateStatus };

  