const person = document.querySelector("#person");
const teamCnt = document.querySelector("#count");
const btnPersonName = document.querySelector(".btn-person_name");
const btnCount = document.querySelector(".btn-count");
const teamWrap = document.querySelector(".team-wrap");
const mainWrap = document.querySelector(".wrap");
const nameWrap = document.querySelector(".name-wrap");

let allPeople = JSON.parse(localStorage.getItem("allPeople"));
allPeople = allPeople ?? [];

const memberWrap = document.createElement("div");

nameWrap.style.fontSize = "30px";
teamWrap.appendChild(memberWrap);

memberWrap.classList.add("member-wrap");

// teamNameWrap.appendChild(teamMemberList);

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
    nameWrap.textContent += element.name + " ";
  });
}
let allPeopleCount = allPeople.length;
btnCount.addEventListener("click", () => {
  let teamCount = teamCnt.value;

  // let teamCount = Math.floor(allPeople.length / teamCount);

  // if (teamCount === 1) {
  //   // teamCount++;
  // }

  for (let i = 0; i < teamCount; i++) {
    const teamNameWrap = document.createElement("div");
    teamNameWrap.classList.add("team-name-wrap");
    memberWrap.appendChild(teamNameWrap);

    const teamName = document.createElement("h2");
    teamNameWrap.appendChild(teamName);
    teamName.classList.add("team-name");
    teamName.textContent = `${i + 1}팀 (${allPeople.length}명)`;

    const teamMemberList = document.createElement("p");
    teamMemberList.classList.add("team-member-list");
    teamNameWrap.appendChild(teamMemberList);
  }

  const arrayTeamMemberList = Array.from(
    memberWrap.querySelectorAll(".team-member-list")
  );

  let shakeTeam = [];

  let teamArray = [];

  for (let i = 0; i < allPeopleCount; i++) {
    shakeTeam.push(allPeople[i].name);
  }
  shuffle(shakeTeam);

  console.log(shakeTeam);
  // console.log(shakeTeam.splice(0, a));

  for (let i = 0; i < teamCount; i++) {
    let a = Math.floor(allPeopleCount / teamCount);
    let b = Math.ceil(allPeopleCount / teamCount);

    if (teamCount < 3) {
      teamArray.push(shakeTeam.splice(0, a));
      console.log(teamArray);
    } else {
      teamArray.push(shakeTeam.splice(0, b));
      console.log(teamArray);
    }
  }
  // console.log(teamArray);
  for (let i = 0; i < teamCount; i++) {
    arrayTeamMemberList[i].textContent = teamArray[i];
  }

  // for (let i = 0; i < teamCount; i++) {
  //   for (let j = 0; j < teamCount; j++) {
  //     if (shakeTeam[j] === []) {
  //       console.log("empty");
  //       break;
  //     }
  //     teamArray.push(shakeTeam[j]);
  //   }
  // }
});

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function remove() {
  const idx = allPeople.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allPeople.splice(
      allPeople.findIndex((item) => item.len == idx.len),
      1
    );
  }
  localStorage.setItem("allPeople", JSON.stringify(allPeople));
}
