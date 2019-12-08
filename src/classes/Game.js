import StateMachine from "./StateMachine";

export default class Game {
  constructor(){
    this.states = {
      "loading": state_loading,
      "fixation": state_fixation,
      "trial": state_trial,
      "results": state_results,
      "finish": state_finish
    };
    this.stateMachine = new StateMachine();

    this.curStateKey = null;
    this.curState = null;
  }

  setState(newStateKey){

    if(!newStateKey || !this.states[newStateKey]){
      return console.warn("cannot set state - " + newStateKey);
    }

    const newState = this.states[state];
    const prevStateKey = this.curStateKey;
    let prevState;
    if(prevStateKey !== null){
      prevState = this.states[prevStateKey];
    } else {
      prevState = null;
    }

    if(prevState) {
      // transitioning from current state 
      if(this.stateMachine.transitions[prevStateKey][newStateKey]){
        // if a special transition function is defined, we use that
        this.stateMachine.transitions[prevStateKey][newStateKey].call(this);
      } else {
        prevState.terminate()
          .then(newState.init())
      }
    } else {

    }
    this.curStateKey = state;
    this.curState = this.states[this.curStateKey];
  }
}
