import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/product.js";
import fs from "fs";
import path from "path";

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
      const { name, price, description } = req.fields;
  
      if (!name) return res.status(400).json({ error: "Name is required" });
      if (!price) return res.status(400).json({ error: "Price is required" });
      if (!description) return res.status(400).json({ error: "Description is required" });
  
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
  
      product.name = name;
      product.price = price;
      product.description = description;
  
  
      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
export {
    addProduct,
    getAllProducts,
    getProductById,
    removeProduct,
    updateProduct
  };