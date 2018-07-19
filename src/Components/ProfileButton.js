import React from 'react';

function ProfileButton(props) {
  // Att kalla på functionen med indata så krävs det att man gör en arrowfunktion enl nedan.
  return (
    <div>
      <button className="Profile-button" onClick={() => {props.buttonClicked(props.buttonTitle)}}>{props.buttonTitle}</button>
    </div>
  );
}

export default ProfileButton;
