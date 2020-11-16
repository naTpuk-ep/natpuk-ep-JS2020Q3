import "./modules/imagesImports";
import "./assets/favicon.ico";
import "./styles/main.scss";
import Layout from "./modules/Layout";
import "./assets/sound.mp3";

window.addEventListener("load", () => {
	new Layout();
});



// import "./autoCloser"; // autoclose when dev-server is stoped