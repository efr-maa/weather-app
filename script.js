// http://api.weatherapi.com/v1/current.json?key=6b93df0078a44b118c1175959260404&q=Mumbai&aqi=no 


const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".location");
const dateandTimeField = document.querySelector(".date_time");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation);


let target = 'Raleigh'

const fetchResults = async (targetLocation) => {
  try {
    let url = let url = `https://api.weatherapi.com/v1/current.json?key=05a6d0aa7b40470d83b202659262704&q=${targetLocation}&aqi=no`

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      alert("Location not found. Please try again.");
      return;
    }

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Something went wrong. Please try again.");
  }
};

console.log(dateandTimeField);

function updateDetails(temp, locationName, time, condition) {
  let [datePart, timePart] = time.split(" ");
  let [year, month, day] = datePart.split("-");

  let dateObj = new Date(year, month - 1, day);
  let currentDay = getDayName(dateObj.getDay());

  temperatureField.innerText = `${Math.round(temp)}°C`;
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${timePart} - ${currentDay} ${datePart}`;
  conditionField.innerText = condition;
}



function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResults(target);
  searchField.value = "";
}

fetchResults(target);

function getDayName(number) {
  switch (number) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';


  }
}