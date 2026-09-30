import { useState } from "react";
import Item from "./Item";

export default function PackingList({ itemList, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input');

  function sortedItems() {
    if (sortBy === 'input') {
      return itemList.toSorted((a, b) => a.id - b.id);
    } else if (sortBy === 'description') {
      return itemList.toSorted((a, b) => a.description.localeCompare(b.description));
    } else {
      return itemList.toSorted((a, b) => Number(a.packed) - Number(b.packed));
    }
  }

  function handleSortBy(sortType) {
    setSortBy(sortType);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems().map(item => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />

        ))}
      </ul>

      <div className="actions">
        <select name="sort-by" onChange={(e) => handleSortBy(e.target.value)} value={sortBy}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => onClearList()}>Clear List</button>
      </div>
    </div>
  );
}
