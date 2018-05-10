function createRocketNode(gl) {
    let rocketNode = new SGNode();

    // Body of rocket
    let bodyTransformationMatrix = mat4.create();
    bodyTransformationMatrix = mat4.multiply(mat4.create(), bodyTransformationMatrix, glm.translate(0, 0.5, 0));
    let bodyTransformationNode = new TransformationSGNode(bodyTransformationMatrix);
    let bodyNode = createBody(gl);

    bodyTransformationNode.append(bodyNode);
    rocketNode.append(bodyTransformationNode);


    // Feets
    let rightFootRotationNode = new TransformationSGNode(glm.rotateY(0));
    let backFootRotationNode = new TransformationSGNode(glm.rotateY(90));
    let leftFootRotationNode = new TransformationSGNode(glm.rotateY(180));
    let frontFootRotationNode = new TransformationSGNode(glm.rotateY(270));

    let footTransformationMatrix = mat4.create();
    footTransformationMatrix = mat4.multiply(mat4.create(), footTransformationMatrix, glm.translate(0.7, 0, 0));
    footTransformationMatrix = mat4.multiply(mat4.create(), footTransformationMatrix, glm.scale(0.6, 1, 0.3));
    let footTransformationNode = new TransformationSGNode(footTransformationMatrix);

    let footNode = createTriangleWithDepth(gl, [0.4, 0.2, 0.8]);

    footTransformationNode.append(footNode);
    rightFootRotationNode.append(footTransformationNode);
    backFootRotationNode.append(footTransformationNode);
    leftFootRotationNode.append(footTransformationNode);
    frontFootRotationNode.append(footTransformationNode);

    rocketNode.append(rightFootRotationNode);
    rocketNode.append(backFootRotationNode);
    rocketNode.append(leftFootRotationNode);
    rocketNode.append(frontFootRotationNode);

    // Tip of rocket
    let tipTransformationMatrix = mat4.create();
    tipTransformationMatrix = mat4.multiply(mat4.create(), tipTransformationMatrix, glm.translate(0, 2, 0));
    let tipTransformationNode = new TransformationSGNode(tipTransformationMatrix);
    tipTransformationNode.append(createTip(gl));
    bodyTransformationNode.append(tipTransformationNode);

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