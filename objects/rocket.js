function createRocketNode(gl) {

    let rocketNode = new RootNode();

    // Body of rocket
    let bodyTransformationMatrix = mat4.create();
    bodyTransformationMatrix = mat4.multiply(mat4.create(), bodyTransformationMatrix, glm.scale(1, 2, 1));
    let bodyTransformationNode = new TransformationNode(bodyTransformationMatrix);
    rocketNode.append(bodyTransformationNode);
    bodyTransformationNode.append(createBody(gl));

    // Tip of rocket
    let tipTransformationMatrix = mat4.create();
    tipTransformationMatrix = mat4.multiply(mat4.create(), tipTransformationMatrix, glm.translate(0, 2, 0));
    let tipTransformationNode = new TransformationNode(tipTransformationMatrix);
    rocketNode.append(tipTransformationNode);
    tipTransformationNode.append(createTip(gl));

    return rocketNode;
}

function createTip(gl) {
    let pyramidVertices =  new Float32Array([
        0,0,0,   // 0 - DLB
        0,0,1,    // 1 - DLF
        1,0,1,     // 2 - DRF
        1,0,0,    // 3 - DRF
        0.5,1,0.5,      // 4 tip
    ]);

    let pyramidIndices =  new Float32Array([
        0,1,2,0,2,3,    // Bottom
        4,1,2,          // Front
        4,1,0,          // Left
        4,0,3,          // Back
        4,2,3,          // Right
    ]);

    let pyramidVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pyramidVertices, gl.STATIC_DRAW);

    let cubeColorBuffer = gl.createBuffer();

    let pyramidIndexBuffer = gl.createBuffer ();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pyramidIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pyramidIndices), gl.STATIC_DRAW);

    return new IndexedVerticesRenderNode(pyramidVertexBuffer, pyramidIndexBuffer, pyramidIndices.length, cubeColorBuffer, 1);

}

function createBody(gl) {
    let cubeVertices = new Float32Array([
        0,0,0,   // 0 - DLB
        0,0,1,    // 1 - DLF
        1,0,1,     // 2 - DRF
        1,0,0,    // 3 - DRF

        0,1,0,   // 4 - ULB
        0,1,1,    // 5 - ULF
        1,1,1,     // 6 - URF
        1,1,0,    // 7 - URF
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