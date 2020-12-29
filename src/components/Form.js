import React from 'react';

const Form = props => (
  <form onSubmit={props.getUser}>
    <input type="text" name="userName" placeholder="user name"/>
    <input type="text" name="apiKey" placeholder="your api key"/>
    <button >Search</button>
  </form>
);

export default Form;