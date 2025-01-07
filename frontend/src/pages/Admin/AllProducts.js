
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../Redux/api/productApiSlice";
import Loading from "../../components/Loading";
const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
<>
  <div>
    <div className="flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
          <div className="text-xl font-bold text-white">All Products ({products.length})</div>
          <Link
            to="/admin/allproductslist/CreateProduct"
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            Create Product
          </Link>
        </div>

        <div className="grid gap-6 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/admin/product/${product._id}`}
              className="block overflow-hidden bg-white shadow-lg rounded-lg hover:shadow-xl transition"
            >
              <div className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h5 className="text-lg font-semibold text-gray-800 truncate">{product?.name}</h5>
                  <p className="text-gray-500 text-xs">
                    {moment(product.createdAt).format("MMMM Do YYYY")}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {product?.description?.substring(0, 160)}...
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
                  <p className="text-lg font-semibold text-gray-800">$ {product?.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
</>

  );
};

export default AllProducts;
