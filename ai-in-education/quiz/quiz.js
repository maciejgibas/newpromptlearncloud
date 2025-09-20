const quizContainer = document.getElementById("quiz-container");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit-btn");

function buildQuiz() {
  quizContainer.innerHTML = "";
  resultsContainer.innerHTML = "";

  quizData.forEach((q, index) => {
    const questionBlock = document.createElement("div");
    questionBlock.className = "question-block";

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `${index + 1}. ${q.question}`;
    questionBlock.appendChild(questionTitle);

    q.options.forEach((option, i) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="question${index}" value="${i}" />
        ${option}
      `;
      questionBlock.appendChild(label);
    });

    quizContainer.appendChild(questionBlock);
  });
}

function showResults() {
  const answers = quizContainer.querySelectorAll("input[type=radio]:checked");
  resultsContainer.innerHTML = "";
  let score = 0;

  quizData.forEach((q, index) => {
    const userAnswer = answers[index] ? parseInt(answers[index].value) : null;
    const isCorrect = userAnswer === q.correctIndex;

    const result = document.createElement("div");
    result.className = isCorrect ? "correct" : "incorrect";

    result.innerHTML = `
      <strong>${index + 1}. ${q.question}</strong><br/>
      Twoja odpowiedź: <em>${q.options[userAnswer] || "Brak odpowiedzi"}</em><br/>
      ${isCorrect ? "✅ Poprawnie!" : `❌ Błąd. Poprawna odpowiedź: <strong>${q.options[q.correctIndex]}</strong>`}<br/>
      <span class="explanation">${q.explanation}</span>
    `;

    resultsContainer.appendChild(result);
    if (isCorrect) score++;
  });

  const summary = document.createElement("div");
  summary.className = "summary";
  summary.innerHTML = `<h3>Wynik końcowy: ${score} / ${quizData.length}</h3>`;
  resultsContainer.prepend(summary);

  // Zablokuj odpowiedzi
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => radio.disabled = true);

  // Ukryj przycisk sprawdzania
  submitButton.style.display = "none";

  // Dodaj przycisk "Spróbuj jeszcze raz"
  const retryBtn = document.createElement("button");
  retryBtn.id = "retry-btn";
  retryBtn.innerText = "Spróbuj jeszcze raz";
  retryBtn.className = "retry-btn";
  document.getElementById("button-container").appendChild(retryBtn);

  retryBtn.addEventListener("click", () => {
    retryBtn.remove();
    submitButton.style.display = "inline-block";
    buildQuiz(); // Resetujemy quiz
  });
}

buildQuiz();
submitButton.addEventListener("click", showResults);
