function createRocketNode() {
    let rocketNode = new SGNode();

    // Body of rocket
    let bodyTransformationMatrix = mat4.create();
    bodyTransformationMatrix = mat4.multiply(mat4.create(), bodyTransformationMatrix, glm.translate(0, 0.5, 0));
    bodyTransformationMatrix = mat4.multiply(mat4.create(), bodyTransformationMatrix, glm.scale(1, 2, 1));
    let bodyTransformationNode = new TransformationSGNode(bodyTransformationMatrix);

    let bodyNode = new CubeRenderSGNode();
    bodyTransformationNode.append(bodyNode);

    rocketNode.append(bodyTransformationNode);


    // Feets
    let rightAttachmentRotationNode = new TransformationSGNode(glm.rotateY(0));
    let backAttachmentRotationNode = new TransformationSGNode(glm.rotateY(90));
    let leftAttachmentRotationNode = new TransformationSGNode(glm.rotateY(180));
    let frontAttachmentRotationNode = new TransformationSGNode(glm.rotateY(270));

    let attachmentTransformationMatrix = mat4.create();
    attachmentTransformationMatrix = mat4.multiply(mat4.create(), attachmentTransformationMatrix, glm.translate(0.7, 0, 0));
    attachmentTransformationMatrix = mat4.multiply(mat4.create(), attachmentTransformationMatrix, glm.scale(0.6, 1, 0.3));
    let attachmentTransformationNode = new TransformationSGNode(attachmentTransformationMatrix);

    let attachmentNode = new CubeRenderSGNode();

    attachmentTransformationNode.append(attachmentNode);
    rightAttachmentRotationNode.append(attachmentTransformationNode);
    backAttachmentRotationNode.append(attachmentTransformationNode);
    leftAttachmentRotationNode.append(attachmentTransformationNode);
    frontAttachmentRotationNode.append(attachmentTransformationNode);

    rocketNode.append(rightAttachmentRotationNode);
    rocketNode.append(backAttachmentRotationNode);
    rocketNode.append(leftAttachmentRotationNode);
    rocketNode.append(frontAttachmentRotationNode);

    // Tip of rocket
    let tipTransformationMatrix = mat4.create();
    tipTransformationMatrix = mat4.multiply(mat4.create(), tipTransformationMatrix, glm.translate(0, 2, 0));
    let tipTransformationNode = new TransformationSGNode(tipTransformationMatrix);
    tipTransformationNode.append(new PyramidRenderSGNode());
    bodyTransformationNode.append(tipTransformationNode);

    return rocketNode;
}
