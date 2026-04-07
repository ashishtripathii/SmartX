import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaFileCode } from "react-icons/fa";
import axios from "axios";
import aiLogo from "../assets/gemini-color.png";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";

const ProductUpload = () => {
  const {userData} =  useSelector((state)=> state.user);
  const {token} = useSelector((state)=> state.auth);
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [condition, setCondition] = useState("Used");
  const [formdata, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    location: "",
    contactNumber: "",
  });
  const [images,setImages] = useState([]);
  const [descLoading,setDescLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const productData = location?.state;

  console.log("productData",productData);
  


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImageChange = (e)=>{
   const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles); 
  }


  const imageRemoveHandler = (imageIndex)=>{
  const remainImages =   images.filter((img,index)=> index!==imageIndex);
  setImages(remainImages);
  }
  


  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getAllCategories`
      );

      if (!response?.data?.success) {
        throw new Error("Error occur during fetching all categories");
      }
      setAllCategories(response?.data?.allCategories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const submitHandler = async(e)=>{
    e.preventDefault();

    if(descLoading){
      return ;
    }

    const formData =  new FormData();
    formData.append("productName",formdata.productName);
    formData.append("contactNumber",formdata.contactNumber);
    formData.append("categoryId",formdata.category);
    formData.append("location",formdata.location);
    formData.append("price",formdata.price);
    formData.append("condition",condition);
    formData.append("sellerId",userData?._id);
    formData.append("description",formdata.description);

    for(let i = 0; i<images.length; i++){
       formData.append("images",images[i]);
    }

    const toastId = toast.loading("Uploading product...");
    try {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload-product`,formData,{
          headers:{
            Authorization:'Bearer '+token,
          }
        });

        if(!response?.data?.success){
            throw new Error("Error occur during uploading product");
        }
        toast.dismiss(toastId);
        navigate("/myproducts");
        toast.success(response?.data?.message);
        setLoading(false);     
    } catch (error) {
       setLoading(false);
       toast.dismiss(toastId);
       console.log(error);
       toast.error(error.response?.data?.message || "Something went wrong");
        
    }

  
  }

  const productUpdateHandler = async(e)=>{
    e.preventDefault();
    
     if(descLoading){
      return ;
    }

    if(formdata.category === productData?.category && formdata.contactNumber === productData?.contactNumber &&
       formdata.description === productData?.description && formdata.location === productData?.location &&
       formdata.price === productData?.price && formdata.productName === productData?.productName && 
       condition === productData?.condition){
        toast.error("Changes not found");
        return ;
       }

    const toastId = toast.loading("Updating product...");

   try {

    setLoading(true);
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/editProduct`,formdata,{
      headers:{
        Authorization:'Bearer '+token,
      }
    });

    if(!response?.data?.success){
      throw new Error("Error occur during updating product");
    }

    toast.dismiss(toastId);
    navigate("/myproducts");
    toast.success(response?.data?.message);
    setLoading(false);  
   } catch (error) {
    console.log(error);
    toast.dismiss(toastId);
    setLoading(false);
    toast.error(error.response?.data?.message || "Something went wrong");  
   }
  }


  const productDescriptionEnhancerHandler = async()=>{
    if(loading){
      return ;
    }

    if(formdata.description.length < 10){
        toast.error("Product description is too short");
         return ;
      }

      const data = {
        description:formdata.description,
      }
    try {
      setDescLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/productDescriptionEnhancer`,
        data,{
          headers:{
            Authorization:'Bearer '+token,
          }
        }
      );

      if(!response?.data?.success){
        throw new Error("Error occur during enhancing the product description");
      }

      setFormData({...formdata,description:response?.data?.response});

      setDescLoading(false);  
    } catch (error) {
      console.log(error);
      setDescLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");     
    }
  }
    
    useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(()=>{
    if(productData){
    setFormData(productData);
    setCondition(productData?.condition);
    }
  },[productData])

  return (
    <div className="bg-slate-950 text-slate-300 min-h-screen px-4 md:px-8 lg:px-14 py-10">
      <Typography
        variant="h5"
        sx={{
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: "20px",
          color: "#e2e8f0",
          letterSpacing: "0.06em",
        }}
        align="center"
      >
      {
        productData ? "Update" : "Post"
      }   your Ad
      </Typography>
      <div className="w-full lg:w-[82%] mx-auto border rounded-2xl border-slate-800 bg-slate-900/80 p-4 md:p-6 shadow-[0_20px_50px_rgba(2,6,23,0.55)]">
        <form className="flex flex-col gap-4" onSubmit={productData ? productUpdateHandler : submitHandler}>
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#cbd5e1",
            }}
          >
            Include some details
          </Typography>

          {/* product name  */}
          <TextField
            type="text"
            variant="filled"
            fullWidth
            inputProps={{
              style: {
                color: "white",
                background: "#1F2937",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{
                    color: "white",
                  }}
                >
                  <img
                    src={aiLogo}
                    alt="aiLogo"
                    className="h-9 w-9 rounded-full object-cover cursor-pointer"
                  />
                </InputAdornment>
              ),
            }}
            label="Product Name"
            placeholder="Enter your product name"
            InputLabelProps={{
              sx: {
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
              },
            }}
            required
            name="productName"
            value={formdata.productName}
            onChange={changeHandler}
          />

          {/* product description */}
          <div className="relative">
            <label>
              <div className="flex items-center gap-4">
                <p className="text-[18px] text-slate-200">
                  Description <sup>*</sup>{" "}
                </p>
              </div>
              <textarea
                className="bg-slate-800 border border-slate-700 text-slate-100 rounded-md w-full outline-none p-3 focus:border-indigo-500"
                placeholder="Include condition, features and reason for selling"
                rows={4}
                onChange={changeHandler}
                name="description"
                value={formdata.description}
              ></textarea>
            </label>
            {

                descLoading ? ( <i className="fa-solid fa-spinner absolute right-2 bottom-4 animate-spin"></i>)
                : 
                (<img
              src={aiLogo}
              alt="aiLogo"
              className="h-8 w-8 rounded-full object-cover cursor-pointer absolute right-2 bottom-4"
              onClick={productDescriptionEnhancerHandler}
            />)

            }
           
          </div>

          {/* location  */}
          <TextField
            type="text"
            variant="filled"
            fullWidth
            inputProps={{
              style: {
                color: "white",
                background: "#1F2937",
              },
            }}
            label="Location"
            placeholder="Enter your location"
            InputLabelProps={{
              sx: {
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
              },
            }}
            required
            onChange={changeHandler}
            value={formdata.location}
            name="location"
          />

          {/* contact number  */}

          <TextField
            type="number"
            variant="filled"
            fullWidth
            inputProps={{
              style: {
                color: "white",
                background: "#1F2937",
              },
            }}
            label="Contact Number"
            placeholder="Enter your contact number"
            InputLabelProps={{
              sx: {
                color: "white",
                "&.Mui-focused": {
                  color: "white",
                },
              },
            }}
            required
            onChange={changeHandler}
            value={formdata.contactNumber}
            name="contactNumber"
          />

          {/* set a price  */}
          <div>
            <Typography
              variant="h6"
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                marginTop: "8px",
                color: "#cbd5e1",
              }}
            >
              Set a price
            </Typography>

            {/* price  */}
            <TextField
              type="number"
              variant="filled"
              fullWidth
              inputProps={{
                style: {
                  color: "white",
                  background: "#1F2937",
                },
              }}
              label="Product Price"
              placeholder="Enter your product price"
              InputLabelProps={{
                sx: {
                  color: "white",
                  "&.Mui-focused": {
                    color: "white",
                  },
                },
              }}
              required
              onChange={changeHandler}
                value={formdata.price}
                name='price'
            />
          </div>

          {/* categories */}
          <label>
            <Typography
              variant="h6"
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "8x",
                color: "#cbd5e1",
              }}
            >
              Product Category
            </Typography>
            <select className="bg-slate-800 border border-slate-700 rounded-md px-3 py-4 w-full outline-none"
            value={formdata.category}
            name="category"
            onChange={changeHandler}
            >
              <option >
                Choose a Category <sup>*</sup>
              </option>
              {allCategories.map((category, index) => {
                return (
                  <option key={index} value={category?._id}>
                    {category?.categoryName}
                  </option>
                );
              })}
            </select>
          </label>

          {/* condition  */}
          <div className="mt-2">
            <Typography
              variant="h6"
              sx={{ textTransform: "uppercase", fontWeight: 600, color: "#cbd5e1" }}
            >
              Condition of product
            </Typography>

            <div className="flex flex-row gap-4 bg-slate-800 border border-slate-700 w-fit px-4 py-2 rounded-full">
              <div
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  condition === "New" ? "bg-indigo-600 text-white" : "text-slate-300"
                }`}
                onClick={() => {
                  setCondition("New");
                }}
              >
                New
              </div>

              <div
                className={` px-4 py-2 rounded-full cursor-pointer ${
                  condition !== "New" ? "bg-indigo-600 text-white" : "text-slate-300"
                }`}
                onClick={() => {
                  setCondition("Used");
                }}
              >
                Used
              </div>
            </div>
          </div>

          {/* images of product */}
          {
            !productData && <div>
            <Typography
              variant="h6"
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                marginTop: "8px",
                color: "#cbd5e1",
              }}
            >
              Upload Photos{" "}
            </Typography>

            <label>
              <div className="w-full border bg-slate-800 border-slate-600 flex flex-row flex-wrap items-center justify-center gap-3 h-[220px] border-dashed rounded-xl cursor-pointer hover:border-indigo-500 transition-all duration-300">
               
               {
                images.length < 1 && <div className="flex-col gap-2 flex items-center justify-center h-full text-slate-400">
                     <FaFileCode size={40} />
                <p>Your files here or browse to upload</p>
                </div>
               }


             
        
               {
                images.length > 0 && Array.from(images).map((img,index)=>{
                  return <div className="border border-slate-700 rounded-md overflow-hidden relative"key={index}  >
                        <img src={URL.createObjectURL(img)} alt="preview"  className="h-32 w-32 object-cover"/>
                    <div className="absolute top-0 right-0 bg-black/80 cursor-pointer"
                        onClick={()=>{imageRemoveHandler(index)}}>
                            <RxCross2/>
                        </div>
                    </div>
                })
              }
         
              </div>
              
          {
                   images.length < 1 &&   <input type="file" className="hidden" multiple onChange={handleImageChange} />

              }
              
       

            </label>
          </div>
          }
          

      <div>
            <Button
            fullWidth
        
            variant="contained"
            size="large"
            sx={{ textTransform:"none",fontWeight:600 }}
            type="submit"
          >
            {
              productData ? "Update product" : "Post now"
            }
            
          </Button>
                   {
            loading &&  <i className="fa-solid text-slate-100 fa-spinner animate-spin -ml-8"></i>
           }
      </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;
