// Get all the text elements
var textElements = document.querySelectorAll('.fade-in-text');

// Function to check if an element is in the viewport
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight - 50 || document.documentElement.clientHeight -50) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event
function handleScroll() {
  textElements.forEach(function (textElement) {
    if (isElementInViewport(textElement)) {
      // Calculate the distance from the top and bottom of the text element to the viewport
      var distanceToTop = textElement.getBoundingClientRect().top;
      var distanceToBottom = textElement.getBoundingClientRect().bottom;

      // Calculate the opacity based on the distances
      var opacity = 1;

      if (distanceToTop < 0) {
        // Text element is above the viewport
        opacity = 1 + distanceToTop / textElement.offsetHeight;
      } else if (distanceToBottom > window.innerHeight) {
        // Text element is below the viewport
        opacity = 1 - (distanceToBottom - window.innerHeight) / textElement.offsetHeight;
      }

      // Set the opacity of the text element
      textElement.style.opacity = opacity;
    } else {
      // If the text element is not in the viewport, fade it out
      textElement.style.opacity = 0;
    }
  });
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);
