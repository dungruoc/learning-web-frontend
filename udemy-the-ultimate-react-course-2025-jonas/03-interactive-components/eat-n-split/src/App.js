import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectedId, setSelectedId] = useState(-1);

  function addNewFriendHdl(newFriend) {
    const userId = newFriend.image.split('?').at(-1).slice(2);
    setFriendList(fl => [...fl, {...newFriend, id: userId}]);
  }

  function handleSelectFriend(id) {
    if (selectedId === id)
      setSelectedId(-1);
    else
      setSelectedId(id)
  }

  function handleSplit(id, balance) {
    setFriendList(fl => fl.map(fr => fr.id === id ? {...fr, balance: fr.balance + balance} : fr));
  }

  const selectedFriend = friendList.find(fr => fr.id === selectedId)

  return (
    <div className="app">
      <SideBar friendList={friendList} selectedId={selectedId}
        addNewFriendHdl={addNewFriendHdl} onSelectFriendHdl={id => handleSelectFriend(id)}/>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} splitHndl={handleSplit} closeSplitForm={() => setSelectedId(-1)} />}
    </div>
  );
}

function SideBar({friendList, selectedId, addNewFriendHdl, onSelectFriendHdl}) {
  const [showForm, setShowForm] = useState(false);
  
  function toggleForm() {
    setShowForm(s => !s);
  }

  return (
    <div className="sidebar">
      <FriendList friendList={friendList} selectedId={selectedId}
        onSelectFriendHdl={onSelectFriendHdl}/>
        {showForm && <FormAddFriend closeForm={() => toggleForm()} addNewFriendHdl={addNewFriendHdl}/> }
      <Button onClickHdl={toggleForm}>{showForm ? 'Close' : 'Add Friend'}</Button>
    </div>
  )
}

function FriendList({friendList, selectedId, onSelectFriendHdl}) {
  return (
    <ul>
      {friendList.map((friend) =>
        <Friend friend={friend} key={friend.id} onSelectFriendHdl={onSelectFriendHdl} selected={friend.id === selectedId} />
      )}
    </ul>
  );
}

function Friend({friend, selected, onSelectFriendHdl}) {
  return (
    <li className={selected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {friend.balance < 0  && <p className="red">{`You owe ${friend.name} ${friend.balance}`}</p>}
      {friend.balance > 0  && <p className="green">{`${friend.name} owes you ${friend.balance}`}</p>}
      {friend.balance === 0  && <p>No share with {`${friend.name}`}</p>}
      <Button onClickHdl={() => onSelectFriendHdl(friend.id)}>{selected ? 'Close' : 'Select'}</Button>
    </li>
  )
}

function Button({children, onClickHdl}) {
  return <button className="button" onClick={onClickHdl}>{children}</button>
}

function FormAddFriend({addNewFriendHdl, closeForm}) {
  const [friendName, setFriendName] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  function friendNameChangedHdl(name) {
    setFriendName(name);
  }

  function imgUrlChangedHdl(imgUrl) {
    setImgUrl(imgUrl);
  }

  function onSubmitHdl(e) {
    e.preventDefault();
    if (friendName.length > 0) {
      addNewFriendHdl({
        name: friendName,
        image: imgUrl,
        balance: 0
      });

      setFriendName('');
      setImgUrl('');
      closeForm();      
    }
  }

  return (
    <form className="form-add-friend">
      <label htmlFor="friend-name">👭 Friend Name</label>
      <input type="text" name="friend-name" id="friend-name" placeholder="John ..."
        value={friendName} onChange={(e) => friendNameChangedHdl(e.target.value)} />
      <label htmlFor="img-url">📷 Image URL</label>
      <input type="text" name="img-url" id="img-url" placeholder="https://..."
        value={imgUrl} onChange={e => imgUrlChangedHdl(e.target.value)} />
      <Button onClickHdl={(e) => onSubmitHdl(e)}>Add</Button>
    </form>
  )
}

function FormSplitBill({selectedFriend, splitHndl, closeSplitForm}) {
  const [bill, setBill] = useState(0);
  const [expense, setExpense] = useState(0);
  const [whoPaid, setWhoPaid] = useState(0);

  const friendExpense = bill - expense;
  const balance = (whoPaid === 0) ? friendExpense : -expense;

  function handleSplit(e) {
    e.preventDefault();
    // console.log(selectedFriend, balance);
    splitHndl(selectedFriend.id, balance);
    closeSplitForm();
  }

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label htmlFor="bill">💰 Bill value</label>
      <input type="number" name="bill" id="bill" step={0.01} placeholder="0"
        value={bill} onChange={(e) => setBill(Number(e.target.value))} />
      <label htmlFor="expense">💳 Your expense</label>
      <input type="number" name="expense" id="expense" step={0.01} placeholder="0"
        value={expense} onChange={(e) => setExpense(Number(e.target.value))} />
      <label>👭 {selectedFriend.name}' expense</label>
      <input type="number" name="friend-expense" id="friend-expense" disabled={true}
        value={friendExpense}  />
      <label htmlFor="paid">🤑 Who paid the bill?</label>
      <select name="paid" id="paid" value={whoPaid} onChange={(e) => setWhoPaid(Number(e.target.value))}>
        <option value={0}>You</option>
        <option value={1}>{selectedFriend.name}</option>
      </select>

      <Button onClickHdl={handleSplit}>Split bill</Button>
    </form>
  );
}