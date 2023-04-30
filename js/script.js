const person = document.querySelector("#person");
const personCnt = document.querySelector("#count");
const btnPersonName = document.querySelector(".btn-person_name");
const btnCount = document.querySelector("#btn-count");
const memberWrap = document.querySelector(".member-wrap");
const memberNameWrap = document.querySelector(".member-name-wrap");

const nameWrap = document.createElement("div");

let allPeople = JSON.parse(localStorage.getItem("allPeople"));
allPeople = allPeople ?? [];

nameWrap.classList.add("name-wrap");
memberWrap.appendChild(nameWrap);

render();

btnPersonName.addEventListener("click", () => {
  let name = person.value;
  allPeople.push({ name });
  localStorage.setItem("allPeople", JSON.stringify(allPeople));
  person.value = "";
  render();
});

function render() {
  nameWrap.textContent = "";
  allPeople.forEach((element) => {
    nameWrap.textContent += element.name + ",";
  });
}
