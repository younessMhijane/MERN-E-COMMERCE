import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../Redux/api/productApiSlice";
import Loading from "./Loading";
import { addToCart } from "../Redux/features/cart/cartSlice";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
const ProductCart = () => {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
 
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  

  const handleAddToCart = () => {
    if (!userInfo) {
      return toast.error("Please log in or create an account!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !product) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow-md">
          <p className="text-lg font-semibold">Error loading product details.</p>
          <Link
            to="/products"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:mt-10 sm:p-4 md:px-10 lg:px-20 xl:px-36">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-[400px] h-auto rounded-lg shadow-md border border-gray-200"
              style={{ aspectRatio: "1/1", objectFit: "cover" }}
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              {product.description}
            </p>
            <p className="text-2xl font-semibold text-green-600 mb-4">
              Price: {product.price.toFixed(2)} DH
            </p>

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
              <Link
                to="/products"
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
