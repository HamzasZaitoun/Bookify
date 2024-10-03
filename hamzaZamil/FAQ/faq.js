function showAnswer(questionNumber) {
  const answerElement = document.getElementById(`faq-answer-${questionNumber}`);
  answerElement.style.display = "block";
}

function hideAnswer(questionNumber) {
  const answerElement = document.getElementById(`faq-answer-${questionNumber}`);
  answerElement.style.display = "none";
}

function showAnswer(questionNumber) {
  const answerElement = document.getElementById(`faq-answer-${questionNumber}`);
  answerElement.classList.add("show");
}

function hideAnswer(questionNumber) {
  const answerElement = document.getElementById(`faq-answer-${questionNumber}`);
  answerElement.classList.remove("show");
}