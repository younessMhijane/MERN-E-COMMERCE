import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../Redux/api/productApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
<div className="container mx-auto px-4 xl:px-36 lg:px-20 md:px-10 sm:px-4 p-4">
<div className="flex flex-col md:flex-row">
    <div className="md:w-3/4 p-4 bg-gray-800 rounded-lg shadow-lg">

      
      <h2 className="text-2xl font-bold text-white mb-6">Create Product</h2>
    <div className="sm:flex gap-5">

        <div className="space-y-6">
            <div className="flex flex-wrap gap-6">

            <div className="w-full">
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                type="text"
                className="p-4 w-full border rounded-lg bg-gray-900 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                />
            </div>

            <div className="w-full">
                <label htmlFor="price" className="block text-gray-300 mb-2">Price</label>
                <input
                type="number"
                className="p-4 w-full border rounded-lg bg-gray-900 text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                />
            </div>
            </div>

            <div>
            <label htmlFor="description" className="block text-gray-300 mb-2">Description</label>
            <textarea
                className="p-4 w-full bg-gray-900 border rounded-lg text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows="5"
            ></textarea>
            </div>
        </div>
        <div className={imageUrl ?"":"sm:w-1/2"}>
        {imageUrl && (
            <div className="text-center mb-6">
            <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[400px] rounded-lg shadow"
            />
            </div>
        )}

        <div className="mb-6 ">
            <label 
            className={image? 
                "h-[50px] border border-dashed border-gray-500 py-3 bg-gray-700 text-white block w-full text-center rounded-lg cursor-pointer font-bold"
                :
                "sm:h-[200px] flex items-center justify-center border border-dashed border-gray-500 py-3 bg-gray-700 text-white block w-full text-center rounded-lg cursor-pointer font-bold"
            }>
            {image ? "Another Image ?" : "Upload Image"}
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
            />
            </label>
        </div>
        </div>

    </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="w-full py-4 text-lg font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProductList;