import axios from "axios";
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input,Checkbox,message,Upload,Select} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
import { useState } from 'react';
const { TextArea } = Input;
export default function AddProduct() {
  const [form] = Form.useForm();
  const [image, setImageUrl] = useState(null);
  const submitForm = async(values)=>{

      let toUpload = values;
      toUpload["imageUrl"] = image;
      console.log(toUpload)
      try{
        await axios.post(`${BASE_URL}/api/products`, toUpload);
        message.success("Product added successfully");
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
             
          } catch(err){
              onError(err.message)
              message.error(err.message);
          }
      }
      
  }

    return (
<>
<div className='flex items-center flex-col mt-20'>
  <div className='text-3xl font-bold'>Add Product</div>
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
   
  >
    <Form.Item name="name">
      <Input placeholder='Name' name='names'/>
    </Form.Item>
    <Form.Item name="brand">
      <Input placeholder='Brand' />
    </Form.Item >

    <Form.Item name="category">

    <Select label ="Select" placeholder="Category">
        <Select.Option value="Laptop">Salary</Select.Option>
        <Select.Option value="Headphone">Freelancing</Select.Option>
        <Select.Option value="Mobile">Investment</Select.Option>
        <Select.Option value="Electronics">Stock</Select.Option>
        <Select.Option value="Toys">Bank</Select.Option>
        <Select.Option value="Fashion">Salary</Select.Option>
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
      <Upload  customRequest={handleCustomRequest} maxCount={1} >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    <Form.Item className="mt-5">
    <Button type="primary" htmlType='submit'>
    <PlusOutlined />Add Product</Button>
    </Form.Item>
  </Form>
</div>
</>
  )
}
