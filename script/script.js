window.addEventListener('DOMContentLoaded', () => {
const 
      mainWrapper = document.querySelector('#wrapper')
      btnMenu = document.querySelector('#menu'),
      navigation = document.querySelector('.navigation'),
      buttonsStartTest = document.querySelectorAll('#startTest'),
      navTitle = document.querySelector('.nav__title');
      navTitleNew = document.querySelector('#navTitleNew');

const openMenu = function(){
  const wrapperMenu = document.createElement('div');
  wrapperMenu.classList.add('wrapper__menu');
  wrapperMenu.innerHTML = `
            <div class="wrapper__menu">
              <div class="wrapper__menu_container">
                <button type="button" class="btn_exit" id="btn_exit"><img src="./img/icon/exit.svg" alt="exit"></button>
                <a href="/" >ГЛАВНАЯ</a>
                <a href="#aboutTest" >ИНФОРМАЦИЯ О ТЕСТЕ</a>
                <a href="" id="goToTest">ПРОЙТИ ТЕСТ</a>
              </div>
            </div>`
  navigation.append(wrapperMenu);

  const btnExit = document.querySelector('#btn_exit');
  btnExit.addEventListener('click', closeMenu);

  const linksMenu = document.querySelectorAll('a[href="#aboutTest"]')
  linksMenu.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const elem = this.getAttribute('href').substring(1);
          scrollToElement(elem);
          closeMenu();
        })
  })
  
  const linkStartTest = document.querySelector('#goToTest');
  linkStartTest.addEventListener('click', function(e){
    e.preventDefault();
    closeMenu();
    renderTest();
  })
}

