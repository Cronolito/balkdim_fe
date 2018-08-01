import React, { Component } from 'react';
import BeamFormRow from './BeamFormRow.js'
import calculateProps_I from '../BeamDesign/ISectionProp.js'

class BeamForm extends Component  {
  constructor(props){
    super(props)
    // Läs in formheadings och data i state:
    this.state = this.onSetState()
  }

  //Skapar ett object till state med name:value
  onSetState() {
    var newObj = {}
    Object.keys(this.props.formHeaders).forEach(name => {
      newObj[name] = ''
    })
    return (newObj)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let beamObject = calculateProps_I(this.state)
    console.log(beamObject);
    //Beräkna data och visa tabell
  }

  //Funk kan även skrivas så här eller på vanligt sätt, men då måste man binda this.
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: parseFloat(event.target.value)
    })
  }

  render(){
    var formRows = []
    Object.entries(this.props.formHeaders).forEach(([key, label]) => {
      formRows.push(<BeamFormRow key={key} name={key} label={label} onChange={this.handleInputChange}/>)
      })

    return (
      <div>
        <h2>Egen I-profil</h2>
        <form onSubmit={this.handleSubmit}>
          {formRows}
          <button className="Profile-button">Beräkna</button>
        </form>
      </div>
    );
  }
}

export default BeamForm;
