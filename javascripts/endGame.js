function checkWin() {
  // win var is currently set to win at 8 for testing! Change to 2048 for true win.
  if ($("[data-val=8]").length > 0) {
    priorWin = true;
    endGame('win');
  } else { return false;}
}

function checkLose() {
  for (var i = 0; i < rows.length; i++) {
    var row = generateRow(i);
    if (optionsLeft(row)) { return false; }
  }
  for (var i = 0; i < cols.length; i++) {
    var col = generateCol(i);
    if (optionsLeft(col)) { return false; }
  }
  return true;
}

function optionsLeft(gridElement) {
  for (var i = 1; i < gridElement.length; i++) {
    if (gridElement[i].attr('data-val') === gridElement[i - 1].attr('data-val')) {
      return true;
    }
  }
  return false;
}

function endGame(status) {
  gameOver = true;

  var overlay = $("<div class='gameOver'>");
  var retryButton = $('<button class="retry-button">Try Again?</button>');
  retryButton.click(retryClickHandler);
  var message = $('<h1>');

  overlay.append(message);
  overlay.append(retryButton);

  if (status == 'win') {
    var contButton = $('<button class="cont-button">Continue?</button>');
    contButton.click(continueClickHandler);
    overlay.append(contButton);

    message.text('You won!');
  } else if (status == 'lose') {
    message.text('Game over!');
  } else {
    message.text('Sorry! Unexpected error!');
    console.log('ERROR!');
  }

  // display overlay
  $('#gameboard').append(overlay);
  scaleIn(overlay);

}