import State from "../classes/State";
import trialsData from "../../config/trial_config.json";
import configParams from "../../config/parameters_config";
import texts from "../../config/texts";
import {TweenLite, TimelineMax, Power2} from "gsap";

const state_trial = new State();

state_trial.create = function(){

  console.log(this.game.curTrialInd);
  this.game.logger.onTrialBegin();
  this.trialData = trialsData[this.game.curTrialInd];

  this.buildTrial();

  const lblInstructTw = TweenLite.to(this.lblInstruct, 0.4, {
    css: {
      top: this.instructOnTop? 0 : (window.innerHeight - 140).toString() + "px"
    }, 
    ease: Power2.easeOut
  });
  if(configParams["no_animation_at_all"] || !configParams["do_animate_trial_instruction"]){
    lblInstructTw.totalTime(lblInstructTw.totalDuration());
  }
  this.boundKeyPress =  this.onKeyPress.bind(this);
  document.addEventListener("keypress", this.boundKeyPress);
  this.reposition();

};

state_trial.buildTrial = function(){

  this.curPhase = "pick";
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
    if(isTarget){
      this.targetStimulus = stimulus;
    }
    stimulus.addEventListener('click', this.onStimulus);
    stimulus.game = this.game;
    stimulus.position = position;
    stimulus.id = stim_id;
    this.objs.push(stimulus);
    this.stimuli.push(stimulus);
  }
  // this.game.debugLbl.innerText = "Trial began - " + this.game.curTrialInd;

  this.instructOnTop = configParams["instruction_banner_position"].toLowerCase().indexOf("top") !== -1;
  this.lblInstruct = this.game.addLabel(window.innerWidth/2, this.instructOnTop? -200 : window.innerHeight + 50, texts["trial_first_instruction"], 24);
  this.lblInstruct.className = "instructionsLbl";
  this.lblInstruct.style.width = "300px";

  
  this.btnAction1 = this.game.addImage(0,  this.instructOnTop? 0 : window.innerHeight, "keyboardBtn");
  this.btnAction1.style.opacity = "0";
  this.btnAction1.style.transform = "scale(0.6)";
  this.btnAction1.lbl = document.createElement("p");
  this.btnAction1.appendChild(this.btnAction1.lbl);
  this.btnAction1.lbl.innerText = configParams["action_keys"][0].toUpperCase();
  this.btnAction1.lbl.style.fontSize = "45px";
  this.btnAction1.lbl.style.fontWeight = "bold";
  this.btnAction1.lbl.style.position = "absolute";
  this.btnAction1.lbl.style.left = "41px";
  this.btnAction1.lbl.style.top =  "-30px";

  this.btnAction1.dscLbl = document.createElement("p");
  this.btnAction1.appendChild(this.btnAction1.dscLbl);
  this.btnAction1.dscLbl.className = "lblCat";
  this.btnAction1.dscLbl.innerText = texts["first_category"];
  this.btnAction1.dscLbl.style.textAlign = "center";  
  this.btnAction1.dscLbl.style.fontSize = "35px";
  this.btnAction1.dscLbl.style.fontWeight = "bold";
  this.btnAction1.dscLbl.style.position = "absolute";
  this.btnAction1.dscLbl.style.left = "-20px";
  this.btnAction1.dscLbl.style.top =  "-150px";

  this.btnAction2 = this.game.addImage(0, this.instructOnTop? 0 : window.innerHeight, "keyboardBtn");
  this.btnAction2.style.opacity = "0";
  this.btnAction2.style.transform = "scale(0.6)";
  this.btnAction2.lbl = document.createElement("p");
  this.btnAction2.appendChild(this.btnAction2.lbl);
  this.btnAction2.lbl.innerText = configParams["action_keys"][1].toUpperCase();
  this.btnAction2.lbl.style.fontSize = "45px";
  this.btnAction2.lbl.style.fontWeight = "bold";
  this.btnAction2.lbl.style.position = "absolute";
  this.btnAction2.lbl.style.left = "41px";
  this.btnAction2.lbl.style.top =  "-30px";

  
  this.btnAction2.dscLbl = document.createElement("p");
  this.btnAction2.appendChild(this.btnAction2.dscLbl);
  this.btnAction2.dscLbl.innerText = texts["second_category"];
  this.btnAction2.dscLbl.style.textAlign = "center";  
  this.btnAction2.dscLbl.className = "lblCat";
  this.btnAction2.dscLbl.style.fontSize = "35px";
  this.btnAction2.dscLbl.style.fontWeight = "bold";
  this.btnAction2.dscLbl.style.position = "absolute";
  this.btnAction2.dscLbl.style.left = "-5px";
  this.btnAction2.dscLbl.style.top =  "-150px";


};

state_trial.reposition = function(){
  if(this.curPhase == "pick") {
      
    let fullW, fullH;
    if(configParams["is_stimuli_space_circular"]){
      fullW = fullH = Math.min(window.innerWidth, window.innerHeight);
    } else {
      fullW = window.innerWidth;
      fullH = window.innerHeight;
    }
    
    for(let i = 0; i<this.stimuli.length; i++){
      const stim = this.stimuli[i];
      if(configParams["should_stimuli_not_exceed_screen"]){
        const halfWidth = parseInt(stim.style.width) / 2;
        const halfHeight = parseInt(stim.style.height) / 2;
        const transX = (stim.position[0] + 1 ) / 2;
        const transY = (stim.position[1] + 1) / 2;
        const posX = (window.innerWidth - fullW)/2 + (1 - transX) * halfWidth + transX * fullW - transX * halfWidth;
        const posY =  (1 - transY) * halfHeight + transY * fullH - transY * halfHeight;
        stim.style.left = (posX - parseInt(stim.style.width) / 2).toString() + "px";
        stim.style.top = (posY - parseInt(stim.style.height) / 2).toString() + "px";
      } else {
        stim.style.left = (window.innerWidth/2 + stim.position[0] * fullW/2 - parseInt(stim.style.width) / 2).toString() + "px";
        stim.style.top = (window.innerHeight/2 + stim.position[1] * fullH/2 - parseInt(stim.style.height) / 2).toString() + "px";
      }
    }
  } 
  if(configParams["instruction_banner_position"].toLowerCase().indexOf("left") !== -1){
    this.lblInstruct.style.left = (20).toString() + "px";
    if(this.curPhase != "pick"){
      this.btnAction1.style.left = (40).toString() + "px";
      this.btnAction2.style.left = (150).toString() + "px";
    }
  }else if (configParams["instruction_banner_position"].toLowerCase().indexOf("right") !== -1){
    this.lblInstruct.style.left = (window.innerWidth - this.lblInstruct.offsetWidth - 20).toString() + "px";
    if(this.curPhase != "pick"){
      this.btnAction1.style.left = (window.innerWidth - this.lblInstruct.offsetWidth - 20 + 50).toString() + "px";
      this.btnAction2.style.left = (window.innerWidth - this.lblInstruct.offsetWidth - 20 + 50 + 110).toString() + "px";
    }
  }

};

state_trial.onStimulus = function(){
  if(this.game.curState.curPhase != "pick") return;
  this.game.curState.curPhase = "trans";
  this.game.logger.onUserAction("click_on_stimulus", this.id);
  
  if(configParams["no_animation_at_all"] || !configParams["do_animate_cursor_disappear"]){
    this.game.cursor.style.opacity = "0";
  } else {
    TweenLite.to(this.game.cursor, 0.3, {css: {opacity: 0}, ease: Power2.easeOut});
  }
  this.game.chosenStimulus = this;
  this.style.outline = "1px solid orange";
  if(configParams["no_animation_at_all"] || !configParams["do_animate_stimulus_choice"]){
    this.style.outlineWidth = "5px";
    this.game.curState.showCategorize();
  } else {
    TweenLite.to(this, 0.1, {css: {"outline-width": "5px"}, repeat: 2, ease: Power2.easeInOut, yoyo: 1, onComplete: () => {
      this.game.curState.showCategorize();
    }});
  }
  if(configParams["clear_other_stimuli"]){
    this.game.curState.elemenateOtherStimuli();
  }
};

state_trial.onKeyPress = function(e){
  const acceptedKeys = configParams["action_keys"];
  const pressedKey = e.key;
  this.game.logger.onUserAction("key_press", e.key);
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
  stim.style.outline = "5px solid orange";


  const tl = new TimelineMax();
  
  if(configParams["move_stimulus_to_middle"]){
    tl.to(stim, configParams["do_animate_move_stimulus_to_middile"]? 0.5 : 0, {css: {
      left: window.innerWidth/2 - parseInt(stim.style.width) /2,
      top: 100
    }});
  }
  tl.to(this.lblInstruct, configParams["do_animate_trial_instruction"]? 0.4 : 0, {
    css: {
      top: this.instructOnTop? -200 : (window.innerHeight + 100).toString() + "px"
    }, 
    ease: Power2.easeOut
  });
  
  tl.set(this.lblInstruct, {innerText: texts["trial_second_instruction"], css: {width: "auto"}});
  
  tl.add(this.reposition.bind(this), "+=0");
  tl.to(this.lblInstruct, configParams["do_animate_trial_instruction"]? 0.4 : 0, {
      css: {
        top:  this.instructOnTop? 0 :(window.innerHeight - 100).toString() + "px"
      }, 
      ease: Power2.easeOut
    })
    .to([this.btnAction1, this.btnAction2], configParams["do_animate_trial_instruction"]? 0.4 : 0, {
      css: {
        top:  this.instructOnTop? 130 : window.innerHeight - 170,
        opacity: 1
      }, 
      ease: Power2.easeOut
    })
    .set(this, {curPhase: "cat"});

  if(configParams["no_animation_at_all"]){
    tl.totalProgress(1);
  }
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

    
    const stimClTw = TweenLite.to(stim, 0.7, {css: {left: nearestEdgeHor, top: nearestEdgeVer, opacity: 0}, ease: Power2.easeOut});
    if(configParams["no_animation_at_all"] || !configParams["do_animate_clear_stimuli"]){
      stimClTw.totalTime(stimClTw.totalDuration());
    }
  }
};

state_trial.terminate = function(){
  State.prototype.terminate.call(this);
  this.lblInstruct.remove();
  this.btnAction1.remove();
  this.btnAction2.remove();
  
  document.removeEventListener("keypress", this.boundKeyPress);
};

export default state_trial;