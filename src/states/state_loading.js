import State from "../classes/State";

const state_loading = new State();

state_loading.create = function(){
  
  this.game.loader.addImage("0", "../img/0.png");
  this.game.loader.addImage("1", "../img/1.png");
  this.game.loader.addImage("2", "../img/2.png");

  this.game.loader.start();
  this.game.loader.onFinish = this.onLoadFinish;

  this.game.debugLbl = this.game.addLabel(window.innerWidth/2, 50, "loading");
};

state_loading.update = function(){
};

state_loading.onLoadFinish = function(){
  this.game.setState("fixation");
};

export default state_loading;