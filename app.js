window.addEventListener('load', () => {
  let long;
  let lat;
  // Providing the DOM elements with variables
  let temperatureDescription = document.querySelector('.temperature-description');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureSection = document.querySelector('.temperature-section');
  const temperatureSpan = document.querySelector('.temperature-section span');
  let regionTime = document.querySelector('.myTime');


  // navigator.geolocation allows for using location coordinates for the client.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);

      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/0a8d6008b99136ef7430ad68c2e0310c/${lat},${long}`;


      // CORS error - use cors anywhere walk around.
      // Cannot access the api data from the local machine and cors anywhere acts as a proxy to allow requests from the local server.

      // fetch the api by making a request
      fetch(api)
        // Creates a new variable response to hold the response sent from the server.
        .then(response => {
          // convert response data from the api request to json format
          return response.json();
        })
        // Takes the api response that has been converted to json format and stores it in a new variable data.
        .then(data => {
          console.log(data);

          // data to be displayed
          const { temperature, summary, icon } = data.currently;
          const timezone = data.timezone;
          console.log(temperature, summary, icon);

          // Set DOM elements from the API
          temperatureDegree.textContent = temperature + ' F';
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = timezone;

          let celsius = (temperature - 32) * 5 / 9;

          // set Icons
          setIcons(icon, document.querySelector(".icon"));

          // Covert temperature to celsius.
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent == 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = Math.floor(temperature);
            }
          })
        });
    });

  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ "color": "white" });
    // replace - with _ in api icons to use skycons weather icons.
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();

    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let dateTime = date;
  console.log(dateTime);

  regionTime.textContent = dateTime;

});