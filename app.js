// Get references to the UI elements
let question_element = document.getElementById("question_element");
let answer1_checkbox = document.getElementById("answer1_checkbox");
let answer1_label = document.getElementById("answer1_label");
let answer2_checkbox = document.getElementById("answer2_checkbox");
let answer2_label = document.getElementById("answer2_label");
let answer3_checkbox = document.getElementById("answer3_checkbox");
let answer3_label = document.getElementById("answer3_label");
let answer4_checkbox = document.getElementById("answer4_checkbox");
let answer4_label = document.getElementById("answer4_label");
let next_question_button = document.getElementById("next_question");
let previous_question_button = document.getElementById("previous_question");
let show_answer_button = document.getElementById("show_answer");

let question_number_element = document.getElementById(
  "question_number_element"
);

let random_question_button = document.getElementById("random_question");

class Question {
  constructor() {
    this.index = 0; // Start with the first question
    this.questions = []; // Array to hold the questions
    this.correctAnswer = 0; // Correct answer index
    this.showQuestionNumber();
  }

  async getQuestions() {
    const response = await fetch("questions.json");
    const questions = await response.json();
    this.questions = questions;
    this.displayQuestion();
  }

  displayQuestion() {
    const currentQuestion = this.questions[this.index];
    if (currentQuestion) {
      let { question, answer1, answer2, answer3, answer4, correctanswer } =
        currentQuestion;
      this.loadQuestions(question, answer1, answer2, answer3, answer4);
      this.correctAnswer = correctanswer;
    } else {
      console.log("No questions available");
    }
  }

  loadQuestions(question, answer1, answer2, answer3, answer4) {
    question_element.innerText = question;
    answer1_label.innerText = answer1;
    answer2_label.innerText = answer2;
    answer3_label.innerText = answer3;
    answer4_label.innerText = answer4;
  }

  showAnswer() {
    if (this.correctAnswer > 0 && this.correctAnswer <= 4) {
      // Highlight the correct answer label
      switch (this.correctAnswer) {
        case 1:
          answer1_label.style.background = "#4bb543";
          break;
        case 2:
          answer2_label.style.background = "#4bb543";
          break;
        case 3:
          answer3_label.style.background = "#4bb543";
          break;
        case 4:
          answer4_label.style.background = "#4bb543";
          break;
        default:
          console.log("Invalid answer index");
      }
    }
  }

  unshow_answer() {
    answer1_label.style.background = "white";

    answer2_label.style.background = "white";

    answer3_label.style.background = "white";

    answer4_label.style.background = "white";

    answer1_checkbox.checked = false;
    answer2_checkbox.checked = false;
    answer3_checkbox.checked = false;
    answer4_checkbox.checked = false;
  }

  nextQuestion() {
    this.showQuestionNumber();
    this.unshow_answer();
    if (this.index < this.questions.length - 1) {
      this.index++;
      this.displayQuestion();
    } else {
      console.log("You are at the last question");
    }
  }

  previousQuestion() {
    this.showQuestionNumber();
    this.unshow_answer();
    if (this.index > 0) {
      this.index--;
      this.displayQuestion();
    } else {
      console.log("You are at the first question");
    }
  }

  showQuestionNumber() {
    question_number_element.innerText = this.index;
  }

  goToQeustion(number) {
    if (number >= 0 && number < this.questions.length) {
      this.index = number; // Update the question index
      this.displayQuestion(); // Refresh the UI with the new question
      this.showQuestionNumber();
    } else {
      console.log("Invalid question number"); // Handle out-of-bound numbers
    }
  }
}

// Instantiate the Question class and load the first question
const theQuestion = new Question();
theQuestion.getQuestions();

// Event listeners for buttons
next_question_button.addEventListener("click", function () {
  theQuestion.nextQuestion();
});

previous_question_button.addEventListener("click", function () {
  theQuestion.previousQuestion();
});

show_answer_button.addEventListener("click", function () {
  theQuestion.showAnswer();
});

random_question_button.addEventListener("click", function () {
  const randomIndex = Math.floor(Math.random() * theQuestion.questions.length); // Generate a random number within the range of questions
  theQuestion.goToQeustion(randomIndex); // Navigate to the random question
  theQuestion.unshow_answer();
});
