const container = document.querySelector(".container");
const seats = Array.from(document.querySelectorAll(".row .seat"));
const movieSelect = document.querySelector("#movie-select");
const noSeatsSpan = document.querySelector("#no-selected-seats");
const totalPriceSpan = document.querySelector("#total-price");

let ticketPrice = +movieSelect.value;

// Render no. fo selected seats and total price
const renderPrice = (noOfSeats) => {
  noSeatsSpan.innerText = noOfSeats;
  totalPriceSpan.innerText = noOfSeats * ticketPrice;
};

// Load data from localStorage
const populateUI = () => {
  const seatIndexes = JSON.parse(localStorage.getItem("seatIndexes"));
  const selectedMovieIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );

  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = +movieSelect.value;
  }

  if (seatIndexes) {
    seatIndexes.forEach((index) => {
      seats[index].classList.add("selected");
    });
    renderPrice(seatIndexes.length);
  }
};

// Update datas
const updateData = () => {
  const selectedSeats = Array.from(document.querySelectorAll(".row .selected"));
  // Get the indexes of the selected seats
  const seatIndexes = selectedSeats.map((seat) => seats.indexOf(seat));

  localStorage.setItem("seatIndexes", JSON.stringify(seatIndexes));

  renderPrice(selectedSeats.length);
};

// Event listener on container
container.addEventListener("click", (e) => {
  const classList = e.target.classList;
  if (classList.contains("seat") && !classList.contains("occupied")) {
    e.target.classList.toggle("selected");
  }

  updateData();
});

// Event handler on movie Select
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  localStorage.setItem("selectedMovieIndex", e.target.selectedIndex);
  updateData();
});

// Load data from localStorage when page loads
populateUI();
