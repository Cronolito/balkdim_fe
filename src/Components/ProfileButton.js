import React from 'react';

function ProfileButton(props) {
  // Att kalla på functionen med indata så krävs det att man gör en arrowfunktion enl nedan.
  return (
    <div className="Button">
      <button onClick={() => {props.buttonClicked(props.buttonTitle)}}>{props.buttonTitle}</button>
    </div>
  );
}

export default ProfileButton;
