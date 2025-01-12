import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../Redux/api/productApiSlice";
import { toast,ToastContainer } from "react-toastify";
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
      navigate("/admin/dashboard");
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
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Product deletion failed. Try again.", { autoClose: 2000 });
    }
  };

  if (isProductLoading) return <Loading />;

  return (
    <div className="container mx-auto p-6 sm:p-4 md:px-10 lg:px-20 xl:px-36">
      <ToastContainer/>
      <div className="bg-gradient-to-r from-blue-700 to-purple-800 p-6 rounded-lg shadow-lg">

        <h2 className="text-3xl font-bold text-white mb-8 text-center">Update / Delete Product</h2>
        
        <div className="flex mb-3">
          {image && (
            <div className="text-center w-1/2 mb-6 lg:mb-0 lg:mr-6">
              <img
                src={image}
                alt="Product"
                className="max-h-[200px] sm:max-h-[250px] md:max-h-[400px] w-auto mx-auto rounded-lg shadow-lg border border-gray-300 bg-gray-100 hover:scale-105 transform transition duration-300"
              />
            </div>
          )}

          <div className="space-y-6 ">
            <div>
              <label htmlFor="name" className="block text-gray-200 mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg bg-gray-100  border border-gray-700 focus:ring focus:ring-blue-500 focus:outline-none transition duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-200 mb-2">
                Price (DH)
              </label>
              <input
                type="number"
                id="price"
                min="0"
                step="0.01"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-700 focus:ring focus:ring-blue-500 focus:outline-none transition duration-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>


          <div>
            <label htmlFor="description" className="block text-gray-200 mb-2">Description</label>
            <textarea
              id="description"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-700 focus:ring focus:ring-blue-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto flex-grow py-3 rounded-lg text-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="w-full sm:w-auto flex-grow py-3 rounded-lg text-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
