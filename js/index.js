const images = [
  {
    title: "Daily",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    url: "../images/daily.png",
  },
  {
    title: "Daily Mail",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    url: "../images/daily_mail_icon.png",
  },
  {
    title: "Financial Times",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    url: "../images/financial.png",
  },
  {
    title: "Forbes",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    url: "../images/forbes.png",
  },
  {
    title: "Vogue",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    url: "../images/vogue_icon.png",
  },
];
const header = document.querySelector(".header");
let classSticky = header.offsetTop;
const slider = document.querySelector(".companies__slider");
window.onscroll = function () {
  scrollPageSticky();
};
function scrollPageSticky() {
  if (window.pageYOffset > classSticky) {
    header.classList.add("sticky");
    document.querySelector(".section").style = `margin-top: 65px;`;
  } else {
    header.classList.remove("sticky");
    document.querySelector(".section").style = `margin-top: 0;`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider__container");
  const dotsContainer = document.querySelector(".slider__dots");
  const prevButton = document.querySelector(".slider__button--prev");
  const nextButton = document.querySelector(".slider__button--next");
  const slider = document.querySelector(".slider");

  const slidesData = [
    "https://i.artfile.me/wallpaper/26-10-2017/1920x1080/raznoe-kosmeticheskie-sredstva--duhi-fla-1255836.jpg",
    "https://gagaru.club/uploads/posts/2023-02/1676432795_gagaru-club-p-dukhi-s-krasivoi-krishkoi-krasivo-81.jpg",
    "https://www.nastol.com.ua/pic/201906/1920x1080/nastol.com.ua-347326.jpg",
    "https://wallscloud.net/img/resize/1920/1080/MM/2019-05-26-women-model-portrait-face-long-hair-Dmitry-Arhar-1208708-wallhere_com.jpg",
    "https://wallscloud.net/img/resize/1920/1080/MM/2019-05-26-1920x1200-px-Alla-Berger-blue-eyes-brunette-eyeliner-eyes-652464-wallhere_com.jpg",
    "../images/slider-last.jpg",
    // Add more slide URLs as needed
  ];

  let currentIndex = 0;
  let isMoving = false;
  let autoScrollTimeout;
  let userInteractionTimeout;

  function createSlidesAndDots() {
    slidesData.forEach((slide, index) => {
      // Create slide element
      const slideElement = document.createElement("div");
      slideElement.classList.add("slider__slide");
      slideElement.style.backgroundImage = `url(${slide})`;
      sliderContainer.appendChild(slideElement);

      // Create dot element
      const dotElement = document.createElement("button");
      dotElement.classList.add("slider__dot");
      dotElement.setAttribute("aria-label", `Slide ${index + 1}`);
      dotElement.addEventListener("click", () => moveToSlide(index));
      dotsContainer.appendChild(dotElement);
    });

    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll(".slider__dot");
    dots.forEach((dot) => dot.classList.remove("slider__dot--active"));
    dots[currentIndex].classList.add("slider__dot--active");
  }

  function moveToNextSlide() {
    if (isMoving) return;
    isMoving = true;

    const firstSlide = sliderContainer.firstElementChild;
    sliderContainer.style.transition = "transform 0.8s ease";
    sliderContainer.style.transform = "translateX(-100%)";

    sliderContainer.addEventListener(
      "transitionend",
      function () {
        sliderContainer.style.transition = "none";
        sliderContainer.appendChild(firstSlide);
        sliderContainer.style.transform = "translateX(0)";
        isMoving = false;
      },
      { once: true }
    );

    currentIndex = (currentIndex + 1) % slidesData.length;
    updateDots();
  }

  function moveToPrevSlide() {
    if (isMoving) return;
    isMoving = true;

    const lastSlide = sliderContainer.lastElementChild;
    sliderContainer.style.transition = "none";
    sliderContainer.prepend(lastSlide);
    sliderContainer.style.transform = "translateX(-100%)";

    setTimeout(() => {
      sliderContainer.style.transition = "transform 0.8s ease";
      sliderContainer.style.transform = "translateX(0)";
    }, 0);

    sliderContainer.addEventListener(
      "transitionend",
      function () {
        isMoving = false;
      },
      { once: true }
    );

    currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
    updateDots();
  }

  function moveToSlide(index) {
    if (isMoving || index === currentIndex) return;
    isMoving = true;

    const direction = index > currentIndex ? 1 : -1;
    const slidesToMove = Math.abs(index - currentIndex);
    for (let i = 0; i < slidesToMove; i++) {
      if (direction === 1) {
        sliderContainer.appendChild(sliderContainer.firstElementChild);
      } else {
        sliderContainer.prepend(sliderContainer.lastElementChild);
      }
    }

    sliderContainer.style.transition = "none";
    sliderContainer.style.transform = `translateX(${-100 * direction}%)`;

    setTimeout(() => {
      sliderContainer.style.transition = "transform 0.8s ease";
      sliderContainer.style.transform = "translateX(0)";
    }, 0);

    sliderContainer.addEventListener(
      "transitionend",
      function () {
        isMoving = false;
      },
      { once: true }
    );

    currentIndex = index;
    updateDots();
  }

  function startAutoScroll() {
    autoScrollTimeout = setInterval(moveToNextSlide, 5000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollTimeout);
  }

  function resetAutoScroll() {
    stopAutoScroll();
    clearTimeout(userInteractionTimeout);
    userInteractionTimeout = setTimeout(startAutoScroll, 3000);
  }

  function handleUserInteraction() {
    stopAutoScroll();
    resetAutoScroll();
  }

  createSlidesAndDots();
  startAutoScroll();

  nextButton.addEventListener("click", () => {
    moveToNextSlide();
    handleUserInteraction();
  });

  prevButton.addEventListener("click", () => {
    moveToPrevSlide();
    handleUserInteraction();
  });

  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", resetAutoScroll);
});
document.getElementById("burger-menu").addEventListener("click", function () {
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
});
