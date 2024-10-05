import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, Avatar, List, Skeleton,Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export default function Header() {
  const location = useLocation();
  const [search, setSearch] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const searchItems = async (e) => {
    if(e.target.value.length >= 1){
      setSearch(true);
      const response = await axios.get(
        `${BASE_URL}/api/products/search?keyword=${e.target.value}`
      );
      setData(response.data);
      
    } else 
      setSearch(false)
    
  };
  const handleChange =(value)=>{
    navigate(location.pathname === "/"
      ? `/${value}`
      : `${location.pathname.split("/")[0]}/${value}`);
    console.log(value)
  }
  return (
    <header className="sticky top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          <div className="flex flex-1 items-center">
            <ul className="flex flex-row">
              <li className="mx-2">
                <Link to="/">Home</Link>
              </li>
              <li className="mx-2">
            <Select label ="Select" placeholder="Category" onChange={handleChange}>
          <Select.Option value="Laptop">Laptop</Select.Option>
          <Select.Option value="Headphone">Headphone</Select.Option>
          <Select.Option value="Mobile">Mobile</Select.Option>
          <Select.Option value="Electronics">Electronics</Select.Option>
          <Select.Option value="Toys">Toys</Select.Option>
          <Select.Option value="Fashion">Fashion</Select.Option>
        </Select>
              </li>
              <li className="mx-5">
                <Link to="/add-product">Add Product</Link>
              </li>
          
              <li className="mx-5">
                <Link to="/login">Login</Link>
              </li>
              <li className="mx-5">
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
          <ul className="flex flex-1 items-center justify-end gap-3 h-full text-xl">
            <li >
              <Link to = "/cart">
              <ShoppingCartOutlined />
              </Link>
            </li>

            <li>
              <Input
                placeholder="Search here"
                suffix={<SearchOutlined />}
                onChange={searchItems}
              ></Input>
            </li>

            <li></li>
          </ul>
        </div>
        {search && data && (
          <div
            id="scrollableDiv"
            style={{
              height: 250,
              width: 250,
              overflow: "auto",
              position:"absolute",
              right:200,
              backgroundColor:"white",
              border: "1px solid rgba(140, 140, 140, 0.35)",
              zIndex: 100,
            }}
          >
            <InfiniteScroll
              dataLength={data.length}
              loader={
                <Skeleton
                  avatar
                  paragraph={{
                    rows: 1,
                  }}
                  active
                />
              }
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.imageUrl} />}
                      title={
                        <Link
                          to={
                            location.pathname === "/"
                              ? `products/${item.id}`
                              : `${location.pathname.split("/")[0]}/products/${
                                  item.id
                                }`
                          }
                        >
                          {item.name}
                        </Link>
                      }
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        )}
      </div>
    </header>
  );
}
