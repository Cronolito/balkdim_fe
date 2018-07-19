import React from 'react';

function PropertiesTable(props) {
  // Att kalla på functionen med indata så krävs det att man gör en arrowfunktion enl nedan.
  return (
    <div>
      <table className="Properties-table">
        <thead>
          <tr>
            <th colSpan="4" style={{textAlign: 'center',}}>Tvärsnittsdata</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Höjd [mm]</td>
            <td>200</td>
            <td>Bredd [mm]</td>
            <td>400</td>
          </tr>
          <tr>
            <td>Tjocklek liv [mm]</td>
            <td>12</td>
            <td>Tjocklek fläns [mm]</td>
            <td>20</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PropertiesTable;
