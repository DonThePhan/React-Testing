import { render, screen } from '@testing-library/react';
import UserList from './UserList';

test('render the correct number of rows', () => {
  // const usersMock = jest.fn()
  // Render the component
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' },
  ];
  render(<UserList users={users} />);

  // Find all the rows in the table
  /** screen.logTestingPlaygroundURL() -> used to help identify element roles
   *  1. Add this line after a render, run the test and click on the generated link
   *  2. Click on the intended element and you should see its role revealed.
   *  3. Sometimes it's hard to click. Try adding a style to make it easier. In this case for the tr, we can use "style='border: 10px solid red; display:block'"
   */
  screen.logTestingPlaygroundURL();

  // Assertion: correct number of rows in the table
});

test('render the email and name of each user', () => {});
