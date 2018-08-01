import React from 'react';

function BeamFormRow(props) {
  // Att kalla på functionen med indata så krävs det att man gör en arrowfunktion enl nedan.
  return (
    <div>
      <label>{props.label}</label>
      <br/>
      <input className= 'Input-beam' type='number' placeholder='' name={props.name} onChange={(event) => {props.onChange(event)}}/>
    </div>
  );
}

export default BeamFormRow;
