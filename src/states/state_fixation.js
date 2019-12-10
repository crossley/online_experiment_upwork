import State from "../classes/State";
import configParams from "../../config/parameters_config";
import {TweenLite, Power2, Back} from "gsap";

const state_fixation = new State();

state_fixation.create = function(){
  // this.game.debugLbl.innerText = "fixation";

  this.pointTolerance = configParams["fixation_point_guide_radius"];
  this.guideRadius = configParams["fixation_point_guide_radius"];
  this.guideDuration = configParams["fixation_point_duration"];
  this.curGuideRadius = this.guideRadius;

  this.circle = document.createElement("div");
  this.circle.style.position = "absolute";
  this.circle.style.width = (this.guideRadius * 2).toString() + "px";
  this.circle.style.height = (this.guideRadius * 2).toString() + "px";
  this.circle.className = "guideCircle";
  this.game.stage.appendChild(this.circle);
  
  this.dot = this.game.addImage(window.innerWidth/2, window.innerHeight/2 - 80, "arrow");
  this.objs.push(this.dot);
  TweenLite.to(this.dot, 0.4, {css: {top: (window.innerHeight/2 - this.dot.offsetHeight/2 - 65).toString() + "px"}, ease: Power2.easeInOut, repeat: -1, yoyo: true});

  this.lblInstruct = this.game.addLabel(window.innerWidth/2, window.innerHeight + 50, "Move your cursor to the middle of the screen", 24);
  this.lblInstruct.className = "instructionsLbl";
  TweenLite.to(this.lblInstruct, 0.4, {css: {top: (window.innerHeight - 120).toString() + "px"}, ease: Power2.easeOut});

  this.reposition();
};

state_fixation.reposition = function(){
  this.circle.style.left = (window.innerWidth/2 - this.circle.offsetWidth/2).toString() + "px";
  this.circle.style.top = (window.innerHeight/2 - this.circle.offsetHeight/2).toString() + "px";

  this.dot.style.left = (window.innerWidth/2 - this.dot.offsetWidth/2).toString() + "px";
  this.dot.style.top = (window.innerHeight/2 - this.dot.offsetHeight/2 - 80).toString() + "px";
  
  this.lblInstruct.style.left = (window.innerWidth/2 - this.lblInstruct.offsetWidth / 2).toString() + "px";
};

state_fixation.update = function(){
  const mouseX = this.game.mouseX / window.innerWidth;
  const mouseY = this.game.mouseY / window.innerHeight;
  const radTolX = this.pointTolerance / window.innerWidth;
  const radTolY = this.pointTolerance / window.innerHeight;

  if(Math.abs(mouseX - configParams["fixation_point_position"][0]) < radTolX
  && Math.abs(mouseY - configParams["fixation_point_position"][1])  < radTolY){

    if(this.circResetTw) {
      this.circResetTw.pause();
      this.circResetTw.kill();
    }
    if(this.curGuideRadius > 0){
      this.curGuideRadius -= this.game.deltaTime / this.guideDuration * this.guideRadius;
      if(this.curGuideRadius < 0)this.curGuideRadius = 0;
    } else { 
      this.game.setState("trial");
    }
    let circX = (window.innerWidth/2 - this.circle.offsetWidth/2) * ((this.curGuideRadius / this.guideRadius)) +  (this.game.mouseX - this.curGuideRadius) * (1 - this.curGuideRadius / this.guideRadius);
    let circY = (window.innerHeight/2 - this.circle.offsetHeight/2) * ((this.curGuideRadius / this.guideRadius)) +  (this.game.mouseY - this.curGuideRadius) * (1 - this.curGuideRadius / this.guideRadius);

  } else {
    this.circResetTw = TweenLite.to(this, 0.3, {curGuideRadius: this.guideRadius, ease: Power2.easeOut});
  }
  
  this.circle.style.width = (this.curGuideRadius * 2).toString() + "px";
  this.circle.style.height = (this.curGuideRadius * 2).toString() + "px";
  this.circle.style.left = (window.innerWidth/2 - this.curGuideRadius - 2).toString() + "px";
  this.circle.style.top = (window.innerHeight/2 - this.curGuideRadius - 15).toString() + "px";
};

state_fixation.terminate = function(){
  this.circle.remove();
  this.dot.remove();
  this.lblInstruct.remove();
};

export default state_fixation;