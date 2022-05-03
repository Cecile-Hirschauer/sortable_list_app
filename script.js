const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("#check");

const bestDestinations = [
  "Westfjords, Islande",
  "Virginie-Occidentale, Etats-Unis",
  "Xishuangbanna, Chine",
  "Côte patrimoniale du Kent, Angleterre",
  "Porto Rico",
  "Shikoku, Japon",
  "Désert d'Atacama, Chili",
  "Scenic Rim, Australie",
];

const listItems = [];

let dragStartIndex;

const createList = () => {
  [...bestDestinations]
    .map((destination) => ({value: destination, sort: Math.random()}))
    .sort((dest_a, dest_b) => dest_a.sort - dest_b.sort)
    .map(destination => destination.value)
    .forEach((destination, index) => {
    //   console.log(destination);
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="destination-name">${destination}</p>
            <i class="fa-solid fa-grip-lines"></i>
        </div>
        `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
};

createList();
