function createMoon(gl) {

    let moonTransformationMatrix = mat4.create();
    moonTransformationMatrix = mat4.multiply(mat4.create(), moonTransformationMatrix, glm.scale(32, 8, 8));
    let moonTranformationNode = new TransformationSGNode(moonTransformationMatrix);

    moonTranformationNode.append(createCube(gl, [0.5, 0.5, 0.5]));

    return moonTranformationNode;
}