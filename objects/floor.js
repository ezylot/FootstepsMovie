function createFloorNode(gl) {
    var quadVertices = new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0]);

    var quadColors = new Float32Array([
        0.384, 0.976, 0.043, 1,
        0.384, 0.976, 0.043, 1,
        0.384, 0.976, 0.043, 1,
        0.384, 0.976, 0.043, 1,
        0.384, 0.976, 0.043, 1,
        0.384, 0.976, 0.043, 1]);

    var quadVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
    //copy data to GPU
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    //same for the color
    var quadColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadColors, gl.STATIC_DRAW);

    return new VerticesRenderNode(quadVertexBuffer, quadVertices.length / 2, quadColorBuffer, 0.6);
}