let allBoxes = [...document.querySelectorAll(".swiper-slide .box")],
  swiperWrapper = document.querySelector(".swiper-wrapper"),
  btn = document.querySelector(".btn"),
  toggleLi = document.querySelector("header .main-nav li:last-child"),
  tLinks = document.querySelector(".mega-menu");

toggleLi.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleLi.classList.toggle("active");
  tLinks.classList.toggle("open");
});

// Click Anywhere Outside Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleLi && e.target !== tLinks) {
    // Check If Menu Is Open
    if (toggleLi.classList.contains("active")) {
      tLinks.classList.toggle("open");
      toggleLi.classList.toggle("active");
    }
  }
});

// Create clones of the elements
allBoxes.forEach((box) => {
  let clone = box.cloneNode(true); // true means deep clone (with children)
  // Append the clones to the swiper-wrapper
  let div = document.createElement("div");
  div.classList.add("swiper-slide");
  div.classList.add("mobile");
  div.style.display = "none";
  div.appendChild(clone);
  swiperWrapper.appendChild(div);
});

let progressSpans = document.querySelectorAll(".the-progress span");
let section = document.querySelector(".our-skills");

let nums = document.querySelectorAll(".stats .number");
let statsSection = document.querySelector(".stats");
let started = false;

window.onscroll = function () {
  // Skills Animate Width
  if (window.scrollY >= section.offsetTop - 100) {
    progressSpans.forEach((span) => {
      span.style.width = span.dataset.width; // dataset.width = data-width="80%" (example)
    });
  }

  // Stats Increase Number
  if (window.scrollY >= statsSection.offsetTop - 300) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }

  //show button scroll to top
  if (window.scrollY >= 600) {
    btn.classList.add("opac");
  } else {
    btn.classList.remove("opac");
  }
};

//when click btn scroll to top
btn.onclick = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

//Countdown Timer
let countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();
// console.log(countDownDate);

let counter = setInterval(() => {
  // Get Date Now
  let dateNow = new Date().getTime();

  // Find The Date Difference Between Now And Countdown Date
  let dateDiff = countDownDate - dateNow;

  // Get Time Units
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  //((dateDiff % (1000 * 60 * 60 * 24)) >> days and millseconds / () >> to get hours or minutes or seconds
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 500, // Adjust the value as needed
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // When screen width is less than 767 pixels
  },
});
