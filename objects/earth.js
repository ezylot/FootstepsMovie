function createEarthNode(gl) {
    var aspect = 800/600; //canvas.width / canvas.height
    let squareVertices = new Float32Array([
        -0.5, 0.5*aspect, 0.5, 0.5*aspect, 0.5,-0.5*aspect, // Triangle 1
        -0.5, 0.5*aspect, 0.5,-0.5*aspect, -0.5,-0.5*aspect // Triangle 2
    ]);

    let squareColors = new Float32Array(repeat([0.384, 0.976, 0.043], squareVertices.length / 2));

    let squareVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, squareVertices, gl.STATIC_DRAW);

    let squareColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, squareColors, gl.STATIC_DRAW);

    return new VerticesRenderNode(squareVertexBuffer, squareVertices.length / 2, squareColorBuffer, 0.6);
}