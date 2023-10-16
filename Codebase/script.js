navigator.geolocation.getCurrentPosition(posHandler, errHandler); 
//this is responsible for prompting the user 

// when position fetched without errors
function posHandler(position) {
  
  const { latitude, longitude } = position.coords; // fetches the latitude and longitude

  homepage.innerHTML = "Your Latitude: " + latitude + "<br>"; 
  homepage.innerHTML += "Your Longitude: " + longitude + "<br>";
  // displays the fetched location (a check for the API)

  // filter based on two coordinates system, flawed as the alignment of the room 
  //may not always lie within the rectangles described by two coordintes (skewed geometry)
  //needs revision to implement the correct function, described in the midterm project progress report 
  if(latitude>23.208942 && latitude<23.209558 && longitude>72.685342 && longitude<72.685868){
    //temporary alignment via kyzeel hostel coordinates
    homepage.innerHTML += "<h1>Access Granted: Form opening in 5 secs<h1>";
    setTimeout(()=>{
      window.location.href = "Form/index.html"; // redirect to the form's location in 5 secs
      // the redirected homepage resides in another folder, namely under the "Forms" folder in the same parent directory
      
    }, 5000);
    //the above waits for five seconds to redirect, as we had to check if our coordinates are displayed correctly or not
  }
    
  else{ 
    homepage.innerHTML += "<h1>Access Denied for the Form: Wrong Location :/ </h1>"; 
    // custom error (not allowed) message
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
