import React, { Component } from 'react';
import PropTableRow from './PropTableRow.js';

class PropertiesTable extends Component  {
  // constructor(props){
  //   super(props)
  //
  // }

  // dict_keys = ['name', 'height', 'width', 'flangeThickness', 'webThickness', 'radius', 'surfaceArea', 'area', 'webArea',
  //              'density', 'momentOfInertia', 'W_y', 'Z_y', 'r_y', 'I_z', 'W_z', 'Z_z', 'r_z', 'K_v', 'W_v', 'Z_v', 'C',
  //              'K_w', 'W_w', 'Z_w', 'C_w']


  //Anger vad som ska visas i tabellen
  static defaultProps = {
    tableHeadings: {
      height: "Höjd [mm]",
      width: "Bredd [mm]",
      flangeThickness: "Tjocklek fläns [mm]",
      webThickness: "Tjocklek liv [mm]",
      surfaceArea: "mantelyta per m [m2/m]",
      area: "Area [mm2]",
      webArea: "Livarea [mm2]",
      density: "vikt/m [kg/m]",
      momentOfInertia: "Tröghetsmoment [mm4]",
      W_y: "Elastiskt böjmoment [mm3]"
    }
  }

  //TODO: Här bör jag ha en metod som hämtar data från API.

  generateRows(){
    let tableRows = [];
    let i =0;
    let OKeys = Object.keys(this.props.tableHeadings)

    // Bugg ifall man får ojämt antal rubriker. Börskrivas om där man först hämtar datan och sen generar en dict mby.
    for (i=0; i<OKeys.length;i+=2){
      let newRow = [];
      newRow.push(this.props.tableHeadings[OKeys[i]])
      newRow.push(i)
      newRow.push(this.props.tableHeadings[OKeys[i+1]])
      newRow.push(i)
      tableRows.push(newRow)
    }
    return(tableRows)
  }

  render(){
    let tableRows = this.generateRows();
    console.log(tableRows);
    return (
      <div className="Prop-table-div">
        <table className="Properties-table">
          <thead>
            <tr>
              <th colSpan="4" style={{textAlign: 'center',}}>Tvärsnittsdata</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map( tableRow => {
              return(
                <PropTableRow tableRow={tableRow} />
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PropertiesTable;
