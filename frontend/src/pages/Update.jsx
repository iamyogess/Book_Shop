import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const bookID = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/books/${bookID}`, book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form flex justify-center items-center">
      <h1>Update The Books</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="file"
        placeholder="CoverPicture"
        name="cover"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        onChange={handleChange}
      />
      <button onClick={handleClick}>
        <Link to="/">Update</Link>
      </button>
    </div>
  );
};

export default Update;
