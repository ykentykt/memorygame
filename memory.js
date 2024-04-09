const cards4x4 = [
    "A", "A", "B", "B",
    "C", "C", "D", "D",
    "E", "E", "F", "F",
    "G", "G", "H", "H"
  ];
  
  const cards6x6 = [
    "A", "A","B", "B","C", "C",
    "D", "D","E", "E", "F", "F",
    "G", "G","H", "H","I", "I",
    "J", "J","K", "K", "L", "L",
    "M", "M","N", "N","O", "O",
    "P", "P","Q", "Q", "R", "R"
  ];
  
  const gameBoard = document.getElementById("game-board");
  const restartButton = document.getElementById("restart-button");
  const bigButton = document.getElementById("6x6-grid");
  
  let flippedCards = [];
  let matchedCards = 0;
  
  function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function createCard(cardValue) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardInner = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");
    cardInner.classList.add("card-inner");
    cardFront.classList.add("card-face", "card-front");
    cardBack.classList.add("card-face", "card-back");
    cardBack.textContent = cardValue;
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    card.addEventListener("click", () => {
      if (card.classList.contains("flipped") || flippedCards.length === 2) {
        return;
      }
      card.classList.add("flipped");
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        if (card1.querySelector(".card-back").textContent === card2.querySelector(".card-back").textContent) {
          matchedCards++;
          if (matchedCards === array.length / 2) {
            setTimeout(() => {
              alert("You won!");
            }, 500);
          }
        } else {
          setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
          }, 600);
        }
        flippedCards = [];
      }
    });
    return card;
  }
  
  function startGame(array, columns = 4) {
    shuffleCards(array);
    gameBoard.innerHTML = "";
    matchedCards = 0;
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    for (const cardValue of array) {
      const card = createCard(cardValue);
      gameBoard.appendChild(card);
    }
  }

  function startGame1(array, columns = 6) {
    shuffleCards(array);
    gameBoard.innerHTML = "";
    matchedCards = 0;
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gameBoard.style.gridGap = "1px";
    gameBoard.style.margin = "0px 0px 0px";
    for (const cardValue of array) {
      const card = createCard(cardValue);
      gameBoard.appendChild(card);
    }
  }
  
  
  restartButton.addEventListener("click", () => startGame(cards4x4));
  bigButton.addEventListener("click", () => startGame1(cards6x6));
  