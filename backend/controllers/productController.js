import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/product.js";

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
const removeProduct = asyncHandler(async(req,res)=>{
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        res.json({produitDelete:deleteProduct})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
const updateProduct = asyncHandler(async(req,res)=>{
    try {
        const{name, price, description}=req.fields;
        if(!name) return res.json({ error: "Name is required" });
        if(!price) return res.json({ error: "price is required" });
        if(!description) return res.json({ error: "description is required" });
        const product = await Product.findByIdAndUpdate(req.params.id,{ ...req.fields },{ new: true });
        await product.save();
        res.json(product);

    } catch (error) {
        console.error(error);
        res.status(400).json(error.message);
    }
});
export {
    addProduct,
    getAllProducts,
    getProductById,
    removeProduct,
    updateProduct
  };