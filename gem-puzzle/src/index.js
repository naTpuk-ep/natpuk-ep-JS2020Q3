import "./modules/images";
import "./styles/main.scss";
import GemPuzzle from "./modules/Gem"

window.addEventListener('load', () => {
	new GemPuzzle(4);
})

