

// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
  gl_Position = a_Position;
  gl_PointSize = u_Size;
  }
  `

// Fragment shader program

var FSHADER_SOURCE =`
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
   gl_FragColor = u_FragColor;
  }
  `
const POINT =0;
const TRIANGLE = 1;
const CIRCLE = 2;
//const SQUARE = 3;

let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;


let g_selectedColor = [1.0,1.0,1.0,1.0];
let g_selectedSize =5;
let g_selectedEdges =10;
var g_shapesList= [];
let g_selectedType = POINT;


function setupWebGL(){
  canvas = document.getElementById('webgl');

  //gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if(!gl){
    console.log("Failed to get rendering context for WebGL");
    return;
  }
}

function connectVariablesToGLSL(){
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
  
}


function addActionsForHtmlUI(){
  
  document.getElementById('clearButton').onclick = function() {g_shapesList = [];renderAllShapes();};
  
  document.getElementById('triangle').onclick = function() {g_selectedType = TRIANGLE};
  document.getElementById('circle').onclick = function() {g_selectedType = CIRCLE};
  //document.getElementById('square').onclick = function() {g_selectedType = SQUARE};



  document.getElementById('redSlide').addEventListener('mouseup', function(){g_selectedColor[0]= this.value/100;});
  document.getElementById('greenSlide').addEventListener('mouseup', function(){g_selectedColor[1]= this.value/100;});
  document.getElementById('blueSlide').addEventListener('mouseup', function(){g_selectedColor[2]= this.value/100;});
  
  document.getElementById('sizeSlider').addEventListener('mouseup', function(){g_selectedSize= this.value;});
  document.getElementById('scount').addEventListener('mouseup', function(){g_selectedEdges= this.value;});
 



}


function main() {
  setupWebGL();
  connectVariablesToGLSL();
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  //canvas.onmousemove = click;
  //canvas.onmousedown = function(ev){ click(ev, gl, canvas, a_Position, u_FragColor) };
  canvas.onmousedown = function(ev){ if (ev.buttons == 1) { click(ev)} };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}


function click(ev) {
  let [x,y] = convertCoordinatesEventToGL(ev);
  let point;

  console.log(g_selectedType);

  if(g_selectedType == POINT){
    point = new Point();
  } else if(g_selectedType == TRIANGLE){
    point = new Triangle();
  } else if (g_selectedType == CIRCLE){
    point = new Circle();
    point.scount = g_selectedEdges;
  }
  else if (g_selectedType == DONUT) {
    point = new Donut();
    point.scount = g_selectedEdges;
  
  }
 
  point.position=[x,y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize
  point.scount = g_selectedEdges;
  g_shapesList.push(point);

  renderAllShapes();
}

function convertCoordinatesEventToGL(ev) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x= ((x-rect.left)- canvas.width/2)/(canvas.width/2);
    y= (canvas.height/2- (y-rect.top))/(canvas.height/2);

    return[x,y];
  }


  function renderAllShapes(){
    var startTime = performance.now();

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_shapesList.length;
    for(var i = 0; i < len; i++) {
      g_shapesList[i].render();
  }
  var duration = performance.now();
  sendTextToHTML("numdot: "+ len +": ms: " + Math.floor(duration) + " fps:" + Math.floor(10000/duration));
}

function sendTextToHTML(text,htmlID){
    var htmlElm = document.getElementById(htmlID);
    if(!htmlElm){
      console.log("Failed to get "+ htmlID+ " from HTML");
      return;
    }
    htmlElm.innerHTML = text;
  }