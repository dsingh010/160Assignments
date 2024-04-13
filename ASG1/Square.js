
class Square {
  constructor(canvasId) {
    // Retrieve <canvas> element
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.log('Failed to retrieve the canvas element');
      return;
    }

    // Get the rendering context for WebGL
    this.gl = this.canvas.getContext('webgl');
    if (!this.gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
    }

    // Initialize shaders
    if (!this.initShaders()) {
      console.log('Failed to initialize shaders.');
      return;
    }

    // Write the positions of vertices to a vertex shader
    this.n = this.initVertexBuffers();
    if (this.n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }

    // Specify the color for clearing <canvas>
    this.gl.clearColor(0, 0, 0, 1);

    // Clear <canvas>
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // Draw the rectangle
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.n);
  }

  initShaders() {
    // Vertex shader program
    const VSHADER_SOURCE =
      'attribute vec4 a_Position;\n' +
      'void main() {\n' +
      '  gl_Position = a_Position;\n' +
      '}\n';

    // Fragment shader program
    const FSHADER_SOURCE =
      'void main() {\n' +
      '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
      '}\n';

    // Initialize shaders
    if (!this.initShader(this.gl, VSHADER_SOURCE, this.gl.VERTEX_SHADER)) {
      console.log('Failed to initialize vertex shader');
      return false;
    }
    if (!this.initShader(this.gl, FSHADER_SOURCE, this.gl.FRAGMENT_SHADER)) {
      console.log('Failed to initialize fragment shader');
      return false;
    }

    return true;
  }

  initShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return false;
    }
    gl.attachShader(gl.program, shader);
    return true;
  }

  initVertexBuffers() {
    const vertices = new Float32Array([
      -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
    ]);
    const n = 4; // The number of vertices

    // Create a buffer object
    const vertexBuffer = this.gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    // Bind the buffer object to target
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    // Write data into the buffer object
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    const a_Position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
    }
    // Assign the buffer object to a_Position variable
    this.gl.vertexAttribPointer(a_Position, 2, this.gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    this.gl.enableVertexAttribArray(a_Position);

    return n;
  }
}
