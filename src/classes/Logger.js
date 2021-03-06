import configParams from "../../config/parameters_config";
import { TimelineMax } from "gsap/gsap-core";
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

    this.initAWS();
    this.onSessionBegin();
    this.perXPrev = this.perYPrev = 0;
    const timesPerSec = configParams["mouse_position_capture_rate"];
    const int = 1000 / timesPerSec;
    window.setInterval(this.logMousePos.bind(this), int);
  }

  initAWS(){}

  POST(url, data, onSuccess, onFail) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
      function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3) {
          if(xhr.status==200) { onSuccess(xhr.responseText); }
          else { onFail(xhr); }
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
  }

  saveSessionData() {
    this.POST(configParams["backend_dir"] + 'addSessionData.php', {"session_data": JSON.stringify(this.sessionData)}, (data) => {
      console.log("successfully saved data, ", data);
    }, () => {
      console.log("failed to save data");
    });
  }

  onUserAction(type, ...params){
    const action = {
      "type": type,
      "params": params,
      "timestamp": Date.now()
    };
    this.sessionData.actions.push(action);
    console.log(action);
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
    const event = {
      "type": "trial_end",
      "num": this.game.curTrialInd,
      "status": (this.game.isTrialSuccess? "correct": "wrong"),
      "timestamp": Date.now()
    };
    this.sessionData.events.push(event);
  }

  logMousePos(){
    const perX = Math.round(((this.game.mouseX||0) / window.innerWidth) * 100);
    const perY = Math.round(((this.game.mouseY||0) / window.innerHeight) * 100);
    if((this.perXPrev != perX || this.perYPrev != perY)
      ||!(configParams["capture_mouse_position_only_when_changed"])){
      this.perXPrev = perX;
      this.perYPrev = perY;
      const posStr = ((perX <10? "0" + perX : perX.toString())) + ((perY <10? "0" + perY : perY.toString()));
      this.sessionData.mouse_life += posStr;
    }
  }

  testMouseStr(str){
    const tl = new TimelineMax();
    let s = 0;
    while(s < str.length){
      const x = str.substr(s, 2);
      const y = str.substr(s+2, 2);
      tl.to(this.game.cursor, 0.1, {css: {left: x / 100 * window.innerWidth, top: y / 100 * window.innerHeight}});
      s+=4;
    }
  }


}
