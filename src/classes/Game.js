import StateMachine from "./StateMachine";
import state_loading from "../states/state_loading";
import state_fixation from "../states/state_fixation";
import state_trial from "../states/state_trial";
import state_results from "../states/state_results";
import state_finish from "../states/state_finish";
import configParams from "../../config/parameters_config";
import Loader from "./Loader";
import Logger from "./Logger";
import state_tutorial from "../states/state_tutorial";

export default class Game {
  constructor(div){

    this.stateMachine = new StateMachine(this);
    this.loader = new Loader(this);
    this.stage = div || document.documentElement;
    this.stage.style.backgroundColor = configParams["background_color"];
    this.stage.objs = [];
    this.logger = new Logger(this);

    this.cursor = document.createElement('div');
    this.cursor.style.borderRadius = "50%";
    this.cursor.style.position = "absolute";
    this.cursor.style.width = (configParams.mouse_size * 2).toString() + "px";
    this.cursor.style.height = (configParams.mouse_size * 2).toString() + "px";
    this.cursor.style.backgroundColor = configParams.mouse_color;
    this.cursor.style.cursor = "none";
    this.cursor.style.pointerEvents = "none";
    this.cursor.style.border = configParams["mouse_border"];
    this.stage.appendChild(this.cursor);

    this.states = {
      "loading": state_loading,
      "tutorial": state_tutorial,
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
    this.stage.addEventListener('click', this.onMouseClick.bind(this));

    this.lastTime = Date.now();
    this.deltaTime = 0;
    this.resizeHandle();

    this.init();
    window.requestAnimationFrame(() => this.tick());
  }

  init(){
    this.curTrialInd = 0;

    // this.debugLbl = this.addLabel(window.innerWidth/2, 50, "loading");

    this.loader.addImage("arrow", "/img/arrow.png", configParams["assets_dir"]);
    this.loader.addImage("check", "/img/check.png", configParams["assets_dir"]);
    this.loader.addImage("cross", "/img/cross.png", configParams["assets_dir"]);
    this.loader.addImage("keyboardBtn", "/img/keyboardBtn.png", configParams["assets_dir"]);
    this.loader.start();
    this.loader.onFinish = this.onLoadFinish;
  }

  onLoadFinish(){
    if(configParams["tutorial"]["no_tutorial"]) {
      window.game.setState("loading");
    } else {
      window.game.setState("tutorial");
    }
  }

  onMouseClick(e){
    this.logger.onUserAction("click", e.offsetX, e.offsetY);
  }

  onMouseMove(e){
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  tick(){
    if(this.mouseX && this.mouseY){
      this.cursor.style.left = this.mouseX.toString() - configParams.mouse_size + "px";
      this.cursor.style.top = this.mouseY.toString() - configParams.mouse_size + "px";
    }

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
    this.curStateKey = newStateKey;
    this.curState = this.states[this.curStateKey];

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
  }

  addImage(x, y, key, parent){
    let img;
    img = document.createElement("div");
    img.key = key;
    if(key){
      img.style.backgroundImage = `url("${this.loader.cache[key].src}")`;
      img.style.backgroundSize = "cover";
      img.style.width = this.loader.cache[key].width.toString() + "px";
      img.style.height = this.loader.cache[key].height.toString() + "px";
    }
    img.style.position = "absolute";

    img.style.left = (x - parseInt(img.style.width) / 2).toString() + "px";
    img.style.top = (y -  parseInt(img.style.height) / 2).toString() + "px";
    if(parent){
      parent.appendChild(img);
    } else {
      this.stage.insertBefore(img, this.cursor);
    }

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
