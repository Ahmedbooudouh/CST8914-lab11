//pseudocode
/*
  1.Grab the accordion buttons from the DOM
  2. go through each accordion button one by one
  3. Use the classlist dom method in combination with the toggle method provided by the DOM to add or remove the "is-open" class. At this point, the accordion button should be able to switch back and forth between its font awesome icons but there is no content inside of it. This is because of the overflow:hidden and the max-height of zero; it is hiding our content. So now we must use javascript to change these values with DOM CSS
  4. get the div that has the content of the accordion button you are currently looking at; we do this using the .nextElementSibling method which allows us to look at the html element that is directly next to the current html element we are looking at. Since we are currently looking at a button (accordion button), the next element after that is the div with the class accordion-content. This is exactly what we want because it allows us to work with the div that has the content that we want to display. Also please note that we could have got to this div in another way but this is the "shortest path" to our answer.
  
  5. set the max-height based on whether the current value of the max-height css property. If the max-height is currently 0 (if the page has just been visited for the first time) or null (if it has been toggled once already) which means that it is closed, you will give it an actual value so the content will be shown; if not then that means the max-height currently has a value and you can set it back to null to close it.
  6. If the accordion is closed we set the max-height of the currently hidden text inside the accordion from 0 to the scroll height of the content inside the accordion. The scroll height refers to the height of an html element in pixels. For this specific example, we are talking about the height of the div with the class accordion-content with all of its nested ptags
*/

const accordionBtns = document.querySelectorAll(".accordion");
const accordionButtons = document.querySelectorAll(".accordion");
const buttons = Array.from(accordionButtons);

buttons.forEach((button, index) => {
  const panelId = button.getAttribute("aria-controls");
  const panel = document.getElementById(panelId);

  button.setAttribute("aria-expanded", "false");
  if (panel) {
    panel.style.maxHeight = null;
    panel.setAttribute("aria-hidden", "true");
  }

  button.addEventListener("click", () => {
    toggleAccordion(button);
  });

  // Keyboard interaction
  button.addEventListener("keydown", (event) => {
    switch (event.key) {
      case " ":
      case "Spacebar": // older browsers
      case "Enter":
        event.preventDefault();
        toggleAccordion(button);
        break;

      case "ArrowDown":
      case "Down":
        event.preventDefault();
        focusNextButton(index);
        break;

      case "ArrowUp":
      case "Up":
        event.preventDefault();
        focusPreviousButton(index);
        break;

      case "Home":
        event.preventDefault();
        buttons[0].focus();
        break;

      case "End":
        event.preventDefault();
        buttons[buttons.length - 1].focus();
        break;

      default:
        break;
    }
  });
});


function toggleAccordion(button) {
  const panelId = button.getAttribute("aria-controls");
  const panel = document.getElementById(panelId);
  const isExpanded = button.getAttribute("aria-expanded") === "true";

  button.classList.toggle("is-open", !isExpanded);

  button.setAttribute("aria-expanded", String(!isExpanded));

  if (panel) {
    if (!isExpanded) {
      
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.setAttribute("aria-hidden", "false");
    } else {
    
      panel.style.maxHeight = null;
      panel.setAttribute("aria-hidden", "true");
    }
  }
}

function focusNextButton(currentIndex) {
  const nextIndex = (currentIndex + 1) % buttons.length;
  buttons[nextIndex].focus();
}

function focusPreviousButton(currentIndex) {
  const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
  buttons[prevIndex].focus();
}