import State from "../classes/State";
import trialsData from "../../config/trial_config.json";
import configParams from "../../config/parameters_config";
import { TimelineMax, Power2} from "gsap";
import {Howl} from "howler";

const state_results = new State();

state_results.create = function(){
  this.assetsURL = configParams["assets_dir"];
  const isCorrectImage = (this.game.chosenStimulus.isTarget == 1);
  const isCorrectCategory = (this.game.chosenCategory == this.game.chosenStimulus.category);
  //this.game.debugLbl.innerText = "results";
  if (isCorrectImage && isCorrectCategory) {
    this.game.isTrialSuccess = true;
    this.onSuccess();
  } else {
    this.game.isTrialSuccess = false;
    this.onFail();
  }
  this.game.logger.onTrialEnd();
  this.game.logger.saveSessionData();
  this.game.curTrialInd++;
  
}

state_results.onSuccess = function(){
  this.resultImg = this.game.addImage(window.innerWidth/2, window.innerHeight/2, "check");
  this.animResult();
  if(configParams["play_audio_positive_feedback"]){
    var sound = new Howl({
      src: [this.assetsURL + '/audio/success.mp3', this.assetsURL + '/audio/success.ogg'],
      volume: 0.09
    });
    sound.play();
  }
};

state_results.onFail = function(){
  this.resultImg = this.game.addImage(window.innerWidth/2, window.innerHeight/2, "cross");
  this.animResult();
  
  if(configParams["play_audio_negative_feedback"]){
    var sound = new Howl({
      src: [this.assetsURL + '/audio/wrong_soft.mp3', this.assetsURL + '/audio/wrong_soft.ogg']
    });
    sound.play();
  }
};

state_results.animResult = function(){
  
  const tl = new TimelineMax()
  if(!configParams["no_animation_at_all"] && configParams["do_animate_feedback"]){
    
    tl.from(this.resultImg, configParams["duration_of_feedback"] / 1000, {
      css: {
        opacity: 0, 
        top: window.innerHeight/2 + 50
      },
      ease: Power2.easeOut 
    })
    .to(this.resultImg, 0.01, {
      css: {
        opacity: 0
      },
      ease: Power2.easeOut 
    }, `+=${configParams["delay_after_feedback"] / 1000}`);
  } else {
    tl.set({}, {}, `+=${configParams["duration_of_feedback"] / 1000}`);
    tl.set({}, {}, `+=${configParams["delay_after_feedback"] / 1000}`);
  }
  tl.add(this.proceed.bind(this), `+=${configParams["delay_before_next_trial"] / 1000}`);
};

state_results.proceed = function(){
  let trialsCount;
  const conf_trialsCount = configParams["number_of_trials"];
  if(conf_trialsCount && parseInt(conf_trialsCount)){
    trialsCount = Math.min(conf_trialsCount, trialsData.length);
  } else {
    trialsCount = trialsData.length;
  }
  if(this.game.curTrialInd >= trialsCount){
    this.game.setState("finish");
  } else {
    this.game.setState("loading");
  } 
};

state_results.terminate = function(){
  State.prototype.terminate.call(this);
  this.resultImg.remove();
}

export default state_results;