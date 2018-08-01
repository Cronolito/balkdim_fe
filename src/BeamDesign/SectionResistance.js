
export default function calculateSectionRes(beamData){
  let resistanceData = {}
  //Om standardprofil I typ HEA, HEB och IPE som är TK 1/2 i kN och kNm
  resistanceData['normalForce'] = normalForceCapacity(beamData.area*Math.pow(10,-6), 355*Math.pow(10,6), 1.0)*Math.pow(10,-3)
  resistanceData['shearForce'] = shearCapacity(beamData.webArea*Math.pow(10,-6), 355*Math.pow(10,6), 1.0)*Math.pow(10,-3)
  resistanceData['momentY'] = momentCapacity(beamData.Z_y*Math.pow(10,-6), 355*Math.pow(10,6), 1.0)*Math.pow(10,-3)

  return(resistanceData)
}

// Funktionen beräknar och returnerar normalkapaciteten för en sektion med indata. Tvärsnittsklass 1,2,3
function normalForceCapacity(area, f_y, gamma_m0){
    return (area * f_y / gamma_m0)
}

// Funktionen beräknar och returnerar tvärkraftskapacitetn för en sektion med indata
function shearCapacity(shearArea, f_y, gamma_m0){
  return (shearArea * f_y / gamma_m0 / Math.sqrt(3))
}

// Funktionen beräknar och returnerar normalkapaciteten för en sektion med indata. Tvärsnittsklass 1,2,3
function momentCapacity(bendingStiffness, f_y, gamma_m0){
  return (bendingStiffness * f_y / gamma_m0)
}
