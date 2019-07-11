// Determine the slider and the showcase
const sliderElem = document.querySelector(".slider");
const runner = document.querySelector(".runner");
const showcase = document.querySelector(".showcase");
const sliderWrapper = document.querySelector(".sliderWrapper");
// Prescribe the function of determining the coordinates for the document rather than the window 
function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

runner.onmousedown = function(e) {
  const runnerCoords = getCoords(runner);
  const shiftX = e.pageX - runnerCoords.left;
  const sliderCoords = getCoords(sliderElem);

  document.onmousemove = function(e) {
    // set the limit of movement by the boundaries of the parent`s container
    let newLeft = e.pageX - shiftX - sliderCoords.left;
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = sliderElem.offsetWidth - runner.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    // set to property 'left' new value, because our runner and showcase has relative positions
    runner.style.left = newLeft + "px";
    let computedStyle = getComputedStyle(showcase);
    showcase.style.left = -newLeft * 1.2 + "px"
  };
  // clean document handler
  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };
  // disable selection start (cursor change)
  return false; 
};
// disable default browser handler
runner.ondragstart = function() {
  return false;
};


