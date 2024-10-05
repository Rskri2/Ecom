import axios from "axios";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input,Checkbox,message,Upload,Select} from 'antd';
import { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import moment from "moment";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const { TextArea } = Input;
export default function AddProduct() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [image, setImageUrl] = useState(null);
  const submitForm = async(values)=>{
    let toUpload = values;
    if(image) toUpload.imageUrl = image
    toUpload.id = id;
      try{
        await axios.put(`${BASE_URL}/api/products/${id}`, toUpload);
        message.success("Product updated successfully");
      } catch(err){
       
        message.error(err.message)
      }

    }
    
    const handleCustomRequest = async ({file, onSuccess, onError}) => {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;
    
      if(file.type.startsWith('image/') || file.type.startsWith("video/")){
          const form = new FormData();
          form.append("file", file);
          form.append("upload_preset", "chat_app")
         
          try{
            const response = await axios.post(url, form, {
              "Content-Type":"multipart/form-data"
            })
            onSuccess()
            setImageUrl(response.data.secure_url);
             console.log(response)
          } catch(err){
              onError(err.message)
              message.error(err.message);
          }
      }
      
  }
  const [product, setProducts] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProducts(response.data);
        let currDate = response.data.releaseDate.split("-");
        currDate= moment(new Date(currDate[2], currDate[1]-1, currDate[0])); 
        
        form.setFieldsValue({
            name:response.data.name,
            brand:response.data.brand,
            category:response.data.category,
            releaseDate:currDate,
            price:response.data.price,
            quantity:response.data.quantity,
            description:response.data.description,
            available:response.data.available,
        });

        setImageUrl(response.data.imageUrl)
        

      } catch (err) {
        message.error(err.message);
      }
    };
    fetch();
  }, [id]);
    return (
<>
<div className='flex items-center flex-col mt-20'>
  <div className='text-3xl font-bold'>Update Product</div>
  <Form
  form={form}
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 14,
    }}
    layout="horizontal"
     className='w-[800px]'
   onFinish={submitForm}
   initialValues={product}
  >
    <Form.Item name="name">
      <Input placeholder='Name' name='names'/>
    </Form.Item>
    <Form.Item name="brand">
      <Input placeholder='Brand' />
    </Form.Item >
  <Form.Item name="category">
    <Select label ="Select" placeholder="Category">
      <Select.Option value="Laptop">Laptop</Select.Option>
      <Select.Option value="Headphone">Headphone</Select.Option>
      <Select.Option value="Mobile">Mobile</Select.Option>
      <Select.Option value="Electronics">Electronics</Select.Option>
      <Select.Option value="Toys">Toys</Select.Option>
      <Select.Option value="Fashion">Fashion</Select.Option>
    </Select>
  </Form.Item>
    <Form.Item name="releaseDate" >
      <DatePicker />
    </Form.Item>
    <Form.Item name="price">
      <Input placeholder='Price' />
    </Form.Item>
    <Form.Item name="quantity">
      <Input placeholder='Quantity'/>
    </Form.Item>
    <Form.Item name="description" >
      <TextArea rows={4} placeholder="Description" />
    </Form.Item>

    <Form.Item name="available"  valuePropName="checked">
        <Checkbox>Product available</Checkbox>

    </Form.Item>
    <img src = {image} className="h-[200px]"></img>
      <Upload  customRequest={handleCustomRequest} maxCount={1} >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    <Form.Item className="mt-5">
    <Button type="primary" htmlType='submit'>
    <PlusOutlined />Update Product</Button>
    </Form.Item>
  </Form>
</div>
</>
  )
}
