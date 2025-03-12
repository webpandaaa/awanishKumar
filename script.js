

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


const sideBar = document.querySelector('.side-bar')

// run function on load, scroll and resize for better performance
window.onload = () => controlSideBarFloating()
window.onscroll = () => controlSideBarFloating()
window.onresize = () => controlSideBarFloating()

// lets define some variables
var leftBlock = contentArea
var rightBlock = sideBar
var topSpace = 10
var breakpoint = 992  // we use 992 for col-lg
var stickyClass = 'sticky-sidebar'
var bottomFixedClass = 'bottom-fixed-sidebar'

// now create a function that will create sticky sidebar and use above variables
function controlSideBarFloating(){
    var rectL = leftBlock.getBoundingClientRect();
    var rectR = rightBlock.getBoundingClientRect();
    if(window.innerWidth >= breakpoint){
        if(rectL.top-topSpace + (rectL.height - rectR.height) >= 0 && rectL.top-topSpace <= 0){
            rightBlock.classList.add(stickyClass)
            rightBlock.classList.remove(bottomFixedClass)
        }else if(rectL.top-topSpace + (rectL.height - rectR.height) <= 0){
            rightBlock.classList.remove(stickyClass)
            rightBlock.classList.add(bottomFixedClass)
        }else{
            rightBlock.classList.remove(stickyClass)
            rightBlock.classList.remove(bottomFixedClass)
        }
    }else{
        rightBlock.classList.remove(stickyClass)
        rightBlock.classList.remove(bottomFixedClass)
    }
}
//   var tl2 = gsap.timeline({
//       scrollTrigger: {
//           trigger: "#services",
//           start: "#services  0%",
//           end: "bottom top",
//           scrub: 1,
//           pin: true,
//           markers : true,
  
//       }
  
//   })
  
//    .to("#services #lower #conten-cnt" , {
//       y: -150
//    })
   
   
  
  
  
  
// }

// services();