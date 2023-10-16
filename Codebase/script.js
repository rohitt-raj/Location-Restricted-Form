navigator.geolocation.getCurrentPosition(posHandler, errHandler); 

function posHandler(position) {
  
  const { latitude, longitude } = position.coords; 
  //gets our current coordinates 
  homepage.innerHTML = "Your Latitude: " + latitude + "<br>"; 
  homepage.innerHTML += "Your Longitude: " + longitude + "<br>";
  // the above two lines display our current location
  if(latitude>23.208942 && latitude<23.209558 && longitude>72.685342 && longitude<72.685868){
    //the above checks if the location is in between specified coordinates
    homepage.innerHTML += "<h1>Access Granted: Form opening in 5 secs<h1>";
    //5 second timeout given to check the location is correct or not
    setTimeout(()=>{
      window.location.href = "Form/index.html"; // redirect to the form's location
    }, 5000);
    //implements the 5 second timeout
  }
  else{ 
    homepage.innerHTML += "<h1>Access Denied for the Form: Wrong Location :/ </h1>"; // custom error (not allowed) message
    //display message for when the location is not favourable
  }
  
};

function errHandler(error) {
  console.error("Error ho rha:", error);
}


/**
 * Kyzeel
 * 23.209558, 72.685342
 * 23.208942, 72.685868
 */


// const watchId = navigator.geolocation.watchPosition(posHandler);

// const optios = {
//   timeout: 5000, // 5 seconds
//   maximumAge: 0, // Force a fresh location
// };
