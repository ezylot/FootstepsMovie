function createFloorNode(gl) {
    let quadVertices = new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0]);

    let quadColors = new Float32Array(repeat([0.384, 0.976, 0.043], quadVertices.length / 2));

    let quadVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    let quadColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadColors, gl.STATIC_DRAW);

    return new VerticesRenderNode(quadVertexBuffer, quadVertices.length / 2, quadColorBuffer, 0.6);
}