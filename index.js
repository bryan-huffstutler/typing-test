let timer_text = document.querySelector(".init_time");
let accuracy_text = document.querySelector(".init_accuracy");
let error_text = document.querySelector(".init_errors");
let words_text = document.querySelector(".init_wpm");
let content_text = document.querySelector(".message");
let input_box = document.querySelector(".words");
let start_btn = document.querySelector(".start");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let time_left = 60;
let time_passed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let typed = 0;
let current_content = "";
let c = 0;
let timer = null;


function ChangeContent() {
  content_text.textContent = null;
  current_content = "It is widely believed that the history of Lorem Ipsum originates with Cicero in the 1st Century BC and his text De Finibus bonorum et malorum. This philosophical work, also known as On the Ends of Good and Evil, was split into five books. The Lorem Ipsum we know today is derived from parts of the first book Liber Primus and its discussion on hedonism, the words of which had been altered, added and removed to make it nonsensical and improper Latin. It is not known exactly when the text gained its current traditional form. However references to the phrase \'lorem ipsum\' can be found in the 1914 Loeb Classical Library Edition of the De Finibus in sections 32 and 33."

  current_content.split('').forEach(char => {
    const charSpan = document.createElement('span');
    charSpan.innerText = char;
    content_text.appendChild(charSpan);
    content_text.className = 'message-active'
  })

}

function textInput() {
  input = input_box.value;
  input_array = input.split('');
  typed++;
  errors = 0;
  quoteSpanArray = content_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typed = input_array[index]
    if (typed == null) {
      char.classList.remove('correct');
    }
    else if (typed === char.innerText) {
      char.classList.add('correct');
      char.style.color = 'green'
    }
    else {
      errors++;
      char.style.color = 'red'
    }
  });

  error_text.textContent = total_errors + errors;
  let correctCharacters = (typed - (total_errors + errors));
  let accuracyData = ((correctCharacters / typed) * 100);
  accuracy_text.textContent = Math.round(accuracyData);

  if (input.length == current_content.length) {
    ChangeContent();
    total_errors += errors;
    input_box.value = "";
  }
}


function updateTimer() {
  if (time_left > 0) {
    time_left--;
    time_passed++;
    timer_text.textContent = time_left;
  }
  else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer)
  input_box.disabled = true;
  content_text.style.display = "none";
  wpm = Math.round((((typed / 5) / time_passed) * 60));
  words_text.textContent = wpm;
  start_btn.textContent = "Start"
  wpm_group.style.display = "block";
}

start_btn.addEventListener('click', () => {
  if(start_btn.textContent = "Start"){
    start_btn.textContent = "Restart"
    return startGame()
  } else if(startGame_btn.innerHTML = "Restart"){
    start_btn.textContent = "Start"
    return resetGame()
  }
})

function startGame() {
  content_text.style.display = "block";
  resetGame();
  ChangeContent();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  
}

function resetGame() {
  time_left = 60;
  time_passed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  typed = 0;
  c = 0;
  input_box.disabled = false;
  input_box.value = "";
  content_text.textContent = "";
  accuracy_text.textContent = 100;
  timer_text.textContent = time_left;
  error_text.textContent = 0;
  wpm_group.style.display = "none";
}
