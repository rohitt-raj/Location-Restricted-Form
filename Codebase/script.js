navigator.geolocation.getCurrentPosition(posHandler, errHandler); 

function posHandler(position) {
  
  const { latitude, longitude } = position.coords; 
  
  homepage.innerHTML = "Your Latitude: " + latitude + "<br>"; 
  homepage.innerHTML += "Your Longitude: " + longitude + "<br>";

  if(latitude>23.208942 && latitude<23.209558 && longitude>72.685342 && longitude<72.685868){
    homepage.innerHTML += "<h1>Access Granted: Form opening in 5 secs<h1>";
    setTimeout(()=>{
      window.location.href = "Form/index.html"; // redirect to the form's locationa
    }, 5000);
  }
  else{ 
    homepage.innerHTML += "<h1>Access Denied for the Form: Wrong Location :/ </h1>"; // custom error (not allowed) message
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
