import React, { Component } from 'react';
import Form from "./../../components/Form";
import API from "./../../utils/API";
import { Link } from "react-router-dom";
import "./Home.css";
class Home extends Component {
  // Setting the initial values of this.state.topic, this.state.startYear and this.endYear
  state = {
  };

  // // handle any changes to the input fields
  // handleInputChange = event => {
  //   // Pull the name and value properties off of the event.target (the element which triggered the event)
  //   const { name, value } = event.target;

  //   // Set the state for the appropriate input field
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // When the form is submitted, prevent the default event
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   alert(`Topic: ${this.state.topic}\nstartYear: ${this.state.startYear}\nendYear: ${this.state.endYear}`);
  //   this.setState({ topic: "", startYear: "", endYear: "" });
  //   this.searchArticles(this.state.topic, this.state.startYear, this.state.endYear);
  // };

    render(){
    return (
        <p>Hello</p>
        )
    }
};

export default Home;
