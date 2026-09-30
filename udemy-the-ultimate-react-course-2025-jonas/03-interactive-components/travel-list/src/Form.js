import { useState } from "react";

export default function Form({ onAddItem }) {
  const [quantity, setQuantity] = useState(2);
  const [description, setDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const item = {
      description: description.trim().toUpperCase(),
      quantity: quantity,
      packed: false
    };
    if (item.description.length > 0)
      onAddItem(item);
    setQuantity(1);
    setDesc("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, index) => index + 1)
          .map((val) => <option key={val} value={val}>{val}</option>)}
      </select>

      <input type="text" name="item-name" id="item-name" placeholder="Item ..." value={description}
        onChange={(e) => setDesc(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
