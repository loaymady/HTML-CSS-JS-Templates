let landing = document.querySelector(".landing-page"),
  listImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
  settingBox = document.querySelector(".settings-box"),
  toggleSettings = document.querySelector(".toggle-settings i"),
  colorsList = document.querySelectorAll(".colors-list li"),
  randomBackgEles = document.querySelectorAll(".random-backgrounds span"),
  bulletsoptionEls = document.querySelectorAll(".bullets-option span"),
  navbBullets = document.querySelector(".nav-bullets"),
  skillSContainer = document.querySelector(".skills"),
  SkillProgresses = document.querySelectorAll(".skill-progress span"),
  galleryImgs = document.querySelectorAll(".gallery .images-box img"),
  allBullets = document.querySelectorAll(".nav-bullets .bullet"),
  allLinks = document.querySelectorAll(".links a"),
  btn = document.querySelector(".btn"),
  toggleBtn = document.querySelector(".toggle-menu"),
  tLinks = document.querySelector(".links"),
  randomBackgOption = true,
  interval;

//when open window or reload
getcolorAndBackgroundAndBullets();

//for create Random Background
function randomBackground(randomBackg) {
  if (randomBackg) {
    interval = setInterval(() => {
      let index = Math.floor(Math.random() * listImgs.length);
      landing.style.backgroundImage = `url(images/${listImgs[index]})`;
      window.localStorage.setItem(
        "current_background",
        landing.style.backgroundImage
      );
    }, 10000);
  } else {
    clearInterval(interval);
  }
}

//when click toggle spin it
toggleSettings.onclick = function () {
  settingBox.classList.toggle("open");
  this.classList.toggle("fa-spin");
};

//when click choose main-color
colorsList.forEach((e) => {
  e.addEventListener("click", (e) => {
    let color = e.target.dataset.color;
    deleteActiveColors();
    e.target.classList.add("active");
    document.documentElement.style.setProperty("--main-color", color);
    window.localStorage.setItem("color_option", color);
  });
});

//for handle active colors option
function deleteActiveColors() {
  colorsList.forEach((el) => el.classList.remove("active"));
}

//for handle active random background option
function deleteActiveBackg() {
  randomBackgEles.forEach((el) => el.classList.remove("active"));
}

//for handle active bullets option
function deleteActiveBull() {
  bulletsoptionEls.forEach((el) => el.classList.remove("active"));
}

//when reload page
function getcolorAndBackgroundAndBullets() {
  //check for color_option in local storage
  if (window.localStorage.getItem("color_option")) {
    let color = window.localStorage.getItem("color_option");
    document.documentElement.style.setProperty("--main-color", color);
    colorsList.forEach((e) => {
      if (e.dataset.color === color) {
        deleteActiveColors();
        e.classList.add("active");
      }
    });
  }

  //check for background_option in local storage
  if (window.localStorage.getItem("background_option")) {
    //handle first background
    window.localStorage.getItem("current_background")
      ? (landing.style.backgroundImage =
          window.localStorage.getItem("current_background"))
      : "";
    let background = window.localStorage.getItem("background_option");
    if (background == "yes") {
      randomBackgOption = true;
      randomBackground(randomBackgOption);
      deleteActiveBackg();
      document.querySelector(".yes").classList.add("active");
    } else {
      randomBackgOption = false;
      randomBackground(randomBackgOption);
      deleteActiveBackg();
      document.querySelector(".no").classList.add("active");
      let currentbackground = window.localStorage.getItem("current_background");
      landing.style.backgroundImage = currentbackground;
    }
  } else {
    //if not found set default background image
    window.localStorage.getItem("current_background")
      ? (landing.style.backgroundImage =
          window.localStorage.getItem("current_background"))
      : (landing.style.backgroundImage = `url(images/${listImgs[0]})`);

    randomBackground(randomBackgOption);
  }

  //check for bullets_option in local storage
  if (window.localStorage.getItem("bullets_option")) {
    let bulletsOpt = window.localStorage.getItem("bullets_option");
    if (bulletsOpt == "show") {
      navbBullets.style.display = "block";
      deleteActiveBull();
      document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
      navbBullets.style.display = "none";
      deleteActiveBull();
      document.querySelector(".bullets-option .no").classList.add("active");
    }
  }
}

