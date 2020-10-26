import State from "../classes/State";
import texts from "../../config/texts";
import configParams from "../../config/parameters_config"

const state_finish = new State();

state_finish.create = function(){
  this.lblThanks = this.game.addLabel(0, 0, texts["thanks"], 25);
  this.lblThanks.className = "instructionsLbl";

  let generatedCode = "";
  this.fieldCode = document.createElement("input");
  this.fieldCode.className = "fieldCode";
  this.fieldCode.setAttribute('value', generatedCode.toString());
  this.fieldCode.setAttribute('readonly', true);
  this.fieldCode.addEventListener('click', ()=>{
    this.fieldCode.select();
    this.fieldCode.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
  });
  this.game.logger.POST(configParams["backend_dir"] + "getUniqueCode.php", {"id": 0}, (data)=>{
    this.fieldCode.setAttribute('value', data.toString());
  }, ()=>{
    this.fieldCode.setAttribute('value', 'ERROR');
  });
  this.game.stage.appendChild(this.fieldCode);

  document.body.style.cursor = "default";

  this.reposition();
};

state_finish.reposition = function(){
  this.lblThanks.style.left = (window.innerWidth /2 - this.lblThanks.offsetWidth/2).toString() + "px";
  this.lblThanks.style.top = "250px";

  this.fieldCode.style.position = "absolute";
  this.fieldCode.style.left = (window.innerWidth /2 - this.fieldCode.offsetWidth/2).toString() + "px";
  this.fieldCode.style.top = "450px";
  this.fieldCode.style.width = "auto";
};

export default state_finish;
