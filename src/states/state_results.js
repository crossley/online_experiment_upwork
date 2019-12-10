import State from "../classes/State";
import trialsData from "../../config/trial_config.json";
import configParams from "../../config/parameters_config";
import { TimelineMax, Power2} from "gsap";
import {Howl} from "howler";

const state_results = new State();

state_results.create = function(){
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
  this.game.curTrialInd++;
  
  console.log(JSON.stringify(this.game.logger.sessionData).length);
}

state_results.onSuccess = function(){
  this.resultImg = this.game.addImage(window.innerWidth/2, window.innerHeight/2, "check");
  this.animResult();
  if(configParams["play_audio_positive_feedback"]){
    var sound = new Howl({
      src: ['../audio/success.mp3', '../audio/success.ogg']
    });
    sound.play();
  }
};

state_results.onFail = function(){
  this.resultImg = this.game.addImage(window.innerWidth/2, window.innerHeight/2, "cross");
  this.animResult();
  
  if(configParams["play_audio_negative_feedback"]){
    var sound = new Howl({
      src: ['../audio/wrong.mp3', '../audio/wrong.ogg']
    });
    sound.play();
  }
};

state_results.animResult = function(){
  const tl = new TimelineMax()
    .from(this.resultImg, 0.3, {
      css: {
        opacity: 0, 
        top: window.innerHeight/2 + 50
      },
      ease: Power2.easeOut 
    });

    tl.add(this.proceed.bind(this), `+=${configParams["delay_after_feedback"] / 1000}`);
};

state_results.proceed = function(){
  if(this.game.curTrialInd >= trialsData.length){
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