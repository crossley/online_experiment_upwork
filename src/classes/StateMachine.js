export default class StateMachine {
  constructor(game){
    this.game = game;
    this.transitions = [];
  }

  defineTransition(state1, state2, transition){
    if(this.transitions[state1]){
      this.transitions[state1] = [];
    }

    this.transitions[state1][state2] = transition;
  }
};