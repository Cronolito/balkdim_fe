import React from 'react';

function PropTableRow(props) {
  return(
    <React.Fragment>
      <tr key={props.tableRow[0]}>
        {props.tableRow.map((data, cellNr) => {
          return(
            <td key={"cellNr" + cellNr}>{data}</td>
          )
        }
        )}
      </tr>
    </React.Fragment>
  )

}

export default PropTableRow;
