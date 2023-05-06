'use strict';

const person = document.querySelector('#person');
const teamCnt = document.querySelector('#count');
const btnPersonName = document.querySelector('.btn-person_name');
const btnCount = document.querySelector('.btn-count');
const teamWrap = document.querySelector('.team-wrap');
const mainWrap = document.querySelector('.wrap');
const nameWrap = document.querySelector('.name-wrap');

let allPeople = JSON.parse(localStorage.getItem('allPeople'));
allPeople = allPeople ?? [];

// 추가되는 사람 배열
let personArr = [];

function render() {
  nameWrap.textContent = '';
  allPeople.forEach((element) => {
    nameWrap.textContent += element.name + ' ';
  });

  allPeople.forEach((el) => {
    personArr.push(el.name);
  });
}

render();

if (nameWrap.textContent !== '') {
  nameWrap.classList.add('border', 'border-gray-300');
}

function addPeople() {
  const name = person.value;
  // name 값이 빈 문자열인 경우 로컬스토리지에 안들어가게
  if (name === '') {
    return;
  }
  allPeople.push({ name });
  localStorage.setItem('allPeople', JSON.stringify(allPeople));
  person.value = '';
}

//* 추가버튼 키보드
person.addEventListener('keydown', (e) => {
  if (window.event.keyCode == 13) {
    addPeople();
    render();
  }
});

//* 추가버튼
btnPersonName.addEventListener('click', () => {
  addPeople();
  render();
});

let allPeopleCount = allPeople.length;

//* 완료버튼
btnCount.addEventListener('click', () => {
  let teamCount = teamCnt.value;

  if (personArr.length < teamCount) {
    alert('현재 팀원보다 팀 수가 많습니다!');
  } else {
    const memberWrap = document.createElement('div');
    teamWrap.appendChild(memberWrap);
    memberWrap.classList.add('member-wrap');

    for (let i = 0; i < teamCount; i++) {
      const teamNameWrap = document.createElement('div');
      teamNameWrap.classList.add('team-name-wrap');
      memberWrap.appendChild(teamNameWrap);

      const teamName = document.createElement('h2');
      teamNameWrap.appendChild(teamName);
      teamName.classList.add('team-name');
      const teamMemberList = document.createElement('p');
      teamMemberList.classList.add('team-member-list');
      teamNameWrap.appendChild(teamMemberList);

      //* 다시하기 버튼
      const btnAgain = document.createElement('button');
      btnAgain.classList.add('btn-again');
      teamWrap.appendChild(btnAgain);
    }
    // btnAgain.textContent = '다시 하기';

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

    const teamNames = document.querySelectorAll('.team-name');
    const teamsArr = divideIntoTeams(personArr, teamCount);
    const teamMemberLists = document.querySelectorAll('.team-member-list');
    let teamMemberListLength = [];

    teamMemberLists.forEach((element, index) => {
      const teamMembers = teamsArr[index];

      teamMembers.forEach((memberName) => {
        element.textContent += memberName + ' ';
      });
    });

    teamNames.forEach((element, index) => {
      element.textContent = `${index + 1}팀 (${allPeople.length}명)`;
    });
  }
});

//* 삭제버튼
function remove() {
  const idx = allPeople.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allPeople.splice(
      allPeople.findIndex((item) => item.len == idx.len),
      1
    );
  }
  localStorage.setItem('allPeople', JSON.stringify(allPeople));
}
