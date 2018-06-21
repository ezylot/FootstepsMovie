function createRocketNode() {
    let rocketNode = new SGNode();

    // Body of rocket
    let bodyTransformationMatrix = mat4.create();
    bodyTransformationMatrix = mat4.multiply(mat4.create(), bodyTransformationMatrix, glm.translate(0, 0.5, 0));
    let bodyTransformationNode = new TransformationSGNode(bodyTransformationMatrix);
    let bodyNode = createBody();

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

    let footNode = new CubeRenderSGNode();

    footTransformationNode.append(footNode);
    rightFootRotationNode.append(footTransformationNode);
    backFootRotationNode.append(footTransformationNode);
    leftFootRotationNode.append(footTransformationNode);
    frontFootRotationNode.append(footTransformationNode);

    rocketNode.append(rightFootRotationNode);
    rocketNode.append(backFootRotationNode);
    rocketNode.append(leftFootRotationNode);
    rocketNode.append(frontFootRotationNode);

    return rocketNode;
}

function createBody() {
    let bodyTransformationMatrix = mat4.create();
    bodyTransformationMatrix = mat4.multiply(mat4.create(), bodyTransformationMatrix, glm.scale(1, 2, 1));
    let bodyTransformationNode = new TransformationSGNode(bodyTransformationMatrix);
    let bodyNode = new CubeRenderSGNode();
    bodyTransformationNode.append(bodyNode);
    return bodyTransformationNode;
}