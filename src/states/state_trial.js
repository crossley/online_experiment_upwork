import State from "../classes/State";
import trialsData from "../../config/trial_config.json";
import configParams from "../../config/parameters_config";
import {TweenLite, TimelineLite, Power2} from "gsap";

const state_trial = new State();

state_trial.create = function(){

  this.game.logger.onTrialBegin();
  this.curPhase = "pick";
  this.trialData = trialsData[this.game.curTrialInd];
  this.stimuli = [];
  for(var i = 0; i<this.trialData["stim_id"].length; i++){
    const stim_id = this.trialData["stim_id"][i];
    const isTarget = this.trialData["target"][i];
    const category = this.trialData["cat"];
    const position = this.trialData["position"][i];
    
    const stimulus = this.game.addImage(window.innerWidth/2 + position[0] * window.innerWidth/2, 
      window.innerHeight/2 + position[1] * window.innerHeight/2, stim_id.toString());
    stimulus.category = category;
    stimulus.isTarget = isTarget;
    stimulus.addEventListener('click', this.onStimulus);
    stimulus.game = this.game;
    stimulus.position = position;
    stimulus.id = stim_id;
    this.objs.push(stimulus);
    this.stimuli.push(stimulus);
  }
  // this.game.debugLbl.innerText = "Trial began - " + this.game.curTrialInd;

  this.lblInstruct = this.game.addLabel(window.innerWidth/2, window.innerHeight + 50, "Choose the category", 24);
  this.lblInstruct.className = "instructionsLbl";
  this.lblInstruct.style.left = (window.innerWidth/2 - this.lblInstruct.offsetWidth / 2).toString() + "px";

  document.addEventListener("keypress", this.onKeyPress.bind(this));
  this.reposition();

};

state_trial.reposition = function(){
  if(this.curPhase == "pick") {
      
    for(let i = 0; i<this.stimuli.length; i++){
      const stim = this.stimuli[i];
      stim.style.left = (window.innerWidth/2 + stim.position[0] * Math.min(window.innerWidth/2,window.innerHeight/2)  - parseInt(stim.style.width) / 2).toString() + "px";
      stim.style.top = (window.innerHeight/2 + stim.position[1] * Math.min(window.innerWidth/2,window.innerHeight/2)  - parseInt(stim.style.height) / 2).toString() + "px";
    }
  } else if(this.curPhaser == "cat") {
    this.game.chosenStimulus.style.left = (window.innerWidth/2 - parseInt(stim.style.width) /2).toString() + "px";
    this.game.chosenStimulus.style.top = "100px";
    this.lblInstruct.style.left = (window.innerWidth/2 - this.lblInstruct.offsetWidth / 2).toString() + "px";
  }
};

state_trial.onStimulus = function(){
  if(state_trial.curPhase != "pick") return;
  state_trial.curPhase = "trans";
  this.game.chosenStimulus = this;
  this.style.border = "1px solid orange";
  TweenLite.to(this, 0.1, {css: {"border-width": "5px"}, repeat: 2, ease: Power2.easeInOut, yoyo: 1, onComplete: () => {
    state_trial.showCategorize();
  }});
  if(configParams["clear_other_stimuli"]){
    state_trial.elemenateOtherStimuli();
  }
};

state_trial.onKeyPress = function(e){
  const acceptedKeys = configParams["action_keys"];
  const pressedKey = e.key;
  console.log(this.curPhase);
  if(this.curPhase == "cat"){
    if(pressedKey == acceptedKeys[0] || pressedKey == acceptedKeys[1]) {
      this.game.chosenCategory = acceptedKeys.indexOf(pressedKey) + 1;
      this.curPhase = "end";
      window.setTimeout(this.finishTrial.bind(this), configParams["delay_before_feedback"]);
    }
  }
};

state_trial.finishTrial = function(){
  this.game.setState("results");
};

