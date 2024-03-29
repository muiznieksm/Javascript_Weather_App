const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast()

const updateUI = (data) => {
  const { cityDets, weather } = data;
  const temp = weather.Temperature.Metric.Value;

  details.innerHTML = `
<h5 class="my-3">${cityDets.EnglishName}</h5>
<div class="my-3">${weather.WeatherText}</div>
<div class="display-4 my-4">
<span>${temp}</span>
<span>&deg;C</span> 
</div>

`;

  if (temp < 5 && temp > -10) {
    document.body.classList = [];
    document.body.classList.add("cold");
  }

  if (temp < -10) {
    document.body.classList = [];
    document.body.classList.add("very_cold");
  }

  if (temp >= 5 && temp <= 20) {
    document.body.classList = [];
    document.body.classList.add("warm");
  }

  if (temp > 20) {
    document.body.classList = [];
    document.body.classList.add("hot");
  }

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};


cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();

  cityForm.reset();

  forecast.updateCity(city)
    .then((data) => {
      updateUI(data);
      console.log(data);
    })
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast.updateCity(localStorage.getItem("city"))
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
