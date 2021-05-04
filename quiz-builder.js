let questions = [
  {
    question: "",
    answer: {},
    correct: ""
  } 
]
let abc = ["a","b","c","d"]

let container = document.querySelector('.answer-container')
let addQuestionBtn = document.querySelector('#add-question')
let addQuestionInput = document.querySelector('#question-input')
let correctLabel = document.querySelector('#corect-label')
let correctSelect = document.querySelector('#correct-select')
let getAnswer = document.querySelector('#get-answer')
let currentLetterCounter = [0]
let questionCounter = 0
let answerCounter = 0
let jsonCode = document.querySelector('.json-code')


addQuestionInput.addEventListener('keyup', (event) => {
  if(event.keyCode === 13) {
    event.preventDefault()
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
    <div class="show-question" id="show-question${questionCounter}">
      <br>
      <h3>${questionCounter}. ${questions[questionCounter-1].question}</h3>

      <div class="answer-border"></div>

      <label id="answer-label">
        <input placeholder="new answer..." type="text" class="input" id="answer-input${questionCounter}">
        <button id="add-answer${questionCounter}"> <span class="plus">+</span></button>
      </label>
  
      <label id="correct-label">
        <select required name="correct" class="select" id="correct-select${questionCounter}">
        <option value="" disabled selected > </option>
  
        </select>
        <button id="correct-answer${questionCounter}"> <span class="plus">+</span></button>
      </label>
    </div>
    `)
    showQuestion = document.querySelector(`#show-question${questionCounter}`)

  showQuestion.insertAdjacentHTML('beforeend',
  `<div class="answers" id="answer-container${questionCounter}"></div>`)

  let addAnswerBtn = document.querySelector(`#add-answer${questionCounter}`)
  let addAnswerInput = document.querySelector(`#answer-input${questionCounter}`)
  let answerContainer = document.querySelector(`#answer-container${questionCounter}`)
  let correctSelect = document.querySelector(`#correct-select${questionCounter}`)
  let correctAnswerBtn = document.querySelector(`#correct-answer${questionCounter}`)

  currentLetterCounter.push(0)
  correctSelect.innerHTML = `<option value="" disabled selected > </option>
  `

  addAnswerInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13) {
      event.preventDefault()
      theAnswer = addAnswerInput.value
      let answerSerial = parseInt(addAnswerBtn.id.slice(-1))
      let answerContainerSerial = parseInt(answerContainer.id.slice(-1))
      if(answerSerial === answerContainerSerial) {
        currentLetterCounter[answerSerial]++
      }
      currentLetter = abc[(currentLetterCounter[answerSerial])-1]
      if((currentLetterCounter[answerSerial])-1 >= abc.length) {
        alert(`You can't add more than 4 answers!`)
      } else {
        questions[answerSerial-1].answer[currentLetter] = theAnswer
        answerCounter++
        
        correctSelect.insertAdjacentHTML('beforeend', `<option value="${abc[(currentLetterCounter[answerSerial])-1]}">${abc[(currentLetterCounter[answerSerial])-1]}</option>`)
    
        answerContainer.insertAdjacentHTML('beforeend',
        `<h4>${currentLetter}, ${questions[answerSerial-1].answer[currentLetter]}</h4>
        </div>
        `)
      }
    }
  })

    correctAnswerBtn.addEventListener('click', () => {
      correctAnswer = correctSelect.value
      let correctCounter = parseInt(correctAnswerBtn.id.slice(-1))
      questions[correctCounter-1].correct = correctAnswer
    })
  }
})

logBtn = document.querySelector('#consol')

logBtn.addEventListener('click', () => {
  if(questionCounter > 0){
  delete questions[questionCounter]
  questions.pop()
  questions.splice(questions.length, 1)

  jsonCode.insertAdjacentHTML('beforebegin', 
  `


    "questions": {`)
  jsonCode.insertAdjacentHTML('afterend', `
  }
  `)
  for (let i = 0; i < questions.length; i++) {
    if(i == questions.length-2) {
      jsonCode.insertAdjacentHTML('beforeend', 
      `{
        "question": "${questions[i].question}",
        "answer": {
          "a":  "${questions[i].answer.a}",
          "b":  "${questions[i].answer.b}",
          "c":  "${questions[i].answer.c}",
          "d":  "${questions[i].answer.d}"
        },
        "correct": "${questions[i].correct}"
      }`)
    } else {
      jsonCode.insertAdjacentHTML('beforeend', 
      `{
        "question": "${questions[i].question}",
        "answer": {
          "a":  "${questions[i].answer.a}",
          "b":  "${questions[i].answer.b}",
          "c":  "${questions[i].answer.c}",
          "d":  "${questions[i].answer.d}"
        },
        "correct": "${questions[i].correct}"
      },`)
    }
  }

} else {
    alert('You need to add at least one question !')
  }

})
