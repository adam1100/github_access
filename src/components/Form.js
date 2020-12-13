import React from 'react';

const Form = props => (
  <form onSubmit={props.getUser}>
    <input  type="text" name="userName" />
    <button >Search</button>
  </form>
);

export default Form;