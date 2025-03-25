import { React, useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Get Categories List

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    let results = await fetch("https://dummyjson.com/products/categories");

    results = await results.json();
    setCategories(results);
  };

  return (
    <div className="row justify-content-center">
      {categories.map((item, i) => (
        <div
          key={item.name}
          className="col-lg-2 col-md-2 col-sm-6 col-xs-6 mb-2"
        >
          <button type="button" className="btn btn-primary btn-lg fill-block">
            {item.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
