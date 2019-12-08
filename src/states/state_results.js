import State from "../classes/State";
import trialsData from "../../config/trial_config.json";

const state_results = new State();

state_results.create = function(){
  this.game.curTrialInd++;
  if(this.game.curTrialInd >= trialsData.length){
    this.game.setState("finish");
  } else {
    this.game.setState("loading");
  }
}

export default state_results;