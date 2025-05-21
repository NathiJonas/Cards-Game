const board = document.getElementById('game-board');
const letters = [...'AABBCCDDEEFFGGHH'];
let flippedCards = [];
let matchedCount = 0;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(letter) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.letter = letter;
  card.textContent = '';
  card.addEventListener('click', handleCardClick);
  return card;
}

function handleCardClick(e) {
  const card = e.target;

  if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) {
    return;
  }

  card.classList.add('flipped');
  card.textContent = card.dataset.letter;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.letter === card2.dataset.letter) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      flippedCards = [];
      matchedCount++;

      if (matchedCount === 8) {
        setTimeout(() => alert('Congratulations! You won!'), 200);
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}

function initGame() {
  matchedCount = 0;
  board.innerHTML = '';
  flippedCards = [];
  lockBoard = false;
  const shuffledLetters = shuffle(letters.slice());
  shuffledLetters.forEach(letter => {
    const card = createCard(letter);
    board.appendChild(card);
  });
}

initGame();