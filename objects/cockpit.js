function createCockpitOverlay(gl) {
    let quadVertices = new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0]);

    let quadColors = new Float32Array(repeat([0.9, 0.9, 0.9], quadVertices.length / 2));

    let quadVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    let quadColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadColors, gl.STATIC_DRAW);

    return new ColorNode(quadColorBuffer, 0.2, [
        new VerticesRenderNode(quadVertexBuffer, quadVertices.length / 2)
    ]);
}