let body = document.querySelector("#body");
let modeInput = document.querySelector("#mode-img");
let fixed = document.querySelector("#fixed");
const search = document.querySelector("#search");
const filterSelect = document.querySelector("#filter-select");
const country = document.querySelector("#country");
const URL = "https://restcountries.com/v3.1/all";



modeInput.addEventListener("click", (e) => {
  body.classList.toggle("dark-body");
  country.classList.toggle("dark-country");
  fixed.classList.toggle("dark-fixed");
});

window.onload = async () => {
  render(await getData());
};

async function getData() {
  try {
    const response = await fetch(URL);
    const data = response.json();
    return data;
  } catch (error) {
    errorDisplay(error.message);
  }
}

search.addEventListener("input", async (e) => {
  e.preventDefault();
  value = e.target.value;

  let searchedState = (await getData()).filter(
    (el) =>
      el.name.common.toLowerCase().includes(value.toLowerCase()) ||
      el.region.toLowerCase().includes(value.toLowerCase())
  );
  render(searchedState);
});

filterSelect.addEventListener("change", async (e) => {
  let selectValue = e.target.value;
  let filteredStates = (await getData()).filter(
    (el) =>
      el.region == selectValue || el.status == (selectValue || "user-assigned")
  );
  render(filteredStates);
});
function render(states) {
  let html = "";

  states.forEach((eachState) => {
    html += `
            <img src="${eachState.flags.svg}">
            <div class="country-details">
                <h3>${eachState.name.common}</h3>
                <strong>Population: ${eachState.population}</strong>
                <strong>Region: ${eachState.region}</strong>
                <strong>Capital: ${eachState.capital}</strong>
            </div>
        `;
  });

  country.innerHTML = html;
}

function errorDisplay(message) {
  document.body.innerHTML = `
    <div class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-red-100">
    <h1 class="text-red-500 uppercase text-4xl">${message}</h1>
    </div>
    `;
}
