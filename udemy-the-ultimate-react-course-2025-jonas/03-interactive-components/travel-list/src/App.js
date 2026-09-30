import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  const [itemList, setItemList] = useState(initialItems);

  function handleAddItem(item) {
    setItemList(il => {
      if (il.find(it => it.description === item.description)) {
        return il.map(it => (it.description === item.description ? {...it, quantity: it.quantity + item.quantity} : it))
      }

      const id = il.map(i => i.id).reduce((pre, cur) => Math.max(pre, cur), 0) + 1;
      const it = {...item, id: id};
      return [...il, it];
    });
  }

  function handleDeleteItem(id) {
    setItemList(il => il.filter(it => it.id !== id));
  }

  function handleToggleItem(id) {
    setItemList(il => il.map(it => (it.id === id ? {...it, packed: !it.packed} : it)));
  }

  function handleClearList() {
    const confirmed = window.confirm('Are you sure to remove all items?');
    if (confirmed)
      setItemList([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem}/>
      <PackingList itemList={itemList} onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem} onClearList={handleClearList}/>
      <Stats items={itemList} />
    </div>
  );
}


