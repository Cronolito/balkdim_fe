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
      buttonPropsTitle: 'defaultButtons',
      generateTable: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    //I state bör jag hålla reda på var man klickat sig vidare för att generera
    //rätt komponenter
  }

  //Anger värden för alla buttons.
  // Kanske vilja hämta sista nivån från databas?
  static defaultProps = {
    defaultButtons: ['Standardprofil', 'Egen Profil'],
    Standardprofil: ['HEA', 'HEB', 'IPE'],
    "Egen Profil": ['I-profil',],
    HEA: ['HEA100', 'HEA120',]
  }


  //Ändrar state till vilka knapptitlar som ska visas och finns inte knapptitlen som keys
 // i props så ändrar den så att tabellen genereras. Vilken data som ska hämtas hittas då
 // i state.buttonPropsTitle
  handleButtonClick(buttonTitle){
    if (Object.keys(this.props).includes(buttonTitle)){
      this.setState({
        buttonPropsTitle: buttonTitle,
    })
  } else {
    this.setState({
      buttonPropsTitle: buttonTitle,
      generateTable: true,
  })
  }
}

  renderSelector(){
    //Väljer vilka knappar som ska renderas beroende på state
    if(Object.keys(this.props).includes(this.state.buttonPropsTitle)) {
      let buttonsTitlesToRender = this.props[this.state.buttonPropsTitle]
      return (buttonsTitlesToRender)
    } else {
      return ([])
    }
    }

    //Hämtar balkdata och titlar till menyer, bör nog vara componentWillMount
  componentWillMount(){
    const beamData = beam_data
    const standardProfiles = beamData.map( item =>
      Object.keys(item)[0])

      //Här r jag
    console.log(beamData[0][standardProfiles[0]]);

    //
    // const profiles = beamData.map( item =>
    //   {Object.keys(item)[0]: item[Object.keys(item)[0]].map( profile =>
    //     profile.name
    //   )})

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
          {this.state.generateTable ? <PropertiesTable/>: ""}
        </div>
        <div>
          {this.state.generateTable ? <IBeamForm/>: ""}
        </div>
      </div>
    );
  }
}

export default App;