const scrollToElement = function(elem) {
const targetElement = document.getElementById(elem);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

const closeMenu = function() {
  const wrapperMenu = document.querySelector('.wrapper__menu');
  if (wrapperMenu) {
    wrapperMenu.remove();
  }
};

btnMenu.addEventListener('click', openMenu);

const data = [];
const questions = [
  'Ваш пол:',
  'Укажите ваш возраст:',
  'Выберите лишнее:',
  'Выберите лишнее:',
  'Продолжите числовой ряд: 18 20 24 32',
  'Выберите цвет, который сейчас наиболее Вам приятен:',
  'Отдохните пару секунд, еще раз Выберите цвет, который сейчас наиболее Вам приятен:',
  'Какой из городов лишний?',
  'Выберите правильную фигуру из четырёх пронумерованных.',
  'Вам привычнее и важнее:',
  'Какое определение, по-Вашему, больше подходит к этому геометрическому изображению:',
  'Вставьте подходящее число',
  'Вставьте подходящее число',
]
const answers = {
  0:['Мужчина','Женщина'],
  1:['До 18','От 18 до 28','От 29 до 35','От 36'],
  2:['Дом','Шалаш','Бунгало','Скамейка','Хижина'],
  3:['Дом','Шалаш','Бунгало','Скамейка','Хижина'],
  4:[62,48,74,57,60,77],
  5:['#A8A8A8','#0000A9','#00A701','#F60100','#FDFF19','#A95403','#000000','#850068','#46B2AC'],
  6:['#A8A8A8','#46B2AC','#A95403','#00A701','#000000','#F60100','#850068','#FDFF19','#0000A9'],
  7:['Вашингтон','Лондон','Париж','Нью-Йорк','Москва','Оттава'],
  8:[1,2,3,4],
  9:['Наслаждаться каждой минутой проведенного времени', 'Быть устремленными мыслями в будущее','Учитывать в ежедневной практике прошлый опыт'],
  10:['Оно остроконечное','Оно устойчиво','Оно находится в состоянии равновесия'],
  11:[34,36,53,44,66,42],
  12:[34,36,53,44,66,42],
} 

let currentQuestion = 0;

const renderQuestion = () => {
  const questionContent = `
    <h3 style="${currentQuestion ==8 ?'margin: 0;' : ''}" >${questions[currentQuestion]}</h3>
    <div class="checkboxs__wrapper ${currentQuestion == 5 || currentQuestion == 6 ? 'checkboxs-square' : ''}">
        ${currentQuestion == 5 || currentQuestion == 6 
        ? 
          answers[currentQuestion].map((item) => {
          return `<div class="wrapper__square" 
                      data-value="${item}" 
                      style="background-color: ${item};">
                  </div>`   
        }).join('') 
        : currentQuestion == 8
        ?
          `<div class="wrapper__items">
            <img 
              src="/img/svg/image8.svg" 
              alt="" 
              class="image8"
            >
            <div class="items">
              ${answers[currentQuestion].map((item) => {
              return `
                      <div 
                        class="item__square" 
                        data-value="${item}" 
                      >
                        ${item}
                      </div>`   
              }).join('')}
            </div>
          </div>`
        : currentQuestion == 11 || currentQuestion == 12
        ? `<div class="wrapper__items">
            <img 
              src="/img/svg/image11.svg" 
              alt="" 
              class="image11"
              style="${currentQuestion == 11 || currentQuestion == 12 ? 'height: 207px;' : ''}"
            >
            <div class="line"></div>
            <div class="items__question11">
              ${answers[currentQuestion].map((item) => {
              return `
                      <div 
                        class="item__square" 
                        data-value="${item}" 
                      >
                        ${item}
                      </div>`   
              }).join('')}
            </div>
          </div>`
        :
          `<div class="${currentQuestion == 10 ? 'wrapper__qust10' : '' }">
            <img 
              src="/img/svg/image10.svg" 
              alt="" 
              class="image10" 
              style="${currentQuestion == 10 ? 'height: 115px;' : ''}"
            >
            ${answers[currentQuestion].map((item, index) => {
            return `<div class="checkbox-container  
                      ${answers[currentQuestion].length > 5 ? 'checkbox-container-min' : ''}
                      ${currentQuestion == 9 ? 'checkbox-container-max' : ''}
                    ">
                      <input 
                        type="radio" 
                        id="answerChoice${index}" 
                        name="answerChoice" 
                        value="${item}"
                        class="custom-checkbox"
                      >
                      <label for="answerChoice${index}">
                        ${item}
                        </label>
                    </div>`
              }).join('')}
          </div>`
        } 
    </div>`;
  return questionContent;
};

const renderTest = ()=>{
  navTitle.style.display = 'flex';
  const modalTest = document.createElement('div');
  modalTest.classList.add('test__wrapper');
  modalTest.innerHTML=`
        <div class="progress">
          <div class="finished"></div>
          <div class="residue"></div>
        </div>
        <div class="wrapper__question">
          <div class="wrapper__question_content" id="questionContent">
              <div class="checkboxs">
                  ${renderQuestion()}
              </div>   
          </div>
          <button type="button" class="button__primary" id="nextQuestion" disabled>ДАЛЕЕ</button>
        </div>
  `
  mainWrapper.append(modalTest);  

  const changeQuestion = ()=> {
    const nextQuestion = document.getElementById('nextQuestion')

    nextQuestion.removeEventListener('click', changeQuestion);
    nextQuestion.disabled = true;

    const finished = document.querySelector('.finished');
    if (!finished.style.width) {
      finished.style.width = '20px'; 
    }
    let currentWidth = parseFloat(finished.style.width);
    finished.style.width = `${currentWidth + 20}px`;

    if (currentQuestion == 5 || currentQuestion == 6 ) {
      const selectedSquares = document.querySelectorAll('.wrapper__square.selected');
      selectedSquares.forEach(square => {
        data.push(square.getAttribute('data-value'));
      });
             
    }else if(currentQuestion == 8 || currentQuestion == 11 || currentQuestion == 12){
      const selectedItems = document.querySelectorAll('.item__square.selected');
      selectedItems.forEach(item => {
        data.push(item.getAttribute('data-value'));
      })
    }else{
      const checkboxes = document.querySelectorAll('input[name="answerChoice"]:checked');
      checkboxes.forEach(checkbox => {
      data.push(checkbox.value);
      });
    }
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;

      const questionContent = document.getElementById('questionContent');
      questionContent.innerHTML = renderQuestion();

      nextQuestion.addEventListener('click', changeQuestion);

      if (currentQuestion == 5 || currentQuestion == 6 ) {
        document.querySelectorAll('.wrapper__square').forEach(square => {
          square.addEventListener('click', function() {
            this.classList.toggle('selected');
            checkSelection();
          });
        });
      }
      if (currentQuestion == 8 || currentQuestion == 11 || currentQuestion == 12) {
        document.querySelectorAll('.item__square').forEach(item => {
          item.addEventListener('click', function() {
            this.classList.toggle('selected');
            checkSelection();
          });
        });
      }

      const oldCheckboxes = document.querySelectorAll('input[name="answerChoice"]');
      oldCheckboxes.forEach(checkbox => {
        checkbox.removeEventListener('change', checkSelection);
      });

      const newCheckboxes = document.querySelectorAll('input[name="answerChoice"]');
      newCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkSelection);
      });
      checkSelection();
    } else {
      console.log(data);
      questionContent.remove();
      nextQuestion.remove();

      const wrapperQuestion = document.querySelector('.wrapper__question');
      const wrapperLoader = document.createElement('div');
      wrapperLoader.classList.add('wrapper__loader');
      wrapperLoader.innerHTML = `
        <h4>Обработка результатов</h4>
        <div class="spiner">
          <img src="/img/svg/spiner.svg" alt="spiner">
        </div>
        <span>
          Определение стиля мышления......................
          ......................................................................
        </span>`
      wrapperQuestion.append(wrapperLoader);
     
      const showWindowResult = setTimeout(()=>{
        
        let seconds = '0'+0;
        let minutes = 10;

        navTitleNew.innerHTML = 'готово!'
        navTitleNew.classList.add('navTitleNew')
        modalTest.innerHTML=`
          <div class="wrapper__results">
            <h2>Ваш результат рассчитан: </h2>
            <p><span class="about__result">Вы относитесь к 3%</span> респондентов, 
                чей уровень интеллекта более чем на <br>
                15 пунктов отличается от среднего в большую или меньшую сторону! 
            </p>
            <h1>Скорее получите свой результат!</h1>
            <div class="about__call">В целях защиты персональных 
                  данных результат теста, их подробная интерпретация и рекомендации 
                  доступны в виде голосового сообщения по звонку с вашего мобильного телефона
            </div>
            <span class="timer">Звоните скорее, запись доступна всего <br><span id="minutes">${minutes}:</span><span id="seconds">${seconds}</span> минут
            <button type="submit" id="getResults" class="button__get-results">
              <img src="/img/svg/call.svg">
              <p>Позвонить и прослушать результат</p>
            </button>
            <div class="results" id="results"></div>
            <div class="footer__results">
              TERMENI SI CONDITII: ACESTA ESTE UN SERVICIU DE DIVERTISMENT. PRIN FOLOSIREA LUI DECLARATI CA AVETI 18 ANI IMPLINITI,
            </div>
          </div>`

        const buttonGetResults = document.querySelector('#getResults');   
        const results = document.querySelector('#results');   

        const minutesWrapp = document.querySelector('#minutes');
        const secondsWrapp = document.querySelector('#seconds');
        let timer;
        
        const startTimer = ()=>{
            timer = setInterval(() => {
            if (seconds === 0 && minutes === 0) {
                clearInterval(timer);
                buttonGetResults.disabled = true;
                return;
            }
            if (seconds <= 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            minutesWrapp.innerText = minutes < 10 ? '0' + minutes +':' : minutes;
            secondsWrapp.innerText = seconds < 10 ? '0' + seconds : seconds;
          }, 1000);
        }
        startTimer();

        buttonGetResults.addEventListener('click', function(){
          clearInterval(timer);
          fetch('https://swapi.dev/api/people/1/')
          .then(response => {
            if(!response.ok){
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            const dataResults = document.createElement('div');
            dataResults.classList.add('dataResults');
            dataResults.innerHTML = `
              <p><span class="name__result">Имя: </span>${data.name}</p>
              <p><span class="name__result">Год рождения: </span>${data.birth_year}</p>
              <p><span class="name__result">Рост: </span>${data.height}</p>
              <p><span class="name__result">Создан: </span>${data.created}</p>
              <p><span class="name__result">Исправлен: </span>${data.edited}</p>
              <p><span class="name__result">Цвет кожи: </span>${data.skin_color}</p>
              <p><span class="name__result">Цвет волос: </span>${data.hair_color}</p>
            `
            results.append(dataResults)
          })
          .catch(error => {
            console.error('Fetch error:', error);
          })
        })
      }, 3000)  
    }
  }
   
  nextQuestion.addEventListener('click', changeQuestion);

  const checkSelection = () => {
    const checkboxes = document.querySelectorAll('input[name="answerChoice"]');
    const selectedCheckbox = Array.from(checkboxes).some(checkbox => checkbox.checked);    
    const selectedSquares = document.querySelectorAll('.wrapper__square.selected');
    const selectedItems = document.querySelectorAll('.item__square.selected');
    
    nextQuestion.disabled = !(
      selectedCheckbox || 
      selectedSquares.length > 0 ||
      selectedItems.length > 0
    );
  };
  checkSelection();
  const checkboxes = document.querySelectorAll('input[name="answerChoice"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', checkSelection);
  });
}
  buttonsStartTest.forEach(elem => {
    elem.addEventListener('click', renderTest)
  })
})



