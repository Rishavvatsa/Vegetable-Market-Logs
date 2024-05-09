import React, { useState } from "react";
import { toast } from "react-hot-toast";
import "../Css/style.css";
import Footer from "./Footer";
import B1 from "../Pages/Banner/B1";
import i1 from "../assets/catergory/i1.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        toast.success("Contact message sent successfully");
      } else {
        toast.error("Failed to send contact message");
      }
    } catch (error) {
      console.error("Error sending contact message:", error);
      toast.error("An error occurred while sending the message");
    }
  };

  return (
    <div className=" contact-us-container relative top-20 bottom-10">
      <B1 bannerimage={i1} heading="Contact Us" />
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>
          If you have any questions or inquiries, feel free to contact us using
          the details below:
        </p>
        <ul>
          <li>
            <i className="fas fa-envelope"></i> Email:E-Sabjiwala@gmail.com
          </li>
          <li>
            <i className="fas fa-phone"></i> Phone: +123-456-7890
          </li>
          <li>
            <i className="fas fa-map-marker-alt"></i>{" "}
            Address:Dehradun,Uttarakhand
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
