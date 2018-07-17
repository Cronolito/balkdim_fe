import React, { Component } from 'react';
import ProfileButton from './Components/ProfileButton.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      buttonRenderState: 'defaultButtons',
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    //I state bör jag hålla reda på var man klickat sig vidare för att generera
    //rätt komponenter
  }

  //Anger värden för alla buttons
  static defaultProps = {
    defaultButtons: ['Standardprofil', 'Egen profil'],
    standardProfiles: ['HEA', 'HEB', 'IPE'],
  }

  handleButtonClick(buttonTitle){
    //TODO: Fixa så att ny knappar renderas beroende på vad som klickats
    //IDE: Kontent renderas på nytt om state ändras. Så beroende på vad som är i
    //state så ska rätt props renderas
    console.log({buttonTitle});
    this.setState({
      buttonRenderState: 'standardProfile',
    })
  }


  render() {
    let buttonsToRender
    if (this.state.buttonRenderState === 'defaultButtons'){
      buttonsToRender = this.props.defaultButtons
    } else if (this.state.buttonRenderState === 'standardProfile') {
      buttonsToRender = this.props.standardProfiles
    } else {
      buttonsToRender = []
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BalkTvärsnitt</h1>
        </header>
        <div className="Button-row">
        {buttonsToRender.map(title => {
          return(
          <ProfileButton
            buttonTitle={title}
            key={title}
            buttonClicked={this.handleButtonClick} />)})}
        </div>
      </div>
    );
  }
}

export default App;
