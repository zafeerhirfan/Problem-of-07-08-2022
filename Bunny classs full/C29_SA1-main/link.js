class Link{
      
          constructor(bodyA,bodyB){
            var lastlink = bodyA.body.bodies.length-2;
          this.link = Constraint.create({
           bodyA : bodyA.body.bodies[lastlink],
           bodyB : bodyB,
           stiffness: 0.01,
           length : -100,
           pointA : {x:0 , y:0},
           pointB : {x:0,y:0}

           

          }); 
           World.add(world,this.link);
           
   


          }
detach(){

   World.remove(world,this.link);

}


}
