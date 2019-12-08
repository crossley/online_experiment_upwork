export default class State {
  constructor(){

  }

  init(){
    this.objs = [];
    this.create();
  }

  create(){

  }

  update(){

  }

  terminate(){
    for(let obj of this.objs){
      obj.remove();
      if(obj.key) {
        this.stage.objs[obj.key] = null;
      }
    }
  }

}