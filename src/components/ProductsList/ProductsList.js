import React, { useEffect, useState } from "react";

import ProductCard from "../ProductCard/ProductCard";

import "./ProductsList.css";

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        {/* Сюда добавлю реальные карточки во второй части*/}
        const sampleProducts = [
            { title: "Product 1", description: "Description 1", price: 100, amount: 10 },
            { title: "Product 2", description: "Description 2", price: 200, amount: 5 },
            { title: "Product 3", description: "Description 3", price: 300, amount: 8 },
            { title: "Product 4", description: "Description 4", price: 400, amount: 12 },
            { title: "Product 5", description: "Description 5", price: 500, amount: 15 },
            { title: "Product 6", description: "Description 6", price: 600, amount: 7 },
            { title: "Product 7", description: "Description 7", price: 700, amount: 20 },
            { title: "Product 8", description: "Description 8", price: 800, amount: 10 },
            { title: "Product 9", description: "Description 9", price: 900, amount: 6 },
            { title: "Product 10", description: "Description 10", price: 1000, amount: 14 },
        ];

        setProducts(sampleProducts);
    }, []);

    return (
        <div className="products-list-container">
            <h2>Products</h2>
            <div className="products-grid">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        amount={product.amount}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsList;
