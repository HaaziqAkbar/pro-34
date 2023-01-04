class SamArcher{
  
    constructor(x,y,width,height,angle){

         this.x = x;
         this.y = y;
         this.width = width;
         this.height = height;
         this.angle = angle;
         this.image = loadImage("./assets/samarcher.png");
        
    }

    display(){

        var angle = this.angle;
        
        if (keyIsDown(RIGHT_ARROW) && this.angle < -83) {
          this.angle += 1;
        }
    
        if (keyIsDown(LEFT_ARROW) && this.angle > -99) {
          this.angle -= 1;
        }

          push();
          translate(this.x,this.y);
          rotate(this.angle);
          imageMode(CENTER);
          image(this.image,0,0,this.width,this.height);
          pop();
         
    }
    
}