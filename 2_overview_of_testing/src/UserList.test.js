/**
 * 3. QUERYING ELEMENTS by:
 *  2. DATA-TESTID
 *  3 CONTAINER.QUERYSELECTOR
 * 6. TESTING TABLE CONTENTS
 * 8. TESTING PLAYGROUND -> screen.logTestingPlaygroundURL()
 */

import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

const users = [
  { name: 'jane', email: 'jane@jane.com' },
  { name: 'sam', email: 'sam@sam.com' },
];

const renderComponent = () => {
  const { container } = render(<UserList users={users} />);
  return { users, container };
};

test('render the correct number of rows - w/ data-testid', () => {
  renderComponent();

  // Find all the rows in the table
  // screen.logTestingPlaygroundURL();
  /** 8. screen.logTestingPlaygroundURL() -> used to help identify element roles
   *     1. Add this line after a render, run the test and click on the generated link
   *     2. Click on the intended element and you should see its role revealed.
   *     3. Sometimes it's hard to click.
   *        -> Try adding a style to make it easier. In this case for the tr, we can use "style='border: 10px solid red; display:block'"
   */

  /** 3.2 data-testid */
  const rows = within(screen.getByTestId('users')).getAllByRole('row');
  // we are grabbing tbody element w/ data-testid "users"
  // drilling "within" to grab all elements inside of it
  // then getAllByRole "row"

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test('render the correct number of rows - w/ container.querySelector', () => {
  const { container } = renderComponent();

  // Find all the rows in the table
  /** 3.3 Container Query Selector */
  // eslint-disable-next-line
  const rows = container.querySelectorAll('tbody tr');

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

/** 6. Testing Table Contents */
test('render the email and name of each user', () => {
  const { users } = renderComponent();

  // using screen.logTestingPlaygroundURL(), we determined the role we are looking for in a tabel is 'cell'
  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
