import { useEffect, useState } from "react";
import "./App.css";
import ProductGrid from "./components/ProductGrid";
import Header from "./components/shared/Header";

function App() {
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setStoreData(data);
    };
    fetchStoreData();
  }, []);

  console.log(storeData);

  return (
    <>
      <Header />
      <ProductGrid products={storeData} />
    </>
  );
}

export default App;
