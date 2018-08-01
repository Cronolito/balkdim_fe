import React, { Component } from 'react';

class TestForm extends Component  {
  constructor(props){
    super(props)
    //Sätt formdatan i state ist?
    this.state = {
      height: '',
    }

  }
  handleSubmit= (event) => {
    event.preventDefault()
    const data = this.state
    console.log("FGinal data is", data);

  }

  //Funk kan även skrivas så här eller på vanligt sätt, men då måste man binda this.
  handleInputChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

//Skapa data att loopa igenom som genererar input. State ist?
  createFormData(){
    let formData;
    formData = {
      height: ['text', 'Höjd', ''],
    }
  }

//Ifall jag ska hämta data från API
  componentDidMount(){
    this.setState({
      height: 15
    })
  }

  render(){

    return (
      <div>
        <h1>Egen I-profil</h1>
        <p>Värde är: {this.state.height}</p>
        <form onSubmit={this.handleSubmit}>
          <p><input type='text' placeholder='Höjd' value={this.state.height} name='height' onChange={this.handleInputChange}/></p>
          <p><button>Send message</button></p>
        </form>
      </div>
    );
  }
}

export default TestForm;
