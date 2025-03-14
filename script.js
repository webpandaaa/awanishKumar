


document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll("#links a");

  function setActiveLink() {
      links.forEach(link => link.classList.remove("active")); // Remove active class from all
      this.classList.add("active"); // Add active class to clicked link
      localStorage.setItem("activeLink", this.getAttribute("href")); // Store active link in local storage
  }

  links.forEach(link => {
      link.addEventListener("click", setActiveLink);
      if (localStorage.getItem("activeLink") === link.getAttribute("href")) {
          link.classList.add("active");
      }
  });
});


function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco()


function appear(){
  // Select all elements with the class '.appear'
const appearElements = document.querySelectorAll('.appear');

// Create an intersection observer to detect when the element comes into view
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');  // Trigger the animation when the element is in view
      observer.unobserve(entry.target);  // Stop observing once the element is in view (animation triggered)
    }
  });
}, { threshold: 0.5 });  // Element is considered in view when 50% is visible (adjust as needed)

// Observe each element with the 'appear' class
appearElements.forEach(element => {
  observer.observe(element);
});

}

appear();


function loading(){
  var tl = gsap.timeline();

  tl.from("#nav", {
    duration: 1.2,
    y: "-100px",
    ease: "expo.out",
  });

  tl.from("#hero h1", {
    duration: 1.2,
    y: "50px",
    opacity : 0,
    ease: "expo.out",
  }, "-=0.5");

  tl.from("#hero p", {
    duration: 1.2,
    y: "50px",
    opacity : 0,
    ease: "expo.out",
  }, "-=0.5");

  tl.from("#hero #buttondiv", {
    duration: 1.2,
    y: "50px",
    opacity : 0,
    ease: "expo.out",
  }, "-=0.5");

}

loading();


document.addEventListener("DOMContentLoaded", () => {
  const countNumbers = document.querySelectorAll(".numbers");
  const speed = 50;

  const startCounting = (count) => {
    const targetNumber = parseInt(count.dataset.number);
    let startingNumber = 0; // Start from 0 to animate correctly

    const updateNumber = () => {
      const increment = Math.ceil(targetNumber / speed);
      if (startingNumber < targetNumber) {
        startingNumber += increment;
        count.innerText = `${startingNumber}+`; // Update UI
        setTimeout(updateNumber, 20);
      } else {
        count.innerText = `${targetNumber}+`; // Ensure it stops at the exact number
      }
    };

    updateNumber();
  };

  // Intersection Observer
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounting(entry.target);
          observer.unobserve(entry.target); // Unobserve after triggering animation
        }
      });
    },
    { threshold: 0.5 } // Adjust threshold if needed
  );

  // Observe each element
  countNumbers.forEach((count) => {
    observer.observe(count);
  });
});

