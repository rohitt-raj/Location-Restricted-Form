navigator.geolocation.getCurrentPosition(posHandler, errHandler); 

// when position fetched without errors
function posHandler(position) {
  
  const { latitude, longitude } = position.coords; // fetches the latitude and longitude
  
  // displays the fetched location (a check for the API)
  homepage.innerHTML = "Your Latitude: " + latitude + "<br>"; 
  homepage.innerHTML += "Your Longitude: " + longitude + "<br>";

  // filter based on two coordinates system
  if(latitude>23.208942 && latitude<23.209558 && longitude>72.685342 && longitude<72.685868){
    homepage.innerHTML += "<h1>Access Granted: Form opening in 5 secs<h1>";
    setTimeout(()=>{
      window.location.href = "Form/index.html"; // redirect to the form's location in 5 secs
    }, 5000);
  }
  else{ 
    homepage.innerHTML += "<h1>Access Denied for the Form: Wrong Location :/ </h1>"; // custom error (not allowed) message
  }
  
};

// in case any error occurs when using the Geolocation API
function errHandler(error) {
  console.error("Error occured: ", error);
}


/**
 * Kyzeel
 * 23.209558, 72.685342
 * 23.208942, 72.685868
 */
