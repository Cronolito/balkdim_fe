import React, { Component } from 'react';
import PropTableRow from './PropTableRow.js';
import calculateSectionRes from '../BeamDesign/SectionResistance.js'
import roundedToFixed from '../BeamDesign/OtherFunctions.js'


class ResistanceTable extends Component  {

  //Anger vad som ska visas i tabellen
  static defaultProps = {
    tableHeadings: {
      normalForce: "Normalkraft [kN]",
      shearForce: "Tvärkraft [kN]",
      momentY: "Moment [kNm]",
    }
  }

  generateRowData(){
    let tableRows = [];
    let i =0;
    let OKeys = Object.keys(this.props.tableHeadings)
    let resistanceData = calculateSectionRes(this.props.profileData)

    for (i=0; i<OKeys.length;i++){
      let newRow = [];
      newRow.push(this.props.tableHeadings[OKeys[i]])
      newRow.push(roundedToFixed(resistanceData[OKeys[i]],1))

      tableRows.push(newRow)
    }
    return(tableRows)
  }

  render(){
    let tableRows = this.generateRowData();

    return (
      <div className="Prop-table-div">
        <table className="Properties-table">
          <thead>
            <tr>
              <th colSpan="2" style={{textAlign: 'center',}}>Snittkapaciteter</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((tableRow, rowNr) => {
              return(
                <PropTableRow tableRow={tableRow} key={"tableRow" + rowNr} />
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ResistanceTable;
