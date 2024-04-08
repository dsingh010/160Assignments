var ctx;
var canvas;

function main() {
    // Retrieve <canvas> element <- (1)
    canvas = document.getElementById('cnv1');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');

    // Draw a blue rectangle <- (3)
    ctx.fillStyle = 'black'; // Set a blue color
    ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color

    
} 

function drawVector(v,color){
    
     ctx.strokeStyle = color;
     var cx = canvas.width/2;
     var cy = canvas.height/2;
     ctx.beginPath();
     ctx.moveTo(cx, cy);
     
     //scale cordinates by 20
     ctx.lineTo(cx + v.elements[0] * 20, cy - v.elements[1] * 20);
     ctx.stroke();
}

function handleDrawEvent(){
    //Init vectors
    var x1 =  document.getElementById("x1").value;
    var y1 =  document.getElementById("y1").value;
    var x2 =  document.getElementById("x2").value;
    var y2 =  document.getElementById("y2").value;

    //Clear Background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);
   
    //Call drawVector(v1, "red") in the main() function
    var v1 = new Vector3([x1, y1, 0.0]);
    drawVector(v1, "red")

    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v2, "blue")
}

function handleDrawOperationEvent(){
    var x1 =  document.getElementById("x1").value;
    var y1 =  document.getElementById("y1").value;
    var x2 =  document.getElementById("x2").value;
    var y2 =  document.getElementById("y2").value;

    //Clear Background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);
   
    //Call drawVector(v1, "red") in the main() function
    var v1 = new Vector3([x1, y1, 0.0]);
    drawVector(v1, "red")

    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v2, "blue")

    var op = document.getElementById("operation");
    if (op.value === "add") {
        v1.add(v2);
        drawVector(v1, "green");
    }
    else if (op.value === "sub") {
        v1.sub(v2);
        drawVector(v1, "green");
    }
    else if (op.value === "mul") {
        var s = document.getElementById("Scalar").value;

        v1.mul(s);
        drawVector(v1, "green");

        v2.mul(s);
        drawVector(v2, "green");
    }
    else if (op.value === "div") {
        var s = document.getElementById("Scalar").value;

        v1.div(s);
        drawVector(v1, "green");

        v2.div(s);
        drawVector(v2, "green");
    }
    else if (op.value === "mag") {
        console.log("v1 Magnitude : "+ v1.magnitude());
        console.log("v2 Magnitude  "+ v2.magnitude()); 
    }
    else if (op.value === "nor") {
        var a = v1.normalize();
        drawVector(a,"green")

        var b = v2.normalize();
        drawVector(b,"green") 
    }
    else if (op.value === "ang") {
        console.log("Angle Between: " + (angleBetween(v1, v2)).toFixed(2));
    }
    else if (op.value === "area") {
        console.log("Triangle Area: ", areaTriangle(v1, v2).toFixed(2));
    }
    
}

function angleBetween(v1, v2) {
   var a = v1.magnitude();
   var b = v2.magnitude();
   var dotProduct = Vector3.dot(v1, v2);
   var magnitudeProduct = a * b

   var cosAngle = dotProduct / magnitudeProduct;
   var angleRadians = Math.acos(cosAngle);
   var angleDegrees = angleRadians * (180 / Math.PI);
   
   return angleDegrees
          
}

function areaTriangle(v1, v2) {
   var prod = Vector3.cross(v1,v2)
   var res = prod. magnitude()/2;

   return res
        
}