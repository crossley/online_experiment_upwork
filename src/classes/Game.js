import StateMachine from "./StateMachine";
import state_loading from "../states/state_loading";
import state_fixation from "../states/state_fixation";
import state_trial from "../states/state_trial";
import state_results from "../states/state_results";
import state_finish from "../states/state_finish";
import Loader from "./Loader";

export default class Game {
  constructor(div){
    this.stateMachine = new StateMachine(this);
    this.loader = new Loader(this);
    this.stage = div || document.documentElement;
    this.stage.objs = [];

    this.states = {
      "loading": state_loading,
      "fixation": state_fixation,
      "trial": state_trial,
      "results": state_results,
      "finish": state_finish
    };
    for(let state in this.states){
      this.states[state].game = this;
    }

    this.curStateKey = null;
    this.curState = null;

    this.mouseX = undefined;
    this.mouseY = undefined;
    this.stage.addEventListener('mouseenter', this.onMouseMove.bind(this));
    this.stage.addEventListener('mousemove', this.onMouseMove.bind(this));

    this.lastTime = Date.now();
    this.deltaTime = 0;
    this.resizeHandle();

    this.init();
    window.requestAnimationFrame(() => this.tick());
  }

  init(){
    this.curTrialInd = 0;

    this.debugLbl = this.addLabel(window.innerWidth/2, 50, "loading");
    
    this.loader.addImage("arrow", "../img/arrow.png");
    this.loader.start();
    this.loader.onFinish = this.onLoadFinish;
  }

  onLoadFinish(){
    window.game.setState("loading");
  }

  onMouseMove(e){
    console.log("mouse move");
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  tick(){
    const timeNow = Date.now();
    this.deltaTime = timeNow - this.lastTime;
    this.lastTime = timeNow;

    if(this.curState && this.curState.update){
      this.curState.update();
    }

    window.requestAnimationFrame(() => this.tick());
  }

  resizeHandle(){
    this.stage.style.width = window.innerWidth.toString() + "px";
    this.stage.style.height = window.innerHeight.toString() + "px";
    if(this.curState && this.curState.reposition){
      this.curState.reposition();
    }
  }

  setState(newStateKey){
    if(!newStateKey || !this.states[newStateKey]){
      return console.warn("cannot set state - " + newStateKey);
    }

    const newState = this.states[newStateKey];
    const prevStateKey = this.curStateKey;
    let prevState;
    if(prevStateKey !== null){
      prevState = this.states[prevStateKey];
    } else {
      prevState = null;
    }

    if(prevState) {
      // transitioning from current state 
      if(this.stateMachine.transitions[prevStateKey] && 
        this.stateMachine.transitions[prevStateKey][newStateKey]){
        // if a special transition function is defined, we use that
        this.stateMachine.transitions[prevStateKey][newStateKey].call(this);
      } else {
        prevState.terminate()
        newState.init();
      }
    } else {
      newState.init();
    }
    this.curStateKey = newStateKey;
    this.curState = this.states[this.curStateKey];
  }

  addImage(x, y, key){
    let img;
    img = document.createElement("div");
    img.key = key;
    img.style.backgroundImage = `url("${this.loader.cache[key].src}")`;
    img.style.width = this.loader.cache[key].width.toString() + "px";
    img.style.height = this.loader.cache[key].height.toString() + "px";
    img.style.position = "absolute";
    img.style.left = (x - parseInt(img.style.width) / 2).toString() + "px";
    img.style.top = (y -  parseInt(img.style.height) / 2).toString() + "px";
    this.stage.appendChild(img);

    return img;
  }

  addLabel(x = 0, y = 0, text = "", fontSize = 18){
    const lbl = document.createElement('p');
    lbl.innerText = text;
    lbl.style.position = "absolute";
    lbl.style.left = x.toString() + "px";
    lbl.style.top = y.toString() + "px";
    lbl.style.fontSize = fontSize.toString() + "px";
    this.stage.appendChild(lbl);

    return lbl;
  }
};
