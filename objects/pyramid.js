function createPyramid(gl, color) {
    let pyramidVertices =  new Float32Array([
        -0.5,0,-0.5,   // 0 - DLB
        -0.5,0,0.5,    // 1 - DLF
        0.5,0,0.5,     // 2 - DRF
        0.5,0,-0.5,    // 3 - DRF
        0,1,0,      // 4 tip
    ]);

    let pyramidIndices =  new Float32Array([
        0,1,2,  0,2,3,  // Bottom
        4,1,2,          // Front
        4,1,0,          // Left
        4,0,3,          // Back
        4,2,3,          // Right
    ]);

    let pyramidColors = new Float32Array(repeat(color, pyramidIndices.length / 3));

    let pyramidVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pyramidVertices, gl.STATIC_DRAW);

    let pyramidColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pyramidColors, gl.STATIC_DRAW);

    let pyramidIndexBuffer = gl.createBuffer ();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pyramidIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pyramidIndices), gl.STATIC_DRAW);

    let colorNode = new ColorNode(pyramidColorBuffer, 1);
    let pyramidNode = new IndexedVerticesRenderNode(pyramidVertexBuffer, pyramidIndexBuffer, pyramidIndices.length);
    colorNode.append(pyramidNode);

    return colorNode;
    }