import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/books", book);
    navigate("/");

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form flex justify-center items-center">
      <h1>Add New Books</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="desc onChange={handleChange}"
      />
      <input
        type="text"
        placeholder="Cover Picture"
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
        <Link to="/">Add</Link>
      </button>
    </div>
  );
};

export default Add;
