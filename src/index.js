import Game from "./classes/Game";

const gameDiv = document.getElementById("gameDiv");
window.game = new Game(gameDiv);
window.game.setState("loading");
window.addEventListener('resize', () => window.game.resizeHandle());