import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"
import AddProduct from "./components/AddProduct"
import ProductCard from "./components/ProductCard"
import UpdateProduct from "./components/UpdateProduct"
export default function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <div >
        <Header />
        <HomePage />
        <Footer/>
      </div>
    }
    
      />
      <Route path="/products/:id?" 
      element={
        <>
        <Header/>
        <ProductCard/>
        <Footer/>
      </>
      }
      ></Route>
      <Route path="/update-product/:id?" 
      element={
        <>
        <Header/>
        <UpdateProduct/>
        <Footer/>
      </>
      }
      ></Route>

      <Route path="/add-product" 
      element={
        <>
        <Header/>
        <AddProduct/>
        <Footer/>
      </>
      }
      ></Route>
    
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

