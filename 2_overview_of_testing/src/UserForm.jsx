import React, { useState } from 'react';

function UserForm({ onUserAdd }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserAdd({ email, name });
    setEmail('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/** 7. htmlFor MUST contain the id of its ref input, if you want to target input using getByRole w/ second arg */}
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='email'>Enter Email</label>
        <input
          type='text'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type='submit'>Add User</button>
    </form>
  );
}

export default UserForm;