state_trial.showCategorize = function(){
  
  const stim = this.game.chosenStimulus;
  stim.style.border = "5px solid orange";

  this.btnAction1 = this.game.addImage(window.innerWidth / 8, 3 * window.innerHeight / 4 + 100, "keyboardBtn");
  this.btnAction1.style.opacity = "0";
  this.btnAction1.lbl = document.createElement("p");
  this.btnAction1.appendChild(this.btnAction1.lbl);
  this.btnAction1.lbl.innerText = configParams["action_keys"][0].toUpperCase();
  this.btnAction1.lbl.style.fontSize = "45px";
  this.btnAction1.lbl.style.fontWeight = "bold";
  this.btnAction1.lbl.style.position = "absolute";
  this.btnAction1.lbl.style.left = "47px";
  this.btnAction1.lbl.style.top =  "-25px";

  this.btnAction1.dscLbl = document.createElement("p");
  this.btnAction1.appendChild(this.btnAction1.dscLbl);
  this.btnAction1.dscLbl.className = "lblCat";
  this.btnAction1.dscLbl.innerText = "Category (1)";
  this.btnAction1.dscLbl.style.textAlign = "center";  
  this.btnAction1.dscLbl.style.fontSize = "35px";
  this.btnAction1.dscLbl.style.fontWeight = "bold";
  this.btnAction1.dscLbl.style.position = "absolute";
  this.btnAction1.dscLbl.style.left = "-20px";
  this.btnAction1.dscLbl.style.top =  "-150px";

  this.btnAction2 = this.game.addImage(7 * window.innerWidth / 8, 3 * window.innerHeight / 4 + 100, "keyboardBtn");
  this.btnAction2.style.opacity = "0";
  this.btnAction2.lbl = document.createElement("p");
  this.btnAction2.appendChild(this.btnAction2.lbl);
  this.btnAction2.lbl.innerText = configParams["action_keys"][1].toUpperCase();
  this.btnAction2.lbl.style.fontSize = "45px";
  this.btnAction2.lbl.style.fontWeight = "bold";
  this.btnAction2.lbl.style.position = "absolute";
  this.btnAction2.lbl.style.left = "47px";
  this.btnAction2.lbl.style.top =  "-25px";

  
  this.btnAction2.dscLbl = document.createElement("p");
  this.btnAction2.appendChild(this.btnAction2.dscLbl);
  this.btnAction2.dscLbl.innerText = "Category (2)";
  this.btnAction2.dscLbl.style.textAlign = "center";  
  this.btnAction2.dscLbl.className = "lblCat";
  this.btnAction2.dscLbl.style.fontSize = "35px";
  this.btnAction2.dscLbl.style.fontWeight = "bold";
  this.btnAction2.dscLbl.style.position = "absolute";
  this.btnAction2.dscLbl.style.left = "-5px";
  this.btnAction2.dscLbl.style.top =  "-150px";

  const tl = new TimelineLite();
  
  if(configParams["move_stimulus_to_middle"]){
    tl.to(stim, 0.5, {css: {
      left: window.innerWidth/2 - parseInt(stim.style.width) /2,
      top: 100
    }});
  }
  tl.to(this.lblInstruct, 0.4, {
      css: {
        top: (window.innerHeight - 120).toString() + "px"
      }, 
      ease: Power2.easeOut
    })
    .to([this.btnAction1, this.btnAction2], 0.4, {
      css: {
        top: 3 * window.innerHeight / 4 - 50,
        opacity: 1
      }, 
      ease: Power2.easeOut
    })
    .set(this, {curPhase: "cat"});
};

state_trial.elemenateOtherStimuli = function(){
  for(let i = 0; i<this.stimuli.length; i++){
    const stim = this.stimuli[i];
    if (this.game.chosenStimulus == stim) continue;

    let nearestEdgeVer, nearestEdgeHor;
    if(stim.position[0] > 0){
      nearestEdgeHor = window.innerWidth + 200;
    } else {
      nearestEdgeHor = -200;
    }

    if(stim.position[1] > 0){
      nearestEdgeVer = window.innerHeight + 200;
    } else {
      nearestEdgeVer = -200;
    }

    TweenLite.to(stim, 0.7, {css: {left: nearestEdgeHor, top: nearestEdgeVer, opacity: 0}, ease: Power2.easeOut});
  }
};

state_trial.terminate = function(){
  State.prototype.terminate.call(this);
  this.lblInstruct.remove();
  this.btnAction1.remove();
  this.btnAction2.remove();
};

export default state_trial;