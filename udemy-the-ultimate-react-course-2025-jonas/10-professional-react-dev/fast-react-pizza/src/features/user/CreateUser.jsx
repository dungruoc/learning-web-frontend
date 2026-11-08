import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../ui/Button';
import { updateUserName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const navitate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userName)
      return;

    dispatch(updateUserName(userName));
    setUserName('');
    navitate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base'>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className='input w-72 mb-8'
      />

      {userName !== '' && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;