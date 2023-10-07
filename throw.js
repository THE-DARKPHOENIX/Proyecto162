AFRAME.registerComponent("bowlingballs", {
    init: function(){
        this.bolos()
    },
    bolos: function(){
        window.addEventListener("keydown", e =>{
            if(e.key === "s"){
                var bowlingballs = document.createElement("a-entity")
                bowlingballs.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.4,
                })
                bowlingballs.setAttribute("material", {
                    color: "black"
                })
                var camera = document.querySelector("#camera")
                pos = camera.getAttribute("position")
                bowlingballs.setAttribute("position", {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
                })
                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                bowlingballs.setAttribute("velocity", direction.multiplyScalar(-10))
                var scene = document.querySelector("#scene")
                scene.appendChild(bowlingballs)
                ball.addEventListener("collide", this.removeBall)
                
            }
        })
    },
    removeBall: function (e) {
        
        console.log(e.detail.target.el);
        
        console.log(e.detail.body.el);
    
        var element = e.detail.target.el
    
        var elementHit= e.detail.body.el
     
    
        if (elementHit.id.includes("sphere")) 
          {
            elementHit.setAttribute("material",{
              opacity: 0.6,
              transparent: true
            })

            var impulso = new CANNON.Vec3(0,1,-15)
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttributeAttribute("position"))
            elementHit.body.applyImpulse(impulso,worldPoint)
            element.removeEventListener("collide",this.shoot)
        
            var scene = document.querySelector("scene")
            scene.removeChild(element)
          
        }
      },
})