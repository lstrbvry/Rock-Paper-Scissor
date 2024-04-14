	/* Randomly picks a computer move */
  let score = JSON.parse(localStorage.getItem("score")) || {
    Win: 0,
    Tie: 0,
    Loss: 0,
  };

  // if (!score) {
  // 	score = {
  // 		Win: 0,
  // 		Tie: 0,
  // 		Loss: 0,
  // 	};
  // }
  function pickCompMove() {
    computer = Math.random();
    if (computer <= 1 / 3) {
      computer = "Rock";
    } else if (computer <= 2 / 3) {
      computer = "Paper";
    } else {
      computer = "Scissor";
    }
  }
  /* Display the result as an alert */
  function displayResult() {
    countScore();
    // convertToImg();
    document.querySelector(
      ".js-announce"
    ).innerHTML = `<span class = "result-bold">It's a ${result}!</span><br><br>
    Player picked <img src="img/${player}-emoji.png" alt="" class = 'moved'/> 		computer picked <img src="img/${computer}-emoji.png" alt="" class = 'moved'/>`;
  }
  /* determine the result of the picks */
  function determineResult() {
    if (
      (player === "Rock" && computer === "Paper") ||
      (player === "Paper" && computer === "Scissor") ||
      (player === "Scissor" && computer === "Rock")
    ) {
      result = "Loss";
    } else if (player === computer) {
      result = "Tie";
    } else {
      result = "Win";
    }
  }
  function packedFunctions() {
    pickCompMove();
    /* Win conditions */
    determineResult();
    displayResult();
  }

  function countScore() {
    if (result == "Win") {
      score.Win += 1;
    } else if (result == "Tie") {
      score.Tie += 1;
    } else if (result == "Loss") {
      score.Loss += 1;
    }
    document.querySelector(
      ".js-score"
    ).innerHTML = `Win: ${score.Win} Tie: ${score.Tie} Loss: ${score.Loss}`;
    // console.log(`Win: ${Win}\nTie: ${Tie}\nLoss: ${Loss}`);
    localStorage.setItem("score", JSON.stringify(score));
  }
  function resetScore() {
if (isConfirmed === true)
 {   score.Loss = 0;
    score.Win = 0;
    score.Tie = 0;
    document.querySelector(
      ".js-score"
    ).innerHTML = `Win: ${score.Win} Tie: ${score.Tie} Loss: ${score.Loss}`;
    localStorage.removeItem("score");
    document.querySelector('.confirmation').innerHTML = '';
  }
  isConfirmed = false;
    // document.querySelector(".js-announce").innerHTML = ``;
  }
  // const score = {
  // 	Win: 0,
  // 	Tie: 0,
  // 	Loss: 0,
  // };
  // function convertToImg() {
  // 	if (computer == "Rock") {
  // 		computer = `<img src="img/rock-emoji.png" alt="" class = 'moved'/>`;
  // 	} else if (computer == "Paper") {
  // 		computer = `<img src="img/paper-emoji.png" alt="" class = 'moved'/>`;
  // 	} else if (computer == "Scissor") {
  // 		computer = `<img src="img/scissors-emoji.png" alt="" class = 'moved'/>`;
  // 	}
  // 	if (player == "Rock") {
  // 		player = `<img src="img/rock-emoji.png" alt="" class = 'moved'/>`;
  // 	} else if (player == "Paper") {
  // 		player = `<img src="img/paper-emoji.png" alt="" class = 'moved'/>`;
  // 	} else if (player == "Scissor") {
  // 		player = `<img src="img/scissors-emoji.png" alt="" class = 'moved'/>`;
  // 	}
  // }
  function pickPlayerAuto(){
    player = Math.random();
    if (player <= 1 / 3) {
      player = "Rock";
    } else if (player <= 2 / 3) {
      player = "Paper";
    } else {
      player = "Scissor";
    }
  }
  let player = "";
  let computer = "";
  let result = "";
  let isAutoPlayOn = false
  let autoPlayIntervalID = null;
  function autoPlay(){ 
    if (isAutoPlayOn === false){
      isAutoPlayOn = true;
      autoPlayButton.innerText = 'Stop Playing';
      autoPlayIntervalID = setInterval(() =>{
        pickPlayerAuto();
        packedFunctions();
      }, 500)
    }else if(isAutoPlayOn === true){
      isAutoPlayOn = false;
      autoPlayButton.innerText = 'Auto-Play';
      clearInterval(autoPlayIntervalID);
    }
    
    
  }

  const autoPlayButton = document.querySelector('.auto-play');
  autoPlayButton.addEventListener('click', ()=>{
    autoPlay();
  })


  document.addEventListener('keydown', (event)=>{
    if(event.key === 'a'){
      event.preventDefault();
      autoPlay();
    }
  })

function displayConfirmation(){
  document.querySelector('.confirmation').innerHTML = `<button class = "confirmation-reset js-confirmation-yes"> Yes </button>
  <button class = "confirmation-reset js-confirmation-no"> No </button>
  `
  
  const confirmedYes = document.querySelector('.js-confirmation-yes')
  const confirmedNo = document.querySelector('.js-confirmation-no')

  confirmedNo.addEventListener('click', ()=>{
    document.querySelector('.confirmation').innerHTML = '';
  })

  confirmedYes.addEventListener('click', ()=>{
    isConfirmed = true;
    resetScore();
  })
}

let isConfirmed = false;

