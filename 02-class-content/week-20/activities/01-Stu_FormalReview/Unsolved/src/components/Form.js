import React, { Component } from "react";

class Form extends Component {
  // Setting the initial values of this.state.username and this.state.password
  state = {
    username: "",
    password: ""
  };

//handle changes to the input fields
  handleInputChange = event => {
    
    const name = event.target.name
    const value = event.target.value
    
    //ES6
    // const { name, value } = event.target;

    //set state for appropriate input field
    this.setState({
      [name]: value
    })
  }

  //when form is submitted, prevet default and alert username and password
  handleFormSubmit = event => {
    event.preventDefault();
    alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);

    //clear input values
    this.setState({ username: "", password: "" });
  };

  render = () => {
    return (
      <form>
        <p>Username: {this.state.username}</p>
        <p>Password: {this.state.password}</p>
        <input
          type="text"
          placeholder="Username"

        //add input for name, capture value, and update State on change
          name="username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"

        //add input for password, capture value, and update State on change
        name="password"
        value={this.state.password}
        onChange={this.handleInputChange}

        />
        <button onClick={this.handleFormSubmit}>Submit</button>
      </form>
    );
  }
}

export default Form;
