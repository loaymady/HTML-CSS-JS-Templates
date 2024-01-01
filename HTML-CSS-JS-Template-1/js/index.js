let landing = document.querySelector(".landing"),
  toggleBars = document.querySelector(".toggle-bars"),
  tLinks = document.querySelector(".nav ul"),
  arrOfImgs = ["landing1", "landing2", "landing3"],
  bullets = document.querySelector(".bullets"),
  prev = document.querySelector(".toggle-left"),
  next = document.querySelector(".toggle-right"),
  btn = document.querySelector(".btn");

toggleBars.addEventListener("click", () => {
  tLinks.classList.toggle("active");
});
// Click Anywhere Outside Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBars && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("active")) {
      tLinks.classList.toggle("active");
    }
  }
});

arrOfImgs.forEach((_, index) => {
  let li = document.createElement("li");
  li.style.cursor = "pointer";
  li.setAttribute("data-index", index);
  if (index == 1) {
    li.classList.add("active");
  }
  bullets.appendChild(li);
});

let currentIndexImg = 1;

function checkBtn() {
  if (currentIndexImg === 0) {
    prev.classList.add("disabled");
    prev.classList.remove("hover");
  } else {
    prev.classList.remove("disabled");
    prev.classList.add("hover");
  }

  if (currentIndexImg === 2) {
    next.classList.add("disabled");
    next.classList.remove("hover");
  } else {
    next.classList.remove("disabled");
    next.classList.add("hover");
  }
}
checkBtn();

let lis = [...document.querySelectorAll(".bullets li")];

function changImg(currentImg) {
  landing.style.backgroundImage = "";
  landing.style.cssText = `background-image: url("images/${arrOfImgs[currentImg]}.jpg")`;
  lis.forEach((e, i) => {
    e.classList.remove("active");
    if (i === currentImg) {
      e.classList.add("active");
    }
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("prev")) {
    if (currentIndexImg > 0) {
      currentIndexImg--;
      changImg(currentIndexImg);
      checkBtn();
    }
  } else if (e.target.classList.contains("next")) {
    if (currentIndexImg >= 0 && currentIndexImg < 2) {
      currentIndexImg++;
      changImg(currentIndexImg);
      checkBtn();
    }
  }
});

//when click in bullet (li)
lis.forEach((e) => {
  e.addEventListener("click", function () {
    lis.forEach((e) => e.classList.remove("active"));
    e.classList.add("active");
    //convert dataset-index to number
    currentIndexImg = +e.dataset.index;
    changImg(currentIndexImg);
    checkBtn();
  });
});

//Filter Boxes
let allboxes = document.querySelectorAll(".imgs-container .box");
let lisbox = document.querySelectorAll(".shuffle li");
lisbox.forEach((li) => {
  li.addEventListener("click", () => {
    lisbox.forEach((e) => e.classList.remove("active"));
    allboxes.forEach((e) => (e.style.display = "none"));
    li.classList.add("active");

    if (li.textContent === "All") {
      allboxes.forEach((box) => {
        box.style.display = "block";
      });
    } else {
      allboxes.forEach((box) => {
        if (box.dataset.type === li.textContent) {
          box.style.display = "block";
        }
      });
    }
    // Re-initialize Wow.js after updating the display
    new WOW().init();
  });
});

let nums = document.querySelectorAll(".stats .number"),
  section = document.querySelector(".stats"),
  started = false, // Function Started ? No
  sectionSkills = document.querySelector(".section-skills"),
  spans = document.querySelectorAll(".prog span");

window.onscroll = function () {
  if (window.scrollY >= section.offsetTop - 300) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
  if (window.scrollY >= sectionSkills.offsetTop - 200) {
    spans.forEach((span) => {
      span.style.width = span.dataset.progress;
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

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  initialSlide: 1,
  slidesPerView: 1,
  spaceBetween: 500,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {},
});
