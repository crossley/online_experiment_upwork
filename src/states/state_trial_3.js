import State from "../classes/State";
import trialsData from "../../config/trial_config.json";
import configParams from "../../config/parameters_config";
import texts from "../../config/texts";
import {
    TweenLite,
    TimelineMax,
    Power2
} from "gsap";
import {
    config
} from "aws-sdk";

const state_trial = new State();

state_trial.create = function() {

    this.game.logger.onTrialBegin();
    this.trialData = trialsData[this.game.curTrialInd];

    this.buildTrial();
    this.reposition();
    this.onStimulus();

    this.boundKeyPress = this.onKeyPress.bind(this);
    document.addEventListener("keypress", this.boundKeyPress);

};

state_trial.buildTrial = function() {

    this.stimuliContainer = this.game.addImage(0, 0);
    this.curPhase = "cat";
    this.stimuli = [];
    for (var i = 0; i < this.trialData["stim_id"].length; i++) {
        const stim_id = this.trialData["stim_id"][i];
        const isTarget = this.trialData["target"][i];
        const category = this.trialData["cat"];
        const position = this.trialData["position"][i];

        const stimulus = this.game.addImage(0, 0, stim_id.toString(), this.stimuliContainer);
        stimulus.category = category;
        stimulus.isTarget = isTarget;
        stimulus.originalWidth = stimulus.offsetWidth;
        if (isTarget) {
            this.targetStimulus = stimulus;
        }

        stimulus.game = this.game;
        stimulus.position = position;
        stimulus.id = stim_id;
        this.objs.push(stimulus);
        this.stimuli.push(stimulus);

        this.game.chosenStimulus = stimulus;
    }
    // this.game.debugLbl.innerText = "Trial began - " + this.game.curTrialInd;

    this.lblInstruct = this.game.addLabel(window.innerWidth / 2, window.innerHeight + 50, texts["trial_first_instruction"], 24);
    this.lblInstruct.className = "instructionsLbl";
    this.lblInstruct.style.width = "300px";

    this.btnAction1 = this.game.addImage(0, window.innerHeight, "keyboardBtn");
    this.btnAction1.style.opacity = "1";
    this.btnAction1.style.transform = "translate(-50%, -50%) scale(0.6)";
    this.btnAction1.lbl = document.createElement("p");
    this.btnAction1.appendChild(this.btnAction1.lbl);
    this.btnAction1.lbl.innerText = configParams["action_keys"][0].toUpperCase();
    this.btnAction1.lbl.style.fontSize = "45px";
    this.btnAction1.lbl.style.fontWeight = "bold";
    this.btnAction1.lbl.style.position = "absolute";
    this.btnAction1.lbl.style.left = "41px";
    this.btnAction1.lbl.style.top = "-30px";

    this.btnAction1.dscLbl = document.createElement("p");
    this.btnAction1.appendChild(this.btnAction1.dscLbl);
    this.btnAction1.dscLbl.className = "lblCat";
    this.btnAction1.dscLbl.innerText = texts["first_category"];
    this.btnAction1.dscLbl.style.textAlign = "center";
    this.btnAction1.dscLbl.style.fontSize = "35px";
    this.btnAction1.dscLbl.style.fontWeight = "bold";
    this.btnAction1.dscLbl.style.position = "absolute";
    this.btnAction1.dscLbl.style.left = "-20px";
    this.btnAction1.dscLbl.style.top = "-150px";

    this.btnAction2 = this.game.addImage(0, window.innerHeight, "keyboardBtn");
    this.btnAction2.style.opacity = "1";
    this.btnAction2.style.transform = "translate(-50%, -50%) scale(0.6)";
    this.btnAction2.lbl = document.createElement("p");
    this.btnAction2.appendChild(this.btnAction2.lbl);
    this.btnAction2.lbl.innerText = configParams["action_keys"][1].toUpperCase();
    this.btnAction2.lbl.style.fontSize = "45px";
    this.btnAction2.lbl.style.fontWeight = "bold";
    this.btnAction2.lbl.style.position = "absolute";
    this.btnAction2.lbl.style.left = "41px";
    this.btnAction2.lbl.style.top = "-30px";

    this.btnAction2.dscLbl = document.createElement("p");
    this.btnAction2.appendChild(this.btnAction2.dscLbl);
    this.btnAction2.dscLbl.innerText = texts["second_category"];
    this.btnAction2.dscLbl.style.textAlign = "center";
    this.btnAction2.dscLbl.className = "lblCat";
    this.btnAction2.dscLbl.style.fontSize = "35px";
    this.btnAction2.dscLbl.style.fontWeight = "bold";
    this.btnAction2.dscLbl.style.position = "absolute";
    this.btnAction2.dscLbl.style.left = "-40px";
    this.btnAction2.dscLbl.style.top = "-150px";

};

state_trial.reposition = function() {

    for (let i = 0; i < this.stimuli.length; i++) {
        const stim = this.stimuli[i];
        stim.style.left = (window.innerWidth / 2 + stim.position[0] / 2 - parseInt(stim.style.width) / 2).toString() + "px";
        stim.style.top = (window.innerHeight / 2 + stim.position[1] / 2 - parseInt(stim.style.height) / 2).toString() + "px";
    }

    this.lblInstruct.style.top = `${window.innerHeight/2 - 150}px`;
    this.lblInstruct.style.left = `${window.innerWidth/2}px`;
    this.lblInstruct.style.transform = "translate(-50%, -50%)";

    this.btnAction1.style.top = `${window.innerHeight/2 + 200}px`;
    this.btnAction2.style.top = `${window.innerHeight/2 + 200}px`;
    this.btnAction1.style.left = `${parseInt(this.lblInstruct.style.left) - 60}px`;
    this.btnAction2.style.left = `${parseInt(this.lblInstruct.style.left) + 60}px`;

};

state_trial.onStimulus = function() {
    this.game.curState.curPhase = "cat";
};

state_trial.onKeyPress = function(e) {
    const acceptedKeys = configParams["action_keys"];
    const pressedKey = e.key;
    this.game.logger.onUserAction("key_press", e.key);
    if (this.curPhase == "cat") {
        if (pressedKey == acceptedKeys[0] || pressedKey == acceptedKeys[1]) {
            this.game.chosenCategory = acceptedKeys.indexOf(pressedKey) + 1;
            this.curPhase = "end";
            window.setTimeout(this.finishTrial.bind(this), configParams["delay_before_feedback"]);
        }
    }
};

state_trial.finishTrial = function() {
    this.game.setState("results");
};

state_trial.terminate = function() {
    State.prototype.terminate.call(this);
    this.lblInstruct.remove();
    this.btnAction1.remove();
    this.btnAction2.remove();
    document.removeEventListener("keypress", this.boundKeyPress);
};

export default state_trial;