//When set active or not for random background
randomBackgEles.forEach((e) => {
  e.addEventListener("click", (event) => {
    deleteActiveBackg();
    clearInterval(interval);
    let currentBackg = event.target.dataset.background;
    if (currentBackg === "yes") {
      randomBackgOption = true;
      randomBackground(randomBackgOption);
      event.target.classList.add("active");
      window.localStorage.setItem("background_option", currentBackg);
    } else if (currentBackg === "no") {
      randomBackgOption = false;
      randomBackground(randomBackgOption);
      event.target.classList.add("active");
      window.localStorage.setItem("background_option", currentBackg);
    }
  });
});

//When set show bullets or not
bulletsoptionEls.forEach((e) => {
  e.addEventListener("click", (event) => {
    let currentOpt = event.target.dataset.display;
    if (currentOpt === "show") {
      deleteActiveBull();
      event.target.classList.add("active");
      navbBullets.style.display = "block";
      window.localStorage.setItem("bullets_option", currentOpt);
    } else if (currentOpt === "hide") {
      navbBullets.style.display = "none";
      deleteActiveBull();
      event.target.classList.add("active");
      window.localStorage.setItem("bullets_option", currentOpt);
    }
  });
});

//when click reset_Option
document.querySelector(".reset-options").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

//handle progress bar for skills section
window.onscroll = function () {
  if (
    window.scrollY >=
    skillSContainer.offsetTop +
      skillSContainer.offsetHeight -
      window.innerHeight -
      300
  ) {
    SkillProgresses.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
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

//for show popup when click on any image of first 5 images at gallery section
galleryImgs.forEach((img, i) => {
  if (i < 5) {
    img.addEventListener("click", () => {
      Swal.fire({
        imageUrl: img.src,
        title: img.alt,
        showCloseButton: true,
        showConfirmButton: false,
        focusConfirm: false,
        customClass: {
          closeButton: "custom-close-button",
          title: "custom-title",
        },
        didOpen: () => {
          document.querySelector(".swal2-popup").focus();
        },
      });
    });
  }
});

//for show popup when click on any image of second 5 images at gallery section
galleryImgs.forEach((e, i) => {
  if (i > 4 && i < 10) {
    e.addEventListener("click", (e) => {
      let overlay = document.createElement("div");
      overlay.classList.add("popup-overlay");
      let pop = document.createElement("div");
      pop.classList.add("popup-box");
      let h3 = document.createElement("h3");
      h3.textContent = e.target.alt;
      let img = document.createElement("img");
      img.src = e.target.getAttribute("src");
      let span = document.createElement("span");
      span.classList.add("close-button");
      span.textContent = "X";
      pop.appendChild(h3);
      pop.appendChild(img);
      pop.appendChild(span);
      document.body.appendChild(overlay);
      document.body.appendChild(pop);
      document.body.classList.add("of");
    });
  }
});

//for handle close popup
document.addEventListener("click", function (event) {
  if (event.target.className === "close-button") {
    event.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
    document.body.classList.remove("of");
  }
});

document.addEventListener("click", function (event) {
  if (event.target == document.querySelector(".popup-overlay")) {
    document.querySelector(".close-button").click();
  }
});

//for handle links and set smooth scroll
function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
  document
    .querySelector(".toggle-menu span:nth-child(2)")
    .classList.toggle("active");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      document
        .querySelector(".toggle-menu span:nth-child(2)")
        .classList.toggle("active");
      tLinks.classList.toggle("open");
    }
  }
});
