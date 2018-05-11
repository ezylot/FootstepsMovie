function createEarthNode(gl) {
    var sphere_div = 5;
    var i, ai, si, ci;
    var j, aj, sj, cj;
    var p1,p2;

    //Vertices
    var vertices = [], indices = [];
    for(j = 0;j<=sphere_div;j++){
       aj= j* Math.PI / sphere_div;
       sj = Math.sin(aj);
       cj = Math.cos(aj);
       for(i = 0;i<= sphere_div;i++){
           ai = i * 2 * Math.PI / sphere_div;
           si = Math.sin(ai);
           ci = Math.cos(ai);

           vertices.push(si * sj); //X
           vertices.push(cj); //Y
           vertices.push(ci * sj); //Z
       }
    }
    let squareVertices = new Float32Array(vertices);

    //Indices
    for(j=0;j<sphere_div;j++){
        for(i=0;i<sphere_div;i++){
            p1=j*(sphere_div+1)+i;
            p2 = p1 *(sphere_div+1);

            indices.push(p1);
            indices.push(p2);
            indices.push(p1 +1);
            indices.push(p2);
            indices.push(p2+1);
        }
    }
    let sphereIndices = new Float32Array(indices);
    let squareColors = new Float32Array(repeat([0.384, 0.976, 0.043], squareVertices.length / 2));

    let squareVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, squareVertices, gl.STATIC_DRAW);

    let squareColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, squareColors, gl.STATIC_DRAW);

    return new VerticesRenderNode(squareVertexBuffer, squareVertices.length / 2, squareColorBuffer, 0.6);
}