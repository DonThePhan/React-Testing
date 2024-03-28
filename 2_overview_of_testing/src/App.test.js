/**
 ** UNIT TESTING / STANDARD LAYOUT
 *  1. Make TEST FUNC             //? ⬆️ UserForm.test.js 
 *  2. RENDER COMPONENT           //? ⬆️ UserForm.test.js
 *  3. QUERYING ELEMENTS by       //? ⬆️ UserForm.test.js
 *     1. ARIA Roles              //? ⬆️ UserForm.test.js
 *     2. DATA-TESTID             //? ⬆️ UserList.test.js
 *     3. CONTAINER.QUERYSELECTOR //! ⬆️ UserList.test.js
 *  4. ASSERTION                  //? ⬆️ UserForm.test.js
 * 
 ** 5. INTEGRATION TESTING ⬇
 
 ** 6. TESTING TABLE CONTENTS     //! ⬆️ UserList.test.js

 ** TOOLS / TIPS
 *  7. MOCK FUNCTIONS             //? ⬆️ UserForm.test.js
 *  8. TESTING PLAYGROUND         //! ⬆️ UserList.test.js
 *     -> screen.logTestingPlaygroundURL() 
 *  9. QUERYING ELEMENTS w/ LABELS//? ⬆️ UserForm.test.js
 * 10. SCREEN DEBUG ⬇
 * 11. AVOID BEFOREEACH - React Testing Library highly discourages beforeEach, though it still works.
 **/

import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

/** 5. Integration Testing - App.js contains UserForm & UserList which interact w/ & impacted byw common array 'users' */
test('can receive a new user and show it on a list', async () => {
  render(<App />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button');

  await user.click(nameInput);
  await user.keyboard('jane');
  await user.click(emailInput);
  await user.keyboard('jane@jane.com');
  await user.click(button);

  const name = screen.getByRole('cell', { name: 'jane' });
  const email = screen.getByRole('cell', { name: 'jane@jane.com' });

  /** 10. Screen Debug is used to log entire rendered HTML for better debugging */
  // screen.debug();

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
