import State from "../classes/State";
import configParams from "../../config/parameters_config";
import trialParams from "../../config/trial_config";
import texts from "../../config/texts";
import {TweenLite, TweenMax, TimelineMax, Power2} from "gsap";
import state_trial from "./state_trial";
const state_tutorial = new State();

state_tutorial.create = function(){

  this.game.cursor.style.opacity = "0";

  // pick a random set of trial sets for this tutorial
  // and preload them
  this.pickedTrials = this.makeRndArrLength(trialParams, configParams["tutorial"]["number_of_visual_search_practice_trials"] + configParams["tutorial"]["number_of_full_practice_trials"]);

  for(let k = 0; k<this.pickedTrials.length; k++){
    let trialData = this.pickedTrials[k];
    for(let i = 0; i< trialData["stim_id"].length; i++){
      const stim_id = trialData["stim_id"][i];
      if(!this.game.loader.cache[stim_id.toString()]){
        this.game.loader.addImage(stim_id.toString(), `/img/${stim_id.toString()}.png`, configParams["assets_dir"]);
      }
    }
  }

  this.game.loader.start();
  this.game.loader.onFinish = this.onLoadFinish.bind(this);
};

// begin the tutorial
state_tutorial.onLoadFinish = function(){

  this.trialData = this.pickedTrials.pop();
  state_trial.buildTrial.call(this);
  this.reposition();
  // start tutorial timeline

  this.curPhase = "pick";
  const tl = new TimelineMax();
  // show first instruction

  this.boundKeyPress =  this.onKeyPress.bind(this);
  document.addEventListener("keypress", this.boundKeyPress);

  this.lblInstruct.innerText = texts["tutorial_text1"];
  this.lblInstruct.style.top = `${window.innerHeight + 200}px`;
  this.lblInstruct.style.width = "300";
  const lblInstructTw = TweenMax.to(this.lblInstruct, 0.4, {
    css: {
      top: this.categorizeInstructTopTo
    },
    delay: 0.5,
    ease: Power2.easeOut
  });
  if(configParams["no_animation_at_all"] || !configParams["tutorial"]["do_animate_instruction"]){
    lblInstructTw.totalTime(lblInstructTw.totalDuration());
  }
  lblInstructTw.eventCallback("onComplete", ()=>{

    this.updateInstruction(texts["tutorial_text2"], configParams["tutorial"]["delay_before_instruction_change"] / 1000, 0, false)
    .then(()=>{
      if(configParams["no_animation_at_all"] || !configParams["do_animate_cursor_appear"]){
        this.game.cursor.style.opacity = "1";
      } else {
        TweenLite.to(this.game.cursor, 0.3, {css: {opacity: 1}, ease: Power2.easeOut});
      }
    });

  })

};

state_tutorial.updateInstruction = function(_newText, wait = 0, hold = 0, spaceToFulfill = true){

  const newText = _newText + (spaceToFulfill? "\n(press space to continue)" : "");
  return new Promise((resolve) => {

    const tl = new TimelineMax();
    const tmpTxt = this.lblInstruct.innerText;
    this.lblInstruct.innerText = newText;
    const newHeight = this.lblInstruct.offsetHeight;
    this.lblInstruct.innerText = tmpTxt;
    tl.set({}, {}, `+=${spaceToFulfill? 0 : wait}`);

    tl.to(this.lblInstruct, !configParams["no_animation_at_all"] && configParams["tutorial"]["do_animate_instruction"]? 0.4 : 0, {
      css: {
        top: this.categorizeInstructTopFrom,
        opacity: 0
      },
      ease: Power2.easeOut
    });

    tl.set(this.lblInstruct, {innerText: newText, css: {width: "400"}});

    tl.add(this.reposition.bind(this), "+=0");
    tl.to(this.lblInstruct, !configParams["no_animation_at_all"] && configParams["tutorial"]["do_animate_instruction"]? 0.4 : 0, {
        css: {
          top:  this.categorizeInstructTopTo,
          opacity: 1
        },
        ease: Power2.easeOut
      })

    tl.set({}, {}, `+=${spaceToFulfill? 0 : hold}`);
    if(spaceToFulfill){
      tl.add(()=>{
        this.spaceResolver = resolve;
        document.addEventListener('keypress', this.spaceListener);
      });
    } else {
      tl.add(resolve);
    }
  })
};

