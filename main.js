const movieSelect = document.getElementById("movie"); // Shows which movie is selected
const container = document.querySelector(".container"); // Selects container
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); // Shows which seats are not occupied
const showcase = document.querySelector(".showcase"); // Selects showcase class
const count = document.getElementById("count"); // Selects count (seats selected)
const total = document.getElementById("total"); // Selects the total amount

populateUI(); // runs when page loads.

let ticketPrice = parseInt(movieSelect.value); // Grabs the value from the movie selected and reassigned it as an integer

// Save selected Movie Index and Price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update Total and Count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected"); // Shows which seats are occupied

  // Copy selected seats into array  -  spread operator copies elements of the array
  // Map through array
  // Return a new array of indexes
  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });
  console.log(seatsIndex);

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Seat click event

container.addEventListener("click", (e) => {
  console.log(e.target);
  e.preventDefault();
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Get data from local storage and populate UI

function populateUI(i) {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select click event

movieSelect.addEventListener("change", (e) => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  console.log(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Initial count and total set
updateSelectedCount();
