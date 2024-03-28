/**
 *  1. Make TEST FUNC
 *  2. RENDER COMPONENT
 *  3. QUERYING ELEMENTS by:
 *    1. Aria Roles
 *  4. ASSERTION
 *
 ** Tools
 *  7. MOCK FUNCTIONS
 *  9. QUERYING ELEMENTS w/ LABELS
 */

import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

/** 1. Test Func w/ 2 args -> test name & callback*/
test('it shows 2 inputs & a button', () => {
  /** 2. Render component - Renders in Fake Browser Env.*/
  render(<UserForm />);

  /** 3. QUERYING Elements / Manipulate Components

         1. ARIA ROLES
            1. heading -> h1, h2, h3, h4, h5, h6
            2. list    -> ul, li
            3. button  -> button
            4. link    -> a
            5. textbox -> input type='text'
   */

  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  /** 4. Assertions - Make sure component is doing what we expect it to do
         - "expect" comes from jest
         - The matchers that come after it, ie toHaveLength, tobeInDocument come from either Jest or Jest-Dom (a seperate library)
   */
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

// ============================================================================

test('it calls onUserAdd when the form is submitted', async () => {
  /**  7. Mock function to call in place of actual function (cuz we don't need to get the actual function to do anything) */
  const onUserAddMock = jest.fn();

  // Try to render my component
  render(<UserForm onUserAdd={onUserAddMock} /** <- 6. */ />);

  // Find the two inputs
  /** 9. Querying Elements w/ Label - Use this method IF you have a label properly attached to our input (see how it's done in UserForm.jsx)
   **    Optional second input to specify text of the label attached to the input
   **    The "/email/" regex (directly below) means match anything that contains "email" & i is so it's not case sensative */
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const nameInput = screen.getByRole('textbox', { name: /name/i });

  // Simulate typing in a name
  await user.click(nameInput);
  await user.keyboard('jane');

  // Simulate typing in an email
  await user.click(emailInput);
  await user.keyboard('jane@jane.com');

  // Simulate clicking the button
  const button = screen.getByRole('button');
  await user.click(button);

  // Assertion to make sure 'onUserAdd' gets called with email/name
  expect(onUserAddMock).toHaveBeenCalled();
  expect(onUserAddMock).toHaveBeenCalledWith({
    name: 'jane',
    email: 'jane@jane.com',
  });
});

// ============================================================================

test('it empties the two inputs when the form is submitted', async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button');

  await user.click(nameInput);
  await user.keyboard('jane');
  await user.click(emailInput);
  await user.keyboard('jane@jane.com');

  await user.click(button);

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});