state_tutorial.spaceListener = function(e){
  if(e.key == " "){
    document.removeEventListener('keypress', state_tutorial.spaceListener);
    state_tutorial.spaceResolver();
  }
};

state_tutorial.proceedTutorial = function(){
  if(this.pickedTrials.length > 0) {
    // still proceeding through a set of image-only trials
    const tl = new TimelineMax();
    this.targetStimulus.style.outline = "1px solid orange";
    if(configParams["no_animation_at_all"] || !configParams["tutorial"]["do_animate_stimulus_choice"]){
      this.targetStimulus.style.outlineWidth = "5px";
    } else {
      tl.to(this.targetStimulus, 0.1, {css: {"outline-width": "5px"}, repeat: 2, ease: Power2.easeInOut, yoyo: 1});
    }

    tl.to(this.stimuli,
      configParams["no_animation_at_all"] || !configParams["tutorial"]["do_animate_images_change"]? 0: 0.2, {
        css: {"opacity": 0}
      });


    tl.add(() => {
      this.curPhase = "pick";
      if(configParams["no_animation_at_all"] || !configParams["do_animate_cursor_appear"]){
        this.game.cursor.style.opacity = "1";
      } else {
        TweenLite.to(this.game.cursor, 0.1, {css: {opacity: 1}, ease: Power2.easeOut});
      }
      this.trialData = this.pickedTrials.pop();
      for(var i = 0; i<this.trialData["stim_id"].length; i++){
        const stim_id = this.trialData["stim_id"][i];
        const isTarget = this.trialData["target"][i];
        const category = this.trialData["cat"];
        const position = this.trialData["position"][i];

        const stimulus = this.stimuli[i];
        stimulus.style.backgroundImage = `url("${this.game.loader.cache[stim_id.toString()].src}")`;
        stimulus.style.outline = "none";
        stimulus.category = category;
        stimulus.isTarget = isTarget;
        if(isTarget){
          this.targetStimulus = stimulus;
        }
        stimulus.game = this.game;
        stimulus.position = position;
        stimulus.id = stim_id;
        this.objs.push(stimulus);
        this.stimuli.push(stimulus);
        this.reposition();
      }
    }, `+=${configParams["tutorial"]["delay_before_next_image_only_example"] / 1000}`);

    tl.to(this.stimuli,
      configParams["no_animation_at_all"] || !configParams["tutorial"]["do_animate_images_change"]? 0: 0.2, {
        css: {"opacity": 1}
      });

  } else {
    this.onDoneWithTutorial();
  }
};

state_tutorial.onDoneWithTutorial = function(){
  if(this.alreadyDone)return;
  this.alreadyDone = true;
  const tl = new  TimelineMax();
  tl.addLabel("start");
  if(!configParams["no_animation_at_all"] && configParams["do_animate_clear_tutorial"]){
    tl.to(this.stimuli, 0.3, {css: {"opacity": 0}});
  }
  tl.set({}, {}, `start+=${configParams["tutorial"]["delay_before_end_tutorial"]/1000}`);
  tl.add(this.game.setState.bind(this.game, "loading"), "+=0");
};

state_tutorial.reposition = function(){
  state_trial.reposition.call(this);
};


