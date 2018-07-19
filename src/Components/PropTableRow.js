import React from 'react';

function PropTableRow(props) {
  return(
    <React.Fragment>
      <tr key={props.tableRow[0]}>
        {props.tableRow.map(data => {
          return(
            <td key={data}>{data}</td>
          )
        }
        )}
      </tr>
    </React.Fragment>
  )

}

export default PropTableRow;
