const dragElement = document.querySelectorAll(".box .content");
const dropTarget = document.getElementById("dropTarget");
const dropZone = document.getElementById("dropZone");
const resetButton = document.getElementById("reset");
const toast = document.getElementById("toast");

let x;
function showToast() {
  clearTimeout(x);
  toast.style.transform = "translateX(0)";
  x = setTimeout(() => {
    toast.style.transform = "translateX(400px)";
  }, 4000);
}
function closeToast() {
  toast.style.transform = "translateX(400px)";
}

dragElement.forEach((element) => {
  console.log(element);
  // Mouse event listeners for draggable element
  element.addEventListener("dragstart", dragStart);
  element.addEventListener("dragend", dragEnd);

  // Touch event listeners for draggable element
  element.addEventListener("touchstart", dragStart);
  element.addEventListener("touchend", dragEnd);
});

// Touch event listeners for droppable element
dropZone.addEventListener("touchmove", dragOver);
dropZone.addEventListener("touchend", drop);
dropZone.addEventListener("dragenter", dragEnter);
dropZone.addEventListener("dragover", dragOver);
dropZone.addEventListener("drop", drop);

// Reset
resetButton.addEventListener("click", resetHandler);

let dragged = null;

function dragEnter(event) {
  event.target.classList.add("over");
}

function dragStart(event) {
  if (event.type === "touchstart") {
    const touch = event.targetTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    dragged = target;
    target.classList.add("dragging");
    console.log("touching");
  } else {
    console.log(event.target);
    event.target.classList.add("dragging");
    dragged = event.target;
  }
}

function dragEnd(event) {
  // Reset styles or perform cleanup if needed
  event.target.classList.remove("dragging");
}

function dragOver(event) {
  event.preventDefault(); // Prevent default touch behavior
  event.target.classList.remove("over");

  // For touch events, get the touch object and the touched element
  if (event.type === "touchmove") {
    const touch = event.targetTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    console.log("moving");
    if (target === dropZone) {
      event.preventDefault();
      event.target.classList.add("over");
    }
  }
}

function drop(event) {
  event.preventDefault(); // Prevent default touch behavior
  dropZone.appendChild(dragged);
  showToast();
}

function resetHandler(event) {
  event.preventDefault();

  [...dropZone.children, ...dropTarget.children].forEach((el) => {
    dropTarget.appendChild(el);
  });

  while (dropZone.hasChildNodes()) {
    dropZone.removeChild(dropZone.firstChild);
  }
}