state_tutorial.onKeyPress = function(e){
  if(this.alreadyDone)return;
  const acceptedKeys = configParams["action_keys"];
  const pressedKey = e.key;
  this.game.logger.onUserAction("key_press", e.key);
  if(this.curPhase == "cat"){
    if(pressedKey == acceptedKeys[0] || pressedKey == acceptedKeys[1]) {

      TweenLite.to(this.lblInstruct, !configParams["no_animation_at_all"] && configParams["tutorial"]["do_animate_instruction"]? 0.4 : 0, {
        css: {
          top: this.categorizeInstructTopFrom,
          opacity: 0
        },
        ease: Power2.easeOut
      });
      TweenLite.to([this.btnAction1, this.btnAction2], configParams["tutorial"]["do_animate_instruction"]? 0.4 : 0, {
        css: {
          top: this.actionBtnsTopFrom - this.categorizeInstructTopTo + this.categorizeInstructTopFrom,
          opacity: 0
        },
        ease: Power2.easeOut
      });
      this.game.chosenCategory = acceptedKeys.indexOf(pressedKey) + 1;
      window.setTimeout(this.proceedSecondTutorial.bind(this), configParams["delay_before_next_full_example"]);
    }
  }
};

state_tutorial.proceedSecondTutorial = function(){

  if(this.pickedTrials.length < 0) {
    // tutorial finish
    // this.game.setState("loading");
  } else {
    this.proceedTutorial();
  }

};

state_tutorial.finishTrial = function(){
  this.game.setState("loading");
};


state_tutorial.showCategorize = function(){
  this.updateInstruction(texts["tutorial_text3"])
    .then(() => this.updateInstruction(texts["tutorial_text4"], configParams["tutorial"]["delay_before_instruction_change"] / 1000))
        .then(() => this.updateInstruction(texts["tutorial_text5"], configParams["tutorial"]["delay_before_instruction_change"] / 1000, configParams["tutorial"]["delay_before_instruction_change"] / 1000))
    .then(() => state_trial.showCategorize.call(this))
    ;

  state_tutorial.showCategorize = state_tutorial.showCategorize2;
};

state_tutorial.showCategorize2 = function(){
  state_trial.showCategorize.call(this);
};


// creates a new array of a specific length
// using random entries from source array
state_tutorial.makeRndArrLength = function(srcArr, length){

  const dstArr = [];
  while(dstArr.length < length){
    const rndInd = Math.floor(Math.random() * srcArr.length);
    dstArr.push(srcArr[rndInd]);
  }
  return dstArr;

};

state_tutorial.onStimulus = function(){
  if(this.alreadyDone)return;
  if(this.game.curState.curPhase != "pick")return;
  this.game.curState.curPhase = "wait";
  this.style.outline = "none";
  if(this.isTarget){
    console.log("clicked on correct stimulus");
    if(state_tutorial.pickedTrials.length > configParams["tutorial"]["number_of_full_practice_trials"]) {
      state_tutorial.proceedTutorial.call(state_tutorial);
    } else {
      // now we continue to categorize state
      state_tutorial.curPhase = "pick";
      state_trial.onStimulus.call(this);
    }
  } else {
    const tl = new TimelineMax();
    tl.to(this,
      configParams["no_animation_at_all"] ||! configParams["tutorial"]["do_animate_wrong_highlight"]? 0: 0.1,
      {css: {"outline":  "5px solid red"}});

    tl.to(state_tutorial.targetStimulus,
      configParams["no_animation_at_all"] ||! configParams["tutorial"]["do_animate_correct_highlight"]? 0: 0.1,
      {css: {"outline":  "5px solid green"}, repeat: 7, yoyo: 1}, `+=${configParams["tutorial"]["delay_before_highlighting_correct_image"] / 1000}`);

    tl.set(this.game.curState, {"curPhase": "pick"}, "+=0");
  }
};

state_tutorial.terminate = function(){
  State.prototype.terminate.call(this);
  this.lblInstruct.remove();
  this.btnAction1.remove();
  this.btnAction2.remove();
  this.game.loader.onFinish = ()=>{};

  document.removeEventListener("keypress", this.boundKeyPress);
};



export default state_tutorial;
