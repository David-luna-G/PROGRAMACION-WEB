/**
 * Tic-Tac-Toe Engine
 * Arquitectura modular guiada por estado (State-Driven).
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- COMBINACIONES GANADORAS ---
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
  ];

  // --- ESTADO DEL JUEGO (Single Source of Truth) ---
  const state = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    isGameActive: true,
    scores: {
      X: 0,
      O: 0,
      ties: 0
    }
  };

  // --- REFERENCIAS AL DOM ---
  const boardElement = document.getElementById('board');
  const cells = Array.from(document.querySelectorAll('.cell'));
  const statusLabel = document.getElementById('statusLabel');
  const statusBadge = document.getElementById('statusBadge');
  const resetBtn = document.getElementById('resetBtn');
  const scoreXEl = document.getElementById('scoreX');
  const scoreOEl = document.getElementById('scoreO');
  const scoreTiesEl = document.getElementById('scoreTies');

  // --- MANEJADORES DE EVENTOS ---
  function initGame() {
    // Event Delegation para un mejor rendimiento
    boardElement.addEventListener('click', handleCellClick);
    resetBtn.addEventListener('click', resetGame);
    render();
  }

  /**
   * CASO LÍMITE 1 y 2: Validaciones antes de ejecutar un movimiento
   */
  function handleCellClick(e) {
    const cell = e.target.closest('.cell');
    
    // Si no se hizo click en una casilla, ignorar
    if (!cell) return;

    const index = parseInt(cell.getAttribute('data-cell-index'), 10);

    // CASO LÍMITE 1: Evitar sobreescribir celdas ya ocupadas
    if (state.board[index] !== null) return;

    // CASO LÍMITE 2: Evitar clics si la partida ya finalizó
    if (!state.isGameActive) return;

    // Registrar el movimiento en el estado
    executeMove(index);
  }

  function executeMove(index) {
    state.board[index] = state.currentPlayer;

    const winResult = checkWin();

    if (winResult) {
      handleWin(winResult);
    } else if (checkTie()) {
      handleTie();
    } else {
      switchTurn();
    }

    render();
  }

  function switchTurn() {
    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWin() {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (
        state.board[a] &&
        state.board[a] === state.board[b] &&
        state.board[a] === state.board[c]
      ) {
        return { winner: state.board[a], combo };
      }
    }
    return null;
  }

  function checkTie() {
    return state.board.every(cell => cell !== null);
  }

  /**
   * CASO LÍMITE 2: Deshabilitar el juego inmediatamente tras la victoria
   */
  function handleWin(winResult) {
    state.isGameActive = false; // Bloquea cualquier interacción lógica futura
    state.scores[winResult.winner]++;
    
    // Destacar celdas ganadoras en la UI
    winResult.combo.forEach(idx => {
      cells[idx].classList.add('cell--winner');
    });
  }

  function handleTie() {
    state.isGameActive = false; // Bloquea interacciones tras empate
    state.scores.ties++;
  }

  /**
   * CASO LÍMITE 3: Reinicio completo y limpio del estado e interfaz
   */
  function resetGame() {
    // 1. Limpiar estado en memoria
    state.board = Array(9).fill(null);
    state.currentPlayer = 'X';
    state.isGameActive = true;

    // 2. Limpiar la interfaz (DOM)
    cells.forEach(cell => {
      cell.textContent = '';
      cell.removeAttribute('data-mark');
      cell.disabled = false;
      cell.classList.remove('cell--winner');
    });

    boardElement.classList.remove('board--disabled');

    // 3. Re-renderizar indicadores de interfaz
    render();
  }

  /**
   * RENDERIZADO GENERAL DE LA UI (Sincroniza UI con el Estado)
   */
  function render() {
    // Render de celdas
    state.board.forEach((mark, idx) => {
      const cell = cells[idx];
      if (mark) {
        cell.textContent = mark;
        cell.setAttribute('data-mark', mark);
        cell.disabled = true; // Deshabilita accesibilidad nativa
      }
    });

    // Deshabilitar tablero completo mediante CSS Pointer Events si la partida terminó
    if (!state.isGameActive) {
      boardElement.classList.add('board--disabled');
    }

    // Actualizar marcadores de puntos
    scoreXEl.textContent = state.scores.X;
    scoreOEl.textContent = state.scores.O;
    scoreTiesEl.textContent = state.scores.ties;

    // Actualizar texto del turno / victoria
    if (!state.isGameActive) {
      const winResult = checkWin();
      if (winResult) {
        statusLabel.textContent = 'Ganador:';
        statusBadge.textContent = winResult.winner;
        statusBadge.className = `turn-indicator__badge turn-indicator__badge--${winResult.winner.toLowerCase()}`;
      } else {
        statusLabel.textContent = '¡Empate!';
        statusBadge.textContent = '—';
        statusBadge.className = 'turn-indicator__badge';
      }
    } else {
      statusLabel.textContent = 'Turno actual:';
      statusBadge.textContent = state.currentPlayer;
      statusBadge.className = `turn-indicator__badge turn-indicator__badge--${state.currentPlayer.toLowerCase()}`;
    }
  }

  // Inicializar la aplicación
  initGame();
});