import React, { useState } from "react";

function App() {
  const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 50000 },
    { id: 2, name: "Phone", category: "Electronics", price: 25000 },
    { id: 3, name: "Shoes", category: "Fashion", price: 2000 },
    { id: 4, name: "T-Shirt", category: "Fashion", price: 800 }
  ];

  const [filter, setFilter] = useState("All");

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter(
          (product) => product.category === filter
        );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Listing UI</h1>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
      </select>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
      
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              width: "200px",
              borderRadius: "10px"
            }}
          >
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>₹{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;