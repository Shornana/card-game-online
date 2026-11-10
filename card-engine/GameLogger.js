export class GameLogger{
  constructor(logger){
    this.logger = logger;
  }

  log(entity, text){} //implementable
  error(entity, err){} //implementable
  clear(){}
}
