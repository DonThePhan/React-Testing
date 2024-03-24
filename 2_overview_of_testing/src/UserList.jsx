import React from 'react';

function UserList({ users }) {
  const renderedUsers = users.map((user) => {
    return (
      <tr key={user.name}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });
  return (
    <table>
      <th>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </th>
      <tbody>{renderedUsers}</tbody>
    </table>
  );
}

export default UserList;
