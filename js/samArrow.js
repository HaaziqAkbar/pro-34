class SamArrow {
    constructor(x, y,width,height) {
      
        var options = {
            isStatic:true
        }

      this.x =x;
      this.y = y;
      this.width = width;
      this.height = height; 
      this.body = Bodies.rectangle(x, y,this.width,this.height,options);
      this.image = loadImage("./assets/arrow.png");
      World.add(world, this.body);

    }
  
    remove(index){
     
         Matter.Body.setVelocity(this.body, {x: 0,y:0});

         setTimeout(() =>{
          
         Matter.World.remove(world,this.body);
         delete arrows[index];
    
    }, 1000);
    }

    shoot(){
      var newAngle = samarcher.angle / 28;
      newAngle = newAngle * (3.14/180);
      var velocity = p5.Vector.fromAngle(newAngle);
      velocity.mult(0.5);
      Matter.Body.setStatic(this.body, false);
      Matter.Body.setVelocity(this.body,{
          x: velocity.x * (180/3.14),
          y: velocity.y * (180/3.14)});
      
  }

  display() 
    {
      var pos = this.body.position;
      
      push();
      imageMode(CENTER);
      image(this.image,pos.x,pos.y,this.width,this.height);
      pop();

    }

  } 