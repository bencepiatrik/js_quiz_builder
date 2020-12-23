let questions = [
  {
    question: "",
    answer: {},
    correct: ""
  } 
]
let abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

let container = document.querySelector('.container')
let addQuestionBtn = document.querySelector('#add-question')
let addQuestionInput = document.querySelector('#question-input')
let correctLabel = document.querySelector('#corect-label')
let correctSelect = document.querySelector('#correct-select')
let getAnswer = document.querySelector('#get-answer')
let currentLetterCounter = [0]
let questionCounter = 0
let answerCounter = 0

addQuestionBtn.addEventListener('click', () => {
  theQuestion = addQuestionInput.value
  questions[questionCounter].question = theQuestion;
  questions.push(  {
    question: "",
    answer: {},
    correct: ""
  })
  questionCounter++
  answerCounter = 0

  container.insertAdjacentHTML ('beforeend',
  `
  <div style="margin-left:75px" id="show-question${questionCounter}">
    <br>
    <h3>${questionCounter}. ${questions[questionCounter-1].question}</h3>
    <label id="answer-label">
      <input placeholder="add an answer..." type="text" class="input" id="answer-input${questionCounter}">
      <button id="add-answer${questionCounter}"> <span class="plus">+</span></button>
    </label>

    <label id="correct-label">
      <select required name="correct" class="select" id="correct-select${questionCounter}">
      <option value="" disabled selected >Select correct</option>

      </select>
      <button id="correct-answer${questionCounter}"> <span class="plus">+</span></button>
    </label>
  </div>
  `
)
  showQuestion = document.querySelector(`#show-question${questionCounter}`)

  showQuestion.insertAdjacentHTML('beforeend',
  `<div style="margin-left:50px" id="answer-container${questionCounter}"></div>`)

  let addAnswerBtn = document.querySelector(`#add-answer${questionCounter}`)
  let addAnswerInput = document.querySelector(`#answer-input${questionCounter}`)
  let answerContainer = document.querySelector(`#answer-container${questionCounter}`)
  let correctSelect = document.querySelector(`#correct-select${questionCounter}`)
  let correctAnswerBtn = document.querySelector(`#correct-answer${questionCounter}`)

  currentLetterCounter.push(0)
  correctSelect.innerHTML = `<option value="" disabled selected >Select correct</option>
  `

  addAnswerBtn.addEventListener('click', () => {
    theAnswer = addAnswerInput.value
    let answerSerial = parseInt(addAnswerBtn.id.slice(-1))
    let answerContainerSerial = parseInt(answerContainer.id.slice(-1))
    if(answerSerial === answerContainerSerial) {
      currentLetterCounter[answerSerial]++
    }
    currentLetter = abc[(currentLetterCounter[answerSerial])-1]
    questions[answerSerial-1].answer[currentLetter] = theAnswer
    answerCounter++
    
    correctSelect.insertAdjacentHTML('beforeend', `<option value="${abc[(currentLetterCounter[answerSerial])-1]}">${abc[(currentLetterCounter[answerSerial])-1]}</option>`)

    answerContainer.insertAdjacentHTML('beforeend',
    `<h4>${currentLetter}: ${questions[answerSerial-1].answer[currentLetter]}</h4>
    </div>
    `)
    })
  correctAnswerBtn.addEventListener('click', () => {
    correctAnswer = correctSelect.value
    let correctCounter = parseInt(correctAnswerBtn.id.slice(-1))
    questions[correctCounter-1].correct = correctAnswer
  })
})

logBtn = document.querySelector('#consol')

logBtn.addEventListener('click', () => {
  if(questionCounter > 0){
  delete questions[questionCounter]
  questions.pop()
  console.log(questions)
  questions.push(0)
  } else {
    console.log('You need to add at least one question')
  }
})
