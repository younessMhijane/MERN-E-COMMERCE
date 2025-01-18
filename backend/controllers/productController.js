import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/product.js";
import fs from "fs";
import path from "path";
import Order from "../models/Cart.js";

const addProduct = asyncHandler(async(req,res)=>{
    try{
        const {name,price,description}=req.fields;
         if(!name) return res.json({ error: "Name is required" });
         if(!price) return res.json({ error: "price is required" });
         if(!description) return res.json({ error: "description is required" });
         const product = new Product({...req.fields});
         await product.save()
         res.json(product);
    }catch(error){
        console.error(error);
        res.status(400).json(error.message)
    }
});
const getAllProducts = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Server Error"})
    }
});
const getProductById = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.findById(req.params.id)
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Server Error"})
    }
});
// Utilisation de __dirname pour obtenir le chemin absolu du répertoire actuel
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Vérifiez si une image est associée au produit
    if (product.image) {
      // Extraire uniquement le nom du fichier, sans les chemins supplémentaires
      const imageName = path.basename(product.image);

      // Construit le chemin absolu pour l'image
      let imagePath = path.join(__dirname, "../uploads", imageName);
      const imagePath1 = imagePath.replace("\\C:", "");
      // Vérification du chemin de l'image
      console.log("Image path:", imagePath1);

      // Vérification si le fichier existe avant de le supprimer
      fs.access(imagePath1, fs.constants.F_OK, (err) => {
        if (err) {
          console.error("Image not found:", err);
          return res.status(500).json({ error: "Image not found or already deleted" });
        }

        // Supprimer l'image
        fs.unlink(imagePath1, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
            return res.status(500).json({ error: "Failed to delete image" });
          }
          console.log("Image deleted successfully");
        });
      });
    }

    // Supprimer le produit de la base de données
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found or already deleted" });
    }

    // Répondre avec succès
    return res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error("Error during product deletion:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error" });
    }
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  try {
    // Extraction des données du corps de la requête
    const { name, price, priceSale, description } = req.fields;
    const { image } = req.files; // Pour gérer l'image si elle est incluse

    // Validation des champs obligatoires
    if (!name) return res.status(400).json({ error: "Product name is required" });
    if (!price) return res.status(400).json({ error: "Product price is required" });
    if (!description) return res.status(400).json({ error: "Product description is required" });

    // Vérifier si priceSale est fourni et valide (si non, le mettre à null ou à un autre valeur par défaut)
    const priceSaleValue = priceSale ? priceSale : null; 

    // Recherche du produit par ID
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Mise à jour des informations du produit
    product.name = name;
    product.price = price;
    product.priceSale = priceSaleValue; // Mise à jour du prix promotionnel
    product.description = description;

    // Si une nouvelle image est incluse, mise à jour de l'image du produit
    if (image) {
      product.image = image[0].path; // Assurez-vous d'utiliser le chemin correct selon votre configuration de stockage
    }

    // Sauvegarde du produit avec les nouvelles informations
    await product.save();

    // Réponse de succès
    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    res.status(500).json({
      error: error.message || "An error occurred while updating the product",
    });
  }
});



  const getTopPurchasedProducts = asyncHandler(async (req, res) => {
    try {
      // Étape 1 : Agréger les produits les plus achetés
      const productsStats = await Order.aggregate([
        { $match: { status: "Completed" } }, 
        { $unwind: "$orderItems" },
        {
          $group: {
            _id: { $toObjectId: "$orderItems.product" },
            totalQuantity: { $sum: "$orderItems.qty" },
          },
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 10 },
      ]);
    
      const topProducts = await Product.find({
        _id: { $in: productsStats.map((stat) => stat._id) },
      }).lean();
  
      const result = productsStats.map((stat) => {
        const product = topProducts.find(
          (prod) => prod._id.toString() === stat._id.toString()
        );
        return {
          ...product,
          totalQuantity: stat.totalQuantity,
        };
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching top products:", error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  

  
export {
    addProduct,
    getAllProducts,
    getProductById,
    removeProduct,
    updateProduct,
    getTopPurchasedProducts
  };