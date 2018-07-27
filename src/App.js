import React, { Component } from 'react';
import ProfileButton from './Components/ProfileButton.js';
import PropertiesTable from './Components/PropertiesTable.js';
import IBeamForm from './Components/IBeamForm.js';
import beam_data from './beam_data';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      buttonStateTitle: 'defaultButtons',
      buttonNames: {
        defaultButtons: ['Standardprofil', 'Egen Profil'],
        Standardprofil: [],
        "Egen Profil": ['I-profil',],
      },
      generateTable: false,
      generateForm: false,
      tableInputKeys: null,

    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    //I state bör jag hålla reda på var man klickat sig vidare för att generera
    //rätt komponenter
  }

  //HÄmta balkdata från json
  static defaultProps = {
    beamData: beam_data
  }


  //Ändrar state till vilka knapptitlar som ska visas och finns inte knapptitlen som keys
 // i props så ändrar den så att tabellen genereras. Vilken data som ska hämtas hittas då
 // i state.buttonStateTitle
  handleButtonClick(buttonTitle){
    //Byta knappar
    if (Object.keys(this.state.buttonNames).includes(buttonTitle)){
      this.setState({
        buttonStateTitle: buttonTitle,
    })
    //Generara input för egen profil
  } else if (this.state.buttonNames['Egen Profil'].includes(buttonTitle)) {
    this.setState({
      buttonStateTitle: null,
      generateForm: true,
    })
  } else {
    //Generera tabell och indata för standardprofil
    var tableInput = ""
    var profiles = []
    this.props.beamData.forEach(function(profileGroup){
      if(Object.keys(profileGroup)[0] === buttonTitle.slice(0,3)){
        profiles = profileGroup[buttonTitle.slice(0,3)]
      }
    })

    profiles.forEach(function(profile){
      if (profile.name === buttonTitle) {
        tableInput = profile
      }
    })

    this.setState({
      buttonStateTitle: null,
      generateTable: true,
      tableInput: tableInput,
  })
  }
}

  renderSelector(){
    //Väljer vilka knappar som ska renderas beroende på state
    if(Object.keys(this.state.buttonNames).includes(this.state.buttonStateTitle)) {
      let buttonsTitlesToRender = this.state.buttonNames[this.state.buttonStateTitle]
      return (buttonsTitlesToRender)
    } else {
      return ([])
    }
    }


    //Hämtar balkdata från json. Skapar en dict(beamNames) med balktyp:profilnamn för alla typer. Denna dikt används för att skapa knappnamn i state. sparar tillsist knappnamn och balkdatan i state.
  componentWillMount(){

    const beamNames = {};
    this.props.beamData.forEach(function(item) {
      beamNames[Object.keys(item)[0]]= item[Object.keys(item)[0]].map(profile =>
      profile.name)
    })

    const beamTypes = Object.keys(beamNames);
    let {buttonNames} = this.state;
    buttonNames['Standardprofil'] = beamTypes
    beamTypes.forEach(function(item) {
      buttonNames[item] = beamNames[item]
    })

    this.setState({
      buttonNames:buttonNames,
    })

  }

  render() {
    let buttonsTitlesToRender = this.renderSelector()

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BalkTvärsnitt</h1>
        </header>
        <div>
        {buttonsTitlesToRender.map(title => {
          return(
          <ProfileButton
            buttonTitle={title}
            key={title}
            buttonClicked={this.handleButtonClick} />)})}
        </div>
        <div>
          {this.state.generateTable ? <PropertiesTable profileData={this.state.tableInput}/>: ""}
        </div>
        <div>
          {this.state.generateForm ? <IBeamForm/>: ""}
        </div>
      </div>
    );
  }
}

export default App;
