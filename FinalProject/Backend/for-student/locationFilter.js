////////////////////////////////////////////////////////////
//            DO NOT FORGET TO INCLUDE 
//  <script src="math.js" type="text/javascript"></script>
//              IN THE HEAD SECTION
////////////////////////////////////////////////////////////
//usage:
//Math.PI
//Math.abs()
//Math.asin(), Math.sin(), Math.cos()

function toRadians(degreeVal){
    return degreeVal*(Math.PI/180);
}

function twoPointDistance(coord1, coord2){
    let nCoord1 = [0, 0]; //defining the new coordinates for computation, can be optimised later
    let nCoord2 = [0, 0];
    nCoord1[0] = toRadians(coord1[0]);
    nCoord1[1] = toRadians(coord1[1]);
    nCoord2[0] = toRadians(coord2[0]);
    nCoord2[1] = toRadians(coord2[1]);

    let distanceLatitude = Math.abs(nCoord2[0] - nCoord1[0]);
    //latitudinal distance
    let distanceLongitude = Math.abs(nCoord2[1] - nCoord1[1]);
    //longitudinal distance

    let currAns = Math.sin(distanceLongitude/2)*Math.sin(distanceLongitude/2) + 
                  + Math.cos(nCoord1[0])*Math.cos(nCoord2[0]) 
                  + Math.sin(distanceLongitude/2)*Math.sin(distanceLongitude/2);
    //the above derives from a formula to get the correct distance between any two points on the earths surface.
    currAns = 2 * Math.asin(Math.sqrt(currAns));
    let radiusOfEarth = 6371*1000; //in metres
    return currAns*currAns;
    //the final distance in metres is returned
}

//defining the sides and distances inside a given triangle by the below function
function triangle(coordA, coordB, coordC){
    let sideA = twoPointDistance(coordB, coordC);
    let sideB = twoPointDistance(coordC, coordA);
    let sideC = twoPointDistance(coordA, coordB);

    let cosA = (sideB*sideB + sideC*sideC - sideA*sideA )/(2*sideB*sideC);
    let cosB = (-sideB*sideB + sideC*sideC + sideA*sideA )/(2*sideA*sideC);
    let cosC = (sideB*sideB - sideC*sideC + sideA*sideA )/(2*sideB*sideA);

    return [sideA, sideB, sideC, cosA, cosB, cosC];
}


function isInside(roomCoord1, roomCoord2, roomCoord3, roomCoord4, myCoords){
    //each roomCoord and myCoord is a tuple [xCoord, yCoord]

    //example roomCoords, of block seven
    // let A = [23.213371, 72.684054]; 
    // let B = [23.212907, 72.684584];
    // let C = [23.213565, 72.685307];
    // let D = [23.214002, 72.684747];

    let A, B, C, cosA, cosB, cosC = triangle(roomCoord1, roomCoord2, myCoords);
    let AM_AB = C*B*cosA;
    let AB = C*C;
    A, B, C, cosA, cosB, cosC = triangle(roomCoord1, myCoords, roomCoord3);
    let AM_AD = C*B*cosA;
    let AD = B*B;
    if(AM_AB>0 && AM_AB<AB){
        if(AM_AD>0 && AM_AD<AD){
            return 1;
        }
    }
    return 0;
}


navigator.geolocation.getCurrentPosition(posHandler, errHandler); 

// when position fetched without errors
function posHandler(position) {
    const { latitude, longitude } = position.coords; // fetches the latitude and longitude
    myCoords = [latitude, longitude];

    // example roomCoords, of block seven
    let roomCoord1 = [23.213371, 72.684054]; 
    let roomCoord2 = [23.212907, 72.684584];
    let roomCoord3 = [23.213565, 72.685307];
    let roomCoord4 = [23.214002, 72.684747];

    if(isInside(roomCoord1, roomCoord2, roomCoord3, roomCoord4, myCoords)){
        // window.location.href = "formInterface.html"; // redirect to the form's location
        window.location.href = "formData.json"; // redirect to the form's location

    }
    else{ 
        homepage.innerHTML += "<h1>Access Denied for the Form: Wrong Location :/ </h1>"; // custom error (not allowed) message
    }
};

// in case any error occurs when using the Geolocation API
function errHandler(error) {
    console.error("Error occured: ", error);
}
