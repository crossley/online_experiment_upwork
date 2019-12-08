import State from "../classes/State";
import trialsData from "../../config/trial_config.json";

const state_trial = new State();

state_trial.create = function(){

  
  this.boundOnClick = this.onClick.bind(this);
  this.clickListener = this.game.stage.addEventListener('click', this.boundOnClick);
  this.trialData = trialsData[this.game.curTrialInd];
  this.stimuli = [];
  for(var i = 0; i<this.trialData["stim_id"].length; i++){
    const stim_id = this.trialData["stim_id"][i];
    const isTarget = this.trialData["target"][i];
    const category = this.trialData["cat"][i];
    const position = this.trialData["position"][i];
    
    const stimulus = this.game.addImage(window.innerWidth/2 - position[0] * window.innerWidth/2, 
      window.innerHeight/2 - position[1] * window.innerHeight/2, stim_id.toString());
    this.objs.push(stimulus);
  }
  this.game.debugLbl.innerText = "Trial began - " + this.game.curTrialInd;

};

state_trial.onClick = function(){
  console.log("mouse click");
  this.game.setState("results");
};

state_trial.terminate = function(){
  State.prototype.terminate.call(this);
  this.game.stage.removeEventListener('click', this.boundOnClick);
};

export default state_trial;