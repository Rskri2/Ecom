import axios from "axios";
import { useEffect, useState } from "react";
import { Card, message, Result } from "antd";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;
export default function HomePage() {
  message.config({
    duration: 2,
  });
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/products`);
     
        setProducts(response.data);
      } catch (err) {
        message.error(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 place-items-center mt-10">
        {products &&
          products.map((prod, index) => {
            return (
              <Link to={`products/${prod.id}`} key={index}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                    zIndex: 0
                  }}
                  cover={
                    <img
                      alt="example"
                      src={prod.imageUrl}
                      className="h-[200px]"
                    />
                  }
                >
                  <div className="font-bold text-xl">
                    {prod.name.toUpperCase()}
                  </div>
                  <div className="font-semibold">~{prod.brand}</div>

                  <div className="font-bold"> ${prod.price} </div>

                  {prod && prod.available && (
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-blue-800 text-gray-200 shadow hover:bg-blue-900 h-8 w-44">
                      Add to cart
                    </div>
                  )}
                  {prod && !prod.available && (
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-blue-800 text-gray-200 shadow hover:bg-blue-900 h-8 w-44 ">
                      Out of stock
                    </div>
                  )}
                </Card>
              </Link>
            );
          })}
      </div>
      {products.length == 0 && <Result title="No products available" />}
    </>
  );
}
