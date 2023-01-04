class Sam{
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sam = loadImage("assets/sam.png");
        
      }
      display() {
        
        push();
        translate(this.x, this.y);
        imageMode(CENTER);
        image(this.sam, 0, 0, this.width, this.height);
        pop();

      }
}