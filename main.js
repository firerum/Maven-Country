const display = document.querySelector(".display");
const toggler = document.querySelector("label");
const container = document.querySelector(".container");

window.addEventListener("load", getData);

function getData() {
   const api = "https://restcountries.eu/rest/v2/all";

   fetch(api)
      .then(response => response.json())
      .then(data => {
         let countryNames = data;

         countryNames.forEach(country => {
           // Create Elements into the DOM when data is received
            const wrapper = document.createElement("div");
            const displayList = document.createElement("div");
            const flagContainer = document.createElement("div");
            const flag = document.createElement("img"); 
            const name = document.createElement("h1");
            const population = document.createElement("p");
            const region = document.createElement("p");
            const capital = document.createElement("p");
            const currency = document.createElement("p"); 

            // Add class name for styling
            displayList.className = "display-list";
            wrapper.className = "display-wrapper";
            flagContainer.className = "flag-container";
            region.className = "country-region";

            // Add data into the elements created;
            flag.src = country.flag;
            name.innerHTML = country.name;
            population.innerHTML = `<span class="title">Population:</span>  <span>${country.population.toLocaleString()}</span>`;
            region.innerHTML = `<span class="title">Region:</span>  <span>${country.region}</span>`;
            capital.innerHTML = `<span class="title">Capital:</span>  <span>${country.capital}`;
            currency.innerHTML = `<span class="title">Currency:</span> <span>${country["currencies"][0]["name"]}</span>`;

            // Add created document into the parent Element
            flagContainer.appendChild(flag);
            displayList.appendChild(name);
            displayList.appendChild(population);
            displayList.appendChild(region);
            displayList.appendChild(capital);
            displayList.appendChild(currency);
            wrapper.appendChild(flagContainer);
            wrapper.appendChild(displayList);
            display.appendChild(wrapper);
         });     
      })
      .catch(err => {
         console.log("Data not found", err);
      });

      countrySearch();
      regionSearch();
}

// Filter by individual country
function countrySearch() {
   // Get the input element
   const ctryInput = document.getElementById("ctry");

   //Add Event listener
   ctryInput.addEventListener("keyup", e => {
      const ctryClone = ctryInput.value.toLowerCase();
      const names = document.querySelectorAll("main h1");
      const content = document.querySelector(".display-wrapper");

      // Loop through each country name to see if it contains user search
      names.forEach(name => {
         const nameConverted = name.textContent.toLowerCase();
         if(nameConverted.indexOf(ctryClone) !== -1) {
            name.parentElement.parentElement.style.display = "block";
         } else {
            name.parentElement.parentElement.style.display = "none";
         }
      });  
   });
}

// Filter by region
function regionSearch() {
   const allRegions = document.getElementById("all-regions");

   // Add Event listener to the select object
   allRegions.addEventListener("change", e => {
      const regions = document.querySelectorAll(".country-region span:nth-child(2)");
      const regionData = allRegions.value;
      
      // Loop through each regions to see if it matches select value
      regions.forEach(region => {
         const regionResult = region.textContent;
         if(regionData == "") {
            region.closest(".display-wrapper").style.display = "block";
         } else if(regionResult == regionData) {
            region.closest(".display-wrapper").style.display = "block";
         } else {
            region.closest(".display-wrapper").style.display = "none";
         }
      }); 
   });
}

// Toggle theme
toggler.addEventListener("click", function(e) {
   const switcher = document.getElementById("toggler");

   if(switcher.checked) {
      document.documentElement.classList.toggle("light-mode");

      console.log("checked");
   }
});

