import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utils/ImagetoBase64";

const UpdateProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImage = async (e) => {
    const imageData = await ImagetoBase64(e.target.files[0]);

    setData((prevData) => ({
      ...prevData,
      image: imageData,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, category, price } = data;
    const productId = "64db124142d6ef2654e00a12";
    if (name && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}api/products/${productId}`, // Replace with the actual product ID
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const fetchRes = await fetchData.json();

      console.log(fetchRes);
      toast(fetchRes.message);

      setData({
        name: "",
        category: "",
        image: "",
        price: "",
      });
    } else {
      toast("Enter required fields");
    }
  };

  return (
    <div className="p-4 relative top-20">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value="other">Select category</option>
          <option value="fruits">Fruits</option>
          <option value="vegetable">Vegetable</option>
        </select>
        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" alt="images" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="text"
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <button className="bg-green-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
