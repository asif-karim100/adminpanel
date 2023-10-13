import React, { useCallback, useEffect, useState } from "react";
import MedicineContext from "./medicine-context";

const MedicineProvider = (props) => {
  const [medicineItems, setMedicineItems] = useState([]);

  const url =
    "https://crudcrud.com/api/f8936bb0c4624c7cb9a98c5332883269/products";

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMedicineItems(data);
    } catch (error) {
      console.log(error);
    }
  },[]);

  const addProductHandler = async (item) => {
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const medicineContext = {
    medicineItems: medicineItems,
    addProduct: addProductHandler,
  };

  return (
    <MedicineContext.Provider value={medicineContext}>
      {props.children}
    </MedicineContext.Provider>
  );
};

export default MedicineProvider;
