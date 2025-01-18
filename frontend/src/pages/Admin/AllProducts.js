import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../Redux/api/productApiSlice";
import Loading from "../../components/Loading";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg font-semibold text-red-600 mb-4">Error loading products. Please try again later.</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between p-4 bg-violet-900 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-white">
          All Products ({products?.length || 0})
        </h1>
        <Link
          to="/admin/allproductslist/CreateProduct"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Create Product
        </Link>
      </div>

      <div className="grid gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="block bg-violet-50 shadow-lg rounded-lg hover:shadow-xl transition"
          >
            <div className="p-4">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name || "Product Image"}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-lg font-semibold text-gray-800 truncate">
                    {product?.name || "Unnamed Product"}
                  </h5>
                  <p className="text-gray-500 text-xs">
                    {moment(product.createdAt).format("MMMM Do YYYY")}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {product?.description
                    ? `${product.description.substring(0, 50)}...`
                    : "No description available."}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/admin/allproductslist/update/${product._id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Update
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
                <p className="text-lg font-semibold text-gray-800">
                  {product?.priceSale && product?.priceSale > 0 ? (
                    <>
                      <span className="text-red-500 line-through">{product?.price?.toFixed(2)} DH</span>
                      <span className="ml-2">{product?.priceSale?.toFixed(2) || "0.00"} DH</span>
                    </>
                  ) : (
                    `${product?.price?.toFixed(2)} DH`
                  )}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
