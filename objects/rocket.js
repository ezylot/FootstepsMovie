function createRocketNode(gl) {
    let cubeVertices = new Float32Array([
        -1,-1,-1,   // 0 - DLB
        -1,-1,1,    // 1 - DLF
        1,-1,1,     // 2 - DRF
        1,-1,-1,    // 3 - DRF

        -1,1,-1,   // 4 - ULB
        -1,1,1,    // 5 - ULF
        1,1,1,     // 6 - URF
        1,1,-1,    // 7 - URF
    ]);

    let cubeIndices =  new Float32Array([
        0,1,2,0,2,3,    //DOWN
        4,5,6,4,6,7,    //UP
        5,1,2,5,2,6,    //FACING FRONT
        6,2,3,6,3,7,    //FACING SIDE
        0,4,3,4,7,3,    //NON-FACING BACK
        4,5,0,5,0,1,    //NON-FACING SIDE
    ]);

    let cubeVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);

    let cubeColorBuffer = gl.createBuffer();

    let cubeIndexBuffer = gl.createBuffer ();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeIndices), gl.STATIC_DRAW);

    return new IndexedVerticesRenderNode(cubeVertexBuffer, cubeIndexBuffer, cubeIndices.length, cubeColorBuffer, 1);
}