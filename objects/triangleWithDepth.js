function createTriangleWithDepth(gl, color) {
    let triangleVertices = new Float32Array([
        -0.5,0,-0.5,   // 0 - DLB
        -0.5,0,0.5,    // 1 - DLF
        0.5,0,0.5,     // 2 - DRF
        0.5,0,-0.5,    // 3 - DRF

        -0.5,1,-0.5,   // 4 - UB
        -0.5,1,0.5,     // 5 - UF
    ]);

    let triangleIndices =  new Float32Array([
        0,1,2,  0,2,3,    // kathete 1
        0,1,4,  4,5,1,    // kathete 2
        2,3,4,  4,5,2,    // hypothenuse
        1,2,5,            // front side
        0,3,4,            // back side
    ]);

    let triangleColors = new Float32Array(repeat(color, triangleIndices.length / 3));

    let triangleVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);

    let triangleColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleColors, gl.STATIC_DRAW);

    let triangleIndexBuffer = gl.createBuffer ();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleIndices), gl.STATIC_DRAW);

    return new IndexedVerticesRenderNode(triangleVertexBuffer, triangleIndexBuffer, triangleIndices.length, triangleColorBuffer, 1);
}