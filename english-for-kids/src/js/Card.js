import cards from './cardsInfo';

export default class Card {
	constructor (catNumber) {
		this.img = cards[catNumber].image;
		this.word = cards[catNumber].word;
		this.tranlation = cards[catNumber].translation;
		this.audioSrc = cards[catNumber].audioSrc;
	}
}