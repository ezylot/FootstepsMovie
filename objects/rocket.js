function createRocketNode(gl) {
    let s = 0.3; //size of cube
    let cubeVertices = new Float32Array([
        -s,-s,-s,   s,-s,-s,    s, s,-s,    -s, s,-s,
        -s,-s, s,   s,-s, s,    s, s, s,    -s, s, s,
        -s,-s,-s,   -s, s,-s,   -s, s, s,   -s,-s, s,
        s,-s,-s,    s, s,-s,    s, s, s,    s,-s, s,
        -s,-s,-s,   -s,-s, s,   s,-s, s,    s,-s,-s,
        -s, s,-s,   -s, s, s,   s, s, s,    s, s,-s,
    ]);

    let cubeColors = new Float32Array([
        0,1,1, 0,1,1, 0,1,1, 0,1,1,
        1,0,1, 1,0,1, 1,0,1, 1,0,1,
        1,0,0, 1,0,0, 1,0,0, 1,0,0,
        0,0,1, 0,0,1, 0,0,1, 0,0,1,
        1,1,0, 1,1,0, 1,1,0, 1,1,0,
        0,1,0, 0,1,0, 0,1,0, 0,1,0
    ]);

    let cubeIndices =  new Float32Array([
        0,1,2, 0,2,3,
        4,5,6, 4,6,7,
        8,9,10, 8,10,11,
        12,13,14, 12,14,15,
        16,17,18, 16,18,19,
        20,21,22, 20,22,23
    ]);

    let cubeVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);

    let cubeColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeColors, gl.STATIC_DRAW);

    let cubeIndexBuffer = gl.createBuffer ();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeIndices), gl.STATIC_DRAW);

    return new IndexedVerticesRenderNode(cubeVertexBuffer, cubeIndexBuffer, cubeIndices.length, cubeColorBuffer, 1);
}