import React, { useState, useEffect } from "react";
import axios from "axios";
const Address = () => {
  const [address, setAddress] = useState({
    pincode: "",
    phone: "",
    houseNo: "",
    roadName: "",
    city: "",
    state: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const fetchCityAndState = async () => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${address.pincode}`
      );

      if (response.data && response.data.length > 0) {
        const city = response.data[0].PostOffice[0].District;
        const state = response.data[0].PostOffice[0].State;
        setAddress((prevAddress) => ({
          ...prevAddress,
          city,
          state,
        }));
      }
    } catch (error) {
      console.error("Error fetching city and state:", error);
    }
  };

  useEffect(() => {
    if (address.pincode.length === 6) {
      fetchCityAndState();
    }
  }, [address.pincode]);

  return (
    <div className="w-full my-4">
      <h2 className="bg-sky-600 text-center text-white p-2 text-2xl">
        Shipping Address
      </h2>
      <div className="flex flex-col p-4 border rounded-md shadow-md">
        <label htmlFor="pincode" className="text-lg font-semibold mb-1">
          Pin Code:
        </label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={address.pincode}
          onChange={handleAddressChange}
          className="border p-2 mb-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your pin code"
        />

        <label htmlFor="phone" className="text-lg font-semibold mb-1">
          Phone Number:
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={address.phone}
          onChange={handleAddressChange}
          className="border p-2 mb-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your phone number"
        />

        <label htmlFor="houseNo" className="text-lg font-semibold mb-1">
          House No:
        </label>
        <input
          type="text"
          id="houseNo"
          name="houseNo"
          value={address.houseNo}
          onChange={handleAddressChange}
          className="border p-2 mb-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your house number"
        />

        <label htmlFor="roadName" className="text-lg font-semibold mb-1">
          Road Name:
        </label>
        <input
          type="text"
          id="roadName"
          name="roadName"
          value={address.roadName}
          onChange={handleAddressChange}
          className="border p-2 mb-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your road name"
        />

        <label htmlFor="colony" className="text-lg font-semibold mb-1">
          Colony:
        </label>
        <input
          type="text"
          id="colony"
          name="colony"
          value={address.colony}
          onChange={handleAddressChange}
          className="border p-2 mb-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your colony"
        />

        <label htmlFor="city" className="text-lg font-semibold mb-1">
          City:
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={address.city}
          onChange={handleAddressChange}
          className="border p-2 mb-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your city"
        />

        <label htmlFor="state" className="text-lg font-semibold mb-1">
          State:
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={address.state}
          onChange={handleAddressChange}
          className="border p-2 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter your state"
        />

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={() => {
            
          }}
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default Address;
