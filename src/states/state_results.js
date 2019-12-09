import State from "../classes/State";
import trialsData from "../../config/trial_config.json";
import { TimelineMax, Power2} from "gsap";

const state_results = new State();

state_results.create = function(){
  const isCorrectImage = (this.game.chosenStimulus.isTarget == 1);
  const isCorrectCategory = (this.game.chosenCategory == this.game.chosenStimulus.category);
  this.game.debugLbl.innerText = "results";
  console.log(`trial results: Picked Image: ${this.game.chosenStimulus.id}, Chosen Category: ${this.game.chosenCategory}, isCorrectImage?: ${isCorrectImage}, isCorrectCategory?: ${isCorrectCategory}`);
  if (isCorrectImage && isCorrectCategory) {
    this.onSuccess();
  } else {
    this.onFail();
  }
  this.game.curTrialInd++;
}

state_results.onSuccess = function(){
  this.resultImg = this.game.addImage(window.innerWidth/2, window.innerHeight/2, "check");
  this.animResult();
};

state_results.onFail = function(){
  this.resultImg = this.game.addImage(window.innerWidth/2, window.innerHeight/2, "cross");
  this.animResult();
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

    tl.add(this.proceed.bind(this), "+=0.5");
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