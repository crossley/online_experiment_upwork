import configParams from "../../config/parameters_config";
export default class Logger {
  constructor(game){
    this.game = game;
    this.sessionData = {
      configInfo: configParams,
      environmentInfo: {
        "screen_width": window.innerWidth,
        "screen_height": window.innerHeight,
        "navigator_userAgent": navigator.userAgent,
        "navigator_platform": navigator.platform,
        "navigator_language": navigator.language
      },
      events: [],
      actions: [],
      mouse_life: ""
    };

    this.onSessionBegin();
    this.perXPrev = this.perYPrev = 0;
    const timesPerSec = configParams["mouse_position_capture_rate"];
    const int = 1000 / timesPerSec;
    window.setInterval(this.logMousePos.bind(this), int);
  }

  onSessionBegin() {
    const event = {
      "type": "session_begin",
      "timestamp": Date.now()
    };
    this.sessionData.events.push(event);
  }

  onTrialBegin() {
    const event = {
      "type": "trial_begin",
      "num": this.game.curTrialInd,
      "timestamp": Date.now()
    };
    this.sessionData.events.push(event);
  }

  onTrialEnd(){
    const events = {
      "type": "trial_end",
      "num": this.game.curTrialInd,
      "status": (this.game.isTrialSuccess? "correct": "wrong"),
      "timestamp": Date.now()
    };
    this.sessionData.events.push(event);
  }

  logMousePos(){
    const perX = Math.round((this.game.mouseX||0 / window.innerWidth) * 100) / 100;
    const perY = Math.round((this.game.mouseY||0 / window.innerHeight) * 100) / 100;
    if((this.perXPrev != perX || this.perYPrev != perY)  
      ||!(configParams["capture_mouse_position_only_when_changed"])){
      this.perXPrev = perX;
      this.perYPrev = perY;
      const posStr = (perX <10? "0" + perX : perX.toString()) + (perY <10? "0" + perY : perY.toString());
      this.sessionData.mouse_life += posStr;
    }
  }


}