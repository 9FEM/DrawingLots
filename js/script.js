// "use strict";

const person = document.querySelector("#person");
const teamCnt = document.querySelector("#count");
const btnPersonName = document.querySelector(".btn-person_name");
const btnCount = document.querySelector(".btn-count");
const teamWrap = document.querySelector(".team-wrap");
const mainWrap = document.querySelector(".wrap");
const nameWrap = document.querySelector(".name-wrap");
const teamManager = document.querySelector(".team-manager");

let allPeople = JSON.parse(localStorage.getItem("allPeople"));
allPeople = allPeople ?? [];

// 추가되는 사람 배열
let personArr = [];
render();

function render() {
  personArr = [];
  nameWrap.textContent = "";
  allPeople.forEach((element) => {
    nameWrap.textContent += element.name + " ";
  });

  allPeople.forEach((el) => {
    personArr.push(el.name);
  });
  allPeople = JSON.parse(localStorage.getItem("allPeople"));
}

if (nameWrap.textContent !== "") {
  nameWrap.classList.add("border", "border-gray-300");
}

function addPeople() {
  const name = person.value;
  // name 값이 빈 문자열인 경우 로컬스토리지에 안들어가게
  if (name === "") {
    return;
  }
  allPeople.push({ name, len: allPeople.length + 1 });
  localStorage.setItem("allPeople", JSON.stringify(allPeople));
  person.value = "";
}

//* 추가버튼 키보드
person.addEventListener("keydown", (e) => {
  if (window.event.keyCode == 13) {
    addPeople();
    render();
  }
});

//* 추가버튼
btnPersonName.addEventListener("click", () => {
  addPeople();
  render();
});

let allPeopleCount = allPeople.length;

//* 완료버튼
btnCount.addEventListener("click", () => {
  teamWrap.innerHTML = ``;
  allPeople = JSON.parse(localStorage.getItem("allPeople"));

  let teamCount = teamCnt.value;

  if (personArr.length < teamCount) {
    alert("현재 팀원보다 팀 수가 많습니다!");
  } else {
    const memberWrap = document.createElement("div");
    teamWrap.appendChild(memberWrap);
    memberWrap.classList.add("member-wrap");

    for (let i = 0; i < teamCount; i++) {
      const teamNameWrap = document.createElement("div");
      teamNameWrap.classList.add("team-name-wrap");
      memberWrap.appendChild(teamNameWrap);

      const teamName = document.createElement("h2");
      teamNameWrap.appendChild(teamName);
      teamName.classList.add("team-name");
      const teamMemberList = document.createElement("p");
      teamMemberList.classList.add("team-member-list");
      teamNameWrap.appendChild(teamMemberList);
    }

    function divideIntoTeams(names, teamCount) {
      // 입력된 이름을 랜덤하게 섞기
      const shuffledNames = names.sort(() => Math.random() - 0.5);

      const teams = [];

      // 각 팀에 인원 배정
      for (let i = 0; i < teamCount; i++) {
        teams.push([]);
      }

      let currentTeamIndex = 0;
      shuffledNames.forEach((name) => {
        teams[currentTeamIndex].push(name);
        currentTeamIndex = (currentTeamIndex + 1) % teamCount;
      });

      return teams;
    }

    const teamNames = document.querySelectorAll(".team-name");
    const teamsArr = divideIntoTeams(personArr, teamCount);
    const teamMemberLists = document.querySelectorAll(".team-member-list");
    let teamMemberListLength = [];
    let teamMemberNameList = [];
    console.log(teamsArr);

    //팀당 인원 수 로직.
    for (let i = 0; i < teamMemberLists.length; i++) {
      const teamMembers = teamsArr[i];
      teamMemberNameList = [];
      teamNames[i].textContent = `${i + 1}팀   (${teamMembers.length}명 )`;
      for (let j = 0; j < teamMembers.length; j++) {
        teamMemberNameList.push(teamMembers[j]);
        teamMemberLists[i].textContent = teamMemberNameList;
      }
    }
    //* 다시하기 버튼
    createBtnDrawingAgain();

    //기존 forEach
    // teamNames.forEach((element, index) => {
    //   element.textContent = `${index + 1}팀 (${teamMemberNameList.length}명)`;
    // });

    // teamMemberLists.forEach((element, index) => {
    //   const teamMembers = teamsArr[index];
    //   teamMemberNameList = [];
    //   teamMembers.forEach((memberName) => {
    //     teamMemberNameList.push(memberName);
    //     element.textContent = teamMemberNameList;

    //     console.log(teamMemberNameList);
    //   });
    // });
  }
});

//다시하기 버튼 생성.
function createBtnDrawingAgain() {
  const btnAgain = document.createElement("button");
  btnAgain.classList.add("btn-again");
  teamWrap.appendChild(btnAgain);
  btnAgain.setAttribute("onclick", "drawingAgain()");
  btnAgain.textContent = "다시 하기";
}

//다시하기
function drawingAgain() {
  const memberWrap = document.querySelector(".member-wrap");
  memberWrap.innerHTML = ``;
  teamWrap.innerHTML = ``;
  teamCnt.value = ``;
  render();
}

//* 삭제버튼
function remove() {
  const idx = allPeople.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allPeople.splice(
      allPeople.findIndex((item) => item.len == idx.len),
      1
    );
  }
  localStorage.setItem("allPeople", JSON.stringify(allPeople));

  render();
  memberManagement();
}
//팀원관리 생성.
createBtnMemberManagement();
function createBtnMemberManagement() {
  const btnMemberManagement = document.createElement("button");
  btnMemberManagement.classList.add("management");
  btnMemberManagement.classList.add("open-result-modal-button");
  btnMemberManagement.setAttribute("onclick", "memberManagement()");
  btnMemberManagement.textContent = "팀원관리";
  teamManager.appendChild(btnMemberManagement);
}

//팀원관리 모달 내용 생성.
function memberManagement() {
  const deleteMemberContainer = document.querySelector(
    ".modal-delete-member-container"
  );
  deleteMemberContainer.innerHTML = ``;

  for (const item of allPeople) {
    const deleteMember = document.createElement("button");
    deleteMember.classList.add("deleteMember");
    deleteMember.textContent = item.name;
    deleteMemberContainer.appendChild(deleteMember);
    deleteMember.setAttribute("id", item.len);
    deleteMember.setAttribute("onclick", "remove()");
  }
}
