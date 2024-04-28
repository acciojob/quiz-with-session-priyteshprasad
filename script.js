document.addEventListener("DOMContentLoaded", function() {
  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is the highest mountain in the world?",
      choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
      answer: "Everest",
    },
    {
      question: "What is the largest country by area?",
      choices: ["Russia", "China", "Canada", "United States"],
      answer: "Russia",
    },
    {
      question: "Which is the largest planet in our solar system?",
      choices: ["Earth", "Jupiter", "Mars"],
      answer: "Jupiter",
    },
    {
      question: "What is the capital of Canada?",
      choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
      answer: "Ottawa",
    },
  ];

  const questionsElement = document.getElementById("questions");
  const submitButton = document.getElementById("submit");
  const scoreDisplay = document.getElementById("score");

  // Function to render questions
  function renderQuestions() {
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const questionElement = document.createElement("div");
      questionElement.textContent = question.question;

      question.choices.forEach(choice => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${i}`;
        input.value = choice;
        questionElement.appendChild(input);

        const label = document.createElement("label");
        label.textContent = choice;
        questionElement.appendChild(label);

        questionElement.appendChild(document.createElement("br"));
      });

      questionsElement.appendChild(questionElement);
    }
  }

  // Function to calculate score
  function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
      if (selectedOption && selectedOption.value === questions[i].answer) {
        score++;
      }
    }
    return score;
  }

  // Event listener for form submission
  submitButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default button behavior

    // Calculate and display the score
    const score = calculateScore();
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;

    // Save score in local storage
    localStorage.setItem("score", score);
  });

  // Load saved progress from session storage
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  Object.keys(progress).forEach(key => {
    const question = document.querySelector(`input[name="${key}"][value="${progress[key]}"]`);
    if (question) {
      question.checked = true;
    }
  });

  // Save progress in session storage when an option is selected
  questionsElement.addEventListener("change", function(event) {
    const selectedOption = event.target.value;
    const questionIndex = event.target.name.replace("question-", "");
    progress[`question-${questionIndex}`] = selectedOption;
    sessionStorage.setItem("progress", JSON.stringify(progress));
  });

  // Render questions
  renderQuestions();
});
