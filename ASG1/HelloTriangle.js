class Triangle{
  constructor(){
    this.type = "triangle";
    this.position = [0.0,0.0,0.0,0.0];
    this.color = [1.0,1.0,1.0,1.0];
    this.size = 5.0;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;
   
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    //gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    gl.uniform1f(u_Size,size);
    var d = this.size/200;
    //gl.drawArrays(gl.POINTS, 0, 1);
    //THIS IS AWEOME RANDOM ROTATION ANGLE 
    drawTriangle([xy[0], xy[1], xy[0] + Math.cos(Math.random() * Math.PI * 2) * 0.1, xy[1] + Math.sin(Math.random() * Math.PI * 2) * 0.1, xy[0], xy[1] + d]);
  }
    
}
function drawTriangle(vertices){
  var n =3;
  var vertexBuffer = gl.createBuffer();
  if(!vertexBuffer){
    console.log("Failed to create buffer object");
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);  
   
   gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
 
   // Enable the assignment to a_Position variable
   gl.enableVertexAttribArray(a_Position);
   gl.drawArrays(gl.TRIANGLES,0,n);
}

