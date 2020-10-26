import State from "../classes/State";
import trialsData from "../../config/trial_config.json";
import configParams from "../../config/parameters_config.json";

const state_loading = new State();

state_loading.create = function(){

  this.game.loader.clearLoadingQueue();
  this.trialData = trialsData[this.game.curTrialInd];
  for(var i = 0; i<this.trialData["stim_id"].length; i++){
    const stim_id = this.trialData["stim_id"][i];
    if(!this.game.loader.cache[stim_id.toString()]){
      this.game.loader.addImage(stim_id.toString(), `/img/${stim_id.toString()}.png`, configParams["assets_dir"]);
    }
  }

  this.game.loader.onFinish = this.onLoadFinish;
  this.game.loader.start();
};

state_loading.update = function(){
};

state_loading.onLoadFinish = function(){
  // this.game.setState("fixation");
  this.game.setState("trial");
};

export default state_loading;
