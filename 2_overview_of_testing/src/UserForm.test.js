import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows 2 inputs & a button', () => {
  // render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  // Assertion - maek sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

/** ARIA ROLES
 *  1.  heading -> h1, h2, h3, h4, h5, h6
 *  2.  list    -> ul, li
 *  3.  button  -> button
 *  4.  link    -> a
 *  5.  textbox -> input type='text'
 *
 * expect comes from jest
 * The matchers that come after it, ie toHaveLength, tobeInDocument come from either Jest or Jest-Dom (a seperate library)
 */

test('it calls onUserAdd when the form is submitted', async () => {
  // Mock function to call in place of actual function (cuz we don't need to get the actual function to do anything)
  const onUserAddMock = jest.fn();

  // Try to render my component
  render(<UserForm onUserAdd={onUserAddMock} />);

  // Find the two inputs
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  }); /**  Use this method IF you have a label properly attached to our input (see how it's done in UserForm.jsx)*/
  //* Optional second input to specify text of the label attached to the input
  //* The "/email/" regex means match anything that contains "email" & i is so it's not case sensative

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
