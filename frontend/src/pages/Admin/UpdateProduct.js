import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../Redux/api/productApiSlice";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const UpdateProduct = () => {
  const { _id: productId } = useParams();
  const navigate = useNavigate();

  // Queries & Mutations
  const { data: productData, isLoading: isProductLoading } = useGetProductByIdQuery(productId);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // State
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Effect: Sync initial product data to state
  useEffect(() => {
    if (productData) {
      setImage(productData.image || "");
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
    }
  }, [productData]);


// Update Product Handler
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    await updateProduct({ productId, formData }).unwrap();
    navigate("/admin/allproductslist");
    toast.success("Product updated successfully!", { autoClose: 2000 });
  } catch (err) {
    console.error(err);
    toast.error("Product update failed. Try again.", { autoClose: 2000 });
  }
};



  // Delete Product Handler
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
  
    try {
      const response = await deleteProduct(productId).unwrap();
      console.log("Delete response:", response); // Vérifiez la réponse de l'API
      toast.success("Product deleted successfully!", { autoClose: 2000 });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Product deletion failed. Try again.", { autoClose: 2000 });
    }
  };
  

  if (isProductLoading) return <Loading/>;

  return (
<div className="container mx-auto p-6 sm:p-4 md:px-10 lg:px-20 xl:px-36">
  <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-white mb-8 text-center">
      Update / Delete Product
    </h2>

    {/* Image Preview */}
    {image && (
      <div className="text-center mb-8">
        <img
          src={image}
          alt="product"
          className="max-h-[200px] mx-auto rounded-lg shadow-md"
        />
      </div>
    )}

    {/* Product Details */}
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-gray-400 mb-2">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-gray-400 mb-2">
          Price ($)
        </label>
        <input
          type="number"
          id="price"
          min="0" step="0.01"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500 focus:outline-none"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-gray-400 mb-2">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-500 focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <button
        onClick={handleSubmit}
        className="w-full sm:w-auto flex-grow py-3 rounded-lg text-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition"
      >
        Update
      </button>
      <button
        onClick={handleDelete}
        className="w-full sm:w-auto flex-grow py-3 rounded-lg text-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  </div>
</div>

  );
};

export default UpdateProduct;
