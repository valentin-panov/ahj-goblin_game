/* eslint-disable no-constant-condition */
import Goblin from '../template/goblin';
import Board from '../template/board';
import fadeOut from './fadeOut';

export default class GamePlay {
  constructor() {
    this.goblin = new Goblin().element;
    this.board = new Board();
    this.whacked = document.getElementById('whacked');
    this.lost = document.getElementById('lost');
    this.whackedCount = 0;
    this.missCount = 0;
    this.timerId = null;
  }

  init() {
    this.missCount = 0;
    this.addGoblinListener();
    this.addNewGameListener();
    this.startGame();
  }

  static getHole(index) {
    return document.getElementById(`hole${index}`);
  }

  addNewGameListener() {
    document.querySelector('.btn').addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.reset();
      },
      false
    );
  }

  moveGoblin(index) {
    GamePlay.getHole(index).append(this.goblin);
    this.missCount += 1;
    if (this.missCount > 5) {
      this.endGame();
    }
    this.lost.textContent = this.missCount;
  }

  addGoblinListener() {
    this.goblin.addEventListener('click', (event) => {
      this.whackGoblin(event.target.closest('.hole'));
    });
  }

  whackGoblin(point) {
    this.goblin.remove();
    point.classList.add('bloody');
    this.whackedCount += 1;
    this.missCount = 0 ? (this.missCount = 0) : (this.missCount -= 1);
    this.whacked.textContent = this.whackedCount;
  }

  startGame() {
    this.missCount = -1;
    this.timerId = setInterval(() => {
      let newHole = this.board.activeHole;
      while (newHole === this.board.activeHole) {
        newHole = Math.floor(Math.random() * this.board.holeArray.length);
      }
      this.board.activeHole = newHole;

      this.moveGoblin(this.board.activeHole);
    }, 1000);
  }

  async endGame() {
    this.missCount = 5;
    this.lost.textContent = this.missCount;
    this.goblin.remove();
    const target = document.querySelector('.alert-box');
    target.classList.remove('visually-hidden');
    await fadeOut(target).then(() => {
      target.style.opacity = 1;
      target.classList.add('visually-hidden');
    });

    clearInterval(this.timerId);
    document.querySelector('.btn').classList.remove('visually-hidden');
  }

  reset() {
    this.whackedCount = 0;
    this.missCount = 0;
    this.whacked.textContent = this.whackedCount;
    this.lost.textContent = this.missCount;
    document.querySelector('.btn').classList.add('visually-hidden');
    document.querySelector('.alert-box').classList.add('visually-hidden');
    document.querySelectorAll('.hole').forEach((element) => element.classList.remove('bloody'));
    this.startGame();
  }
}
