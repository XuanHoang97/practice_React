import React from "react";

export default function Products(props) {
  return (
    <div className="products container d-flex">
      {props.products.map((item,index) => (
        <div className="single_product mr-4" key={index}>
            <h5>{item.title}</h5>
            <p>{item.desc}</p>
            <h5>${item.price}</h5>
        </div>
      ))}
    </div>
  );
}
