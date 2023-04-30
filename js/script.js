const person = document.querySelector("#person");
const personCnt = document.querySelector("#count");
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
  //   teamMemberList.textContent = "";
  nameWrap.textContent = "";
  allPeople.forEach((element) => {
    // teamMemberList.textContent += element.name + " ";
    nameWrap.textContent += element.name + " ";
  });
}

btnCount.addEventListener("click", () => {
  let personCount = personCnt.value;
  let teamCount = Math.floor(allPeople.length / personCount);

  if (teamCount === 1) {
    teamCount++;
  }

  for (let i = 0; i < teamCount; i++) {
    const teamNameWrap = document.createElement("div");
    teamNameWrap.classList.add("team-name-wrap");
    memberWrap.appendChild(teamNameWrap);

    const teamName = document.createElement("h2");
    teamNameWrap.appendChild(teamName);
    teamName.classList.add("team-name");
    teamName.textContent = `${i + 1}팀 (${allPeople.length}명)`;
  }

  let shakeTeam = [];

  for (let i = 0; i < allPeople.length; i++) {
    shakeTeam.push(allPeople[i].name);
  }
  shuffle(shakeTeam);

  const nameWrapDiv = document.querySelectorAll(".team-name-wrap");
  const memberWrapDiv = document.querySelectorAll(".team-member-list");

  const lastElement = shakeTeam[0];

  let cnt = 0;

  shakeTeam.forEach((teamEl) => {
    cnt = 0;
    nameWrapDiv.forEach((wrapEl) => {
      const teamMemberList = document.createElement("p");
      teamMemberList.classList.add("team-member-list");
      wrapEl.appendChild(teamMemberList);

      for (let i = 0; i < personCount; i++) {
        teamMemberList.textContent += shakeTeam.pop() + " ";
      }
      console.log(cnt);
      console.log(teamCount);
      if (allPeople.length % 2 === 1 && cnt === teamCount - 1) {
        console.log(lastElement);
        teamMemberList.textContent += lastElement;
      }
      cnt++;
    });
  });
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
