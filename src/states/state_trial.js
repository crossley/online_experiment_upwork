import State from "../classes/State";

const state_trial = new State();

state_trial.create = function(){
  this.game.debugLbl.innerText = "Trial began";
};

export default state_trial;