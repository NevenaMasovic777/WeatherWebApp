const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
let locationField = document.querySelector("#location");
let weatherField = document.querySelector("#weather");
let errorField = document.querySelector("#error");


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  
  if (location === "") {
    console.log("provide search value");
    errorField.textContent = "Location must be provided";
    locationField.textContent = '';
    weatherField.textContent = '';
    return;
  } 
  fetch(`/weather?location=${location}`).then((res) => {
    res.json().then((resp) => {
      if (resp.error) {
        console.log(resp.error);
        errorField.textContent = resp.error;
        locationField.textContent = '';
        weatherField.textContent = '';
      } else {
      errorField.textContent = '';
      locationField.textContent = resp.location;
      weatherField.textContent = resp.weather;
    }
    });
  });
});
