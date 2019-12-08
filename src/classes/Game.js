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

    this.mouseX = 0;
    this.mouseY = 0;
    this.stage.addEventListener('mousemove', this.onMouseMove.bind(this));

    this.lastTime = Date.now();
    this.deltaTime = 0;
    this.resizeHandle();
    window.requestAnimationFrame(() => this.tick());
  }

  onMouseMove(e){
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
    if(!this.stage.objs[key]){
      img = this.stage.appendChild(this.loader.cache[key]);
      this.stage.objs[key] = img;
    } else {
      img = this.stage.objs[key].cloneNode();
      this.stage.appendChild(img);
    }
    img.key = key;
    img.style.position = "absolute";
    img.style.left = x.toString() + "px";
    img.style.top = y.toString() + "px";
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
