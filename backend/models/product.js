import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        titre:{type:String,require:true,},
        prix:{type:Number,require:true,},
        description:{type:String,require:true,},
    },
    {
        timestamps:true,
    }
);
const Product=mongoose.model('Product',productSchema);
export default Product;