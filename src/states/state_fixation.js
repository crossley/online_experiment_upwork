import State from "../classes/State";
import configParams from "../../config/parameters_config";

const state_fixation = new State();

state_fixation.create = function(){
  this.game.debugLbl.innerText = "Move mouse to center point";

  this.pointTolerance = configParams["fixation_point_tolerance"];
  this.guideRadius = configParams["fixation_point_guide_radius"];
  this.guideDuration = configParams["fixation_point_duration"];

  this.circle = document.createElement("div");
  this.circle.style.position = "absolute";
  this.circle.style.width = (this.guideRadius * 2).toString() + "px";
  this.circle.style.height = (this.guideRadius * 2).toString() + "px";
  this.circle.className = "guideCircle";

  this.game.stage.appendChild(this.circle);

  this.reposition();
};

state_fixation.reposition = function(){
  this.circle.style.left = (window.innerWidth/2 - this.circle.offsetWidth/2).toString() + "px";
  this.circle.style.top = (window.innerHeight/2 - this.circle.offsetHeight/2).toString() + "px";

  this.game.debugLbl.style.left = (window.innerWidth/2 - this.game.debugLbl.offsetWidth / 2).toString() + "px";
};

state_fixation.update = function(){
  const mouseX = this.game.mouseX / window.innerWidth;
  const mouseY = this.game.mouseY / window.innerHeight;
  const radTolX = this.pointTolerance / window.innerWidth;
  const radTolY = this.pointTolerance / window.innerHeight;

  if(Math.abs(mouseX - configParams["fixation_point_position"][0]) < radTolX
  && Math.abs(mouseY - configParams["fixation_point_position"][1])  < radTolY){
    if(this.curGuideRadius > 0){
      this.curGuideRadius -= this.game.deltaTime / this.guideDuration * this.guideRadius;
      if(this.curGuideRadius < 0)this.curGuideRadius = 0;
    } else { 
      this.game.setState("trial");
    }
    let circX = (window.innerWidth/2 - this.circle.offsetWidth/2) * ((this.curGuideRadius / this.guideRadius)) +  (this.game.mouseX - this.curGuideRadius) * (1 - this.curGuideRadius / this.guideRadius);
    let circY = (window.innerHeight/2 - this.circle.offsetHeight/2) * ((this.curGuideRadius / this.guideRadius)) +  (this.game.mouseY - this.curGuideRadius) * (1 - this.curGuideRadius / this.guideRadius);
    this.circle.style.left = circX.toString() + "px";
    this.circle.style.top =  circY.toString() + "px";
  } else {
    this.curGuideRadius = this.guideRadius;
    this.circle.style.left = (window.innerWidth/2 - this.curGuideRadius).toString() + "px";
    this.circle.style.top = (window.innerHeight/2 - this.curGuideRadius).toString() + "px";
  }
  
  this.circle.style.width = (this.curGuideRadius * 2).toString() + "px";
  this.circle.style.height = (this.curGuideRadius * 2).toString() + "px";
};

state_fixation.terminate = function(){
  this.circle.remove();
};

export default state_fixation;