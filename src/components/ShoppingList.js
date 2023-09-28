import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchChange, setSearchChange] = useState("");
  const [itemsToAdd, setItemsToAdd] = useState([]);

  function addItem(newItem) {
    if (newItem.name !== "") {
      setItemsToAdd([...itemsToAdd, newItem]);
    }
  }

  function handleCategoryChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    setSearchChange(value);
  };

  const filteredItems = items.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const searchMatch = item.name.toLowerCase().includes(searchChange.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={addItem} />
      <Filter 
        handleInputChange={handleInputChange}
        onSearchChange={handleInputChange} 
        onCategoryChange={handleCategoryChange} 
        value={searchChange}
        search={searchChange}
      />
      <ul className="Items">
        {filteredItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
        {itemsToAdd.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
