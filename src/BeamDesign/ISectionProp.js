
//Funktionen beräknar alla tvärsnittsparametrar och returnerar balkobjektet
export default function calculateProps_I(beamObject){
  beamObject.height = calculateBeamHeight_I(beamObject);
  [beamObject.area, beamObject.webArea] = calculateArea_I(beamObject);
  beamObject.cog = calculateCenterOfGravity_I(beamObject);
  beamObject.momentOfInertia = calculateMomentOfInertia_I(beamObject);
  [beamObject.topBendingStiffness, beamObject.bottomBendingStiffness] = calculateBendingStiffness_I(beamObject)

  return beamObject
}

function calculateBeamHeight_I(beamObject){
  var height = beamObject.topFlangeThickness + beamObject.webHeight + beamObject.bottomFlangeThickness
  return (height)
}

//Funktionen beräknar arean för tvärsnittet
function calculateArea_I(beamObject){
  var area = beamObject.topFlangeWidth*beamObject.topFlangeThickness+beamObject.webHeight*beamObject.webThickness+
                beamObject.bottomFlangeWidth*beamObject.bottomFlangeThickness
  var webArea = beamObject.webHeight * beamObject.webThickness
  return([area, webArea])
}

// Funktionen beräknar tyngdpunkten för tvärsnittet med utgångspunkt från underkant
function calculateCenterOfGravity_I(beamObject){
  var cog = (beamObject.bottomFlangeWidth*beamObject.bottomFlangeThickness**2/2. + beamObject.webHeight*beamObject.webThickness*
          (beamObject.webHeight/2.+beamObject.bottomFlangeThickness)+beamObject.topFlangeWidth*beamObject.topFlangeThickness*
          (beamObject.bottomFlangeThickness+beamObject.webHeight+beamObject.topFlangeThickness/2.))/beamObject.area
  return(cog)
}

// Funktionen beräknar tröghetsmomentet för tvärsnittet med utgångspunkt från underkant
function calculateMomentOfInertia_I(beamObject){
  let A_tf = beamObject.topFlangeThickness * beamObject.topFlangeWidth
  let A_w = beamObject.webThickness * beamObject.webHeight
  let A_bf = beamObject.bottomFlangeWidth * beamObject.bottomFlangeThickness

  let I_bf = A_bf * beamObject.bottomFlangeThickness**2/12. + A_bf*(beamObject.bottomFlangeThickness/2.-beamObject.cog)**2
  let I_w = A_w * beamObject.webHeight**2/12. + A_w * (beamObject.bottomFlangeThickness +beamObject.webHeight/2.-beamObject.cog)**2
  let I_tf = A_tf * beamObject.topFlangeThickness**2/12. + A_tf * (beamObject.bottomFlangeThickness +beamObject.webHeight + beamObject.topFlangeThickness/2.-beamObject.cog)**2
  var momentOfInertia = I_bf + I_w + I_tf
  return(momentOfInertia)
}

// Funktionen beräknar böjstyvheterna för över och underfläns
function calculateBendingStiffness_I(beamObject){
  var topBendingStiffness = beamObject.momentOfInertia/(beamObject.height - beamObject.cog)
  var bottomBendingStiffness = beamObject.momentOfInertia/(beamObject.cog)
  return([topBendingStiffness, bottomBendingStiffness])
}
