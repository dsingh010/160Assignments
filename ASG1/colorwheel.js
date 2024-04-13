/ Define the triangle vertices
var vertices = [
    0.0, 0.0, 0.0,
    // Define other vertices here for each triangle...
];

// Define the colors for each triangle
var colors = [
    0.0, 1.0, 0.0, // Triangle 1 color
    0.0, 1.0, 0.0, // Triangle 2 color
    // Define colors for other triangles here...
];

// Create and bind the vertex buffer
var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Create and bind the color buffer
var color_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

// Define the vertex shader code
var vertCode =
    'attribute vec3 coordinates;' +
    'attribute vec3 color;' +
    'varying vec3 vColor;' +
    'void main(void) {' +
    '  gl_Position = vec4(coordinates, 1.0);' +
    '  vColor = color;' +
    '}';

// Create and compile the vertex shader
var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

// Define the fragment shader code
var fragCode =
    'precision highp float;' +
    'varying vec3 vColor;' +
    'void main(void) {' +
    '  gl_FragColor = vec4(vColor, 1.0);' +
    '}';

// Create and compile the fragment shader
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

// Create and link the shader program
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Bind the vertex buffer
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

// Bind the color buffer
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
var color = gl.getAttribLocation(shaderProgram, "color");
gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(color);

// Draw the triangles
gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);