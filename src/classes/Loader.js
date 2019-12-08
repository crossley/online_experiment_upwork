export default class Loader {
  constructor(game){
    this.game = game;

    this.loadingQueue = [];
    this.cache = {};
  }

  clearLoadingQueue(){
    this.loadingQueue = [];
    this.onFinish = () => {};
  }

  clearCache(){
    this.cache = {};
  }

  addImage(key, src){
    this.loadingQueue.push({type: "image", key: key, src: src});
  }

  start(){
    console.log("loader start");
    this.loadingTarget = this.loadingQueue.length;
    this.progress = 0;
    this.proceedLoadingQueue();
  }

  onFinish(){

  }

  proceedLoadingQueue(){
    this.progress = 1 - (this.loadingQueue.length / this.loadingTarget);
    if(this.loadingQueue.length <=0) return this.onFinish();

    const next = this.loadingQueue.pop();
    switch(next.type){
      case "image":
      const img = new Image();
      img.src = next.src;
      this.cache[next.key] = img;
      img.addEventListener('load', () => this.proceedLoadingQueue());
      break;

      default: 
      this.proceedLoadingQueue();
      break;
    }
  }
}