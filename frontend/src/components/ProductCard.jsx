import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useParams,Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export default function ProductCard() {
  const { id } = useParams();
  const [product, setProducts] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProducts(response.data);

      } catch (err) {
        message.error(err.message);
      }
    };
    fetch();
  }, [id]);

  const addToCart = async(id) =>{
  const token = window.localStorage.getItem("token");
    try {
      if (token) {
        await axios.get(`${BASE_URL}/api/carts/${id}/1`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        message.success("Product added successfully");
      } else message.error("Please log in");
    } catch (err) {
      message.error(err.message);
    }
  }
  const navigate = useNavigate();
  const deleteProduct = async() =>{
    try{
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      navigate("/");
    } catch(err){
      message.error(err.message);
    }
  }
  return (
    <div className="flex place-items-center justify-center items-center justify-items-center mt-10">
      {product && (
        <div  className="flex flex-row items-center place-items-center">
          
          <img src={product.imageUrl} className="h-[300px] "></img>
          <div className=" h-full place-items-center ml-10">
            <div className="text-blue-800">{product.category}</div>
            <div className=" text-5xl ">
              {product.name}
            </div>
            <div className="">{product.brand}</div>
            <div className="">{product.description}</div>
            <hr />
            <div className=""> ${product.price} </div>
            {product && product.available && (
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-blue-800 text-gray-200 shadow hover:bg-blue-900 h-10 w-44" onClick={()=>addToCart(product.id)}>
                Add to Cart
              </div>
            )}
            {product && !product.available && (
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-blue-800 text-gray-200 shadow hover:bg-blue-900 h-14 w-44 ">
                Out of stock
              </div>
            )}
            <div>Stock available:{product.quantity}</div>
            <div>Product listed on:</div>
            <div className="">{product.releaseDate}</div>
            <div className="flex flex-row">
              <Link to = {`/update-product/${id}`}>
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-blue-800 text-gray-200 shadow hover:bg-blue-900 h-8 w-20 px">
               Update
              </div>
              </Link>
              <Link>
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-blue-800 text-gray-200 shadow hover:bg-blue-900 h-8 w-20 mx-2" onClick={deleteProduct}>
                Delete
              </div>
              </Link>
            
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
