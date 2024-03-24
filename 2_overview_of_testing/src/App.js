import { useState } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);
  const onUserAdd = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <div>
      <UserForm onUserAdd={onUserAdd}></UserForm>
      <hr />
      <UserList users={users}></UserList>
    </div>
  );
}

export default App;
