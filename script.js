const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const bestDestinations = [
  "Westfjords, Islande",
  "Virginie-Occidentale, Etats-Unis",
  "Xishuangbanna, Chine",
  "Côte patrimoniale du Kent, Angleterre",
  "Porto Rico",
  "Shikoku, Japon",
  "Désert d'Atacama, Chili",
  "Scenic Rim, Australie",
  "Île de Vancouver, Canada",
  "Bourgogne, France"
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...bestDestinations]
    .map((a) => ({value: a, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((destination, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
         <div class="draggable" draggable = "true">
            <p class="destination-name">${destination}</p>
            <i class="fas fa-grip-lines"></i>
        </div>     
        `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add("over");
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove("over");
}
function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const destinationName = listItem
      .querySelector(".draggable")
      .innerText.trim();

    if (destinationName !== bestDestinations[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
