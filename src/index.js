import Game from "./classes/Game";

const gameDiv = document.getElementById("gameDiv");
window.game = new Game(gameDiv);
window.addEventListener('resize', () => window.game.resizeHandle());