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
    questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.innerHTML = `<p>${question.question}</p>`;

      question.choices.forEach(choice => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question-${index}`;
        input.value = choice;

        // Check if this choice was selected previously
        const previousChoice = sessionStorage.getItem(`progress-${index}`);
        if (previousChoice === choice) {
          input.checked = true;
        }

        const label = document.createElement("label");
        label.textContent = choice;

        questionDiv.appendChild(input);
        questionDiv.appendChild(label);
        questionDiv.appendChild(document.createElement("br"));
      });

      questionsElement.appendChild(questionDiv);
    });
  }

  // Function to calculate score
  function calculateScore() {
    let score = 0;
    questions.forEach((question, index) => {
      const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
      if (selectedOption && selectedOption.value === question.answer) {
        score++;
      }
    });
    return score;
  }

  // Event listener for form submission
  submitButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default button behavior

    // Calculate score
    const score = calculateScore();

    // Display score
    scoreDisplay.textContent = `Your score is ${score} out of 5`;

    // Save score in local storage
    localStorage.setItem("score", score);
  });

  // Event listener for radio button change
  questionsElement.addEventListener("change", function(event) {
    const selectedOption = event.target.value;
    const questionIndex = event.target.name.split("-")[1];
    sessionStorage.setItem(`progress-${questionIndex}`, selectedOption);
  });

  // Render questions
  renderQuestions();

  // Load saved progress from session storage
  questions.forEach((question, index) => {
    const previousChoice = sessionStorage.getItem(`progress-${index}`);
    if (previousChoice) {
      const input = document.querySelector(`input[name="question-${index}"][value="${previousChoice}"]`);
      if (input) {
        input.checked = true;
      }
    }
  });

  // Load saved score from local storage 
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of 5`;
  }
});
