function createRocketNode(gl) {
    let rocketNode = new SGNode();

    // Body of rocket
    rocketNode.append(createBody(gl));

    // Tip of rocket
    let tipTransformationMatrix = mat4.create();
    tipTransformationMatrix = mat4.multiply(mat4.create(), tipTransformationMatrix, glm.translate(0, 2, 0));
    let tipTransformationNode = new TransformationSGNode(tipTransformationMatrix);
    rocketNode.append(tipTransformationNode);
    tipTransformationNode.append(createTip(gl));

    return rocketNode;
}

function createTip(gl) {
    return createPyramid(gl, [0.5, 0.4, 0.3]);
}

function createBody(gl) {
    let bodyTransformationMatrix = mat4.create();
    bodyTransformationMatrix = mat4.multiply(mat4.create(), bodyTransformationMatrix, glm.scale(1, 2, 1));
    let bodyTransformationNode = new TransformationSGNode(bodyTransformationMatrix);

    let bodyNode = createCube(gl, [0.631, 0.631, 0.631]);

    bodyTransformationNode.append(bodyNode);
    return bodyTransformationNode;
}