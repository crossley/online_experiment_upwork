import State from "../classes/State";
import trialsData from "../../config/trial_config.json";

const state_trial = new State();

state_trial.create = function(){

  
  this.trialData = trialsData[this.game.curTrialInd];
  this.stimuli = [];
  for(var i = 0; i<this.trialData["stim_id"].length; i++){
    const stim_id = this.trialData["stim_id"][i];
    const isTarget = this.trialData["target"][i];
    const category = this.trialData["cat"][i];
    const position = this.trialData["position"][i];
    console.log(stim_id, position);
    
    const stimulus = this.game.addImage(window.innerWidth/2 - position[0] * window.innerWidth/2, 
      window.innerHeight/2 - position[1] * window.innerHeight/2, stim_id.toString());
    stimulus.isTarget = isTarget;
    stimulus.addEventListener('click', this.onStimulus);
    stimulus.game = this.game;
    this.objs.push(stimulus);
  }
  this.game.debugLbl.innerText = "Trial began - " + this.game.curTrialInd;

};

state_trial.onStimulus = function(){
  console.log("mouse click - " + this.isTarget);
  if(this.isTarget){
    this.game.setState("results");
  }
};

state_trial.terminate = function(){
  State.prototype.terminate.call(this);
};

export default state_trial;