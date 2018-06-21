function createRocketNode(movie, resources, sb) {
    let rocketNode = new SGNode();

    rocketNode.setSkyboxTexture = function(tex) {
        skyboxReflectionNode.envtexture = tex;
    };

    let rocketMaterialNode =  new MaterialSGNode();
    let rocketIronTextureNode = new EnabledTextureSGNode(resources.ironImage);
    rocketMaterialNode.append(rocketIronTextureNode);
    rocketNode.append(rocketMaterialNode);

    // Body of rocket
    let bodyTransformationMatrix = mat4.create();
    bodyTransformationMatrix = mat4.multiply(mat4.create(), bodyTransformationMatrix, glm.translate(0, 0.5, 0));
    bodyTransformationMatrix = mat4.multiply(mat4.create(), bodyTransformationMatrix, glm.scale(1, 2, 1));
    let bodyTransformationNode = new TransformationSGNode(bodyTransformationMatrix);

    let bodyNode = new CubeRenderSGNode();
    bodyTransformationNode.append(bodyNode);

    rocketIronTextureNode.append(bodyTransformationNode);

    // mirror window

    var skyboxReflectionNode = new EnvironmentSGNode(sb, 4, true, new CubeRenderSGNode())
    let mirrorWindowTransformationNode = new TransformationSGNode(
        mat4.multiply(mat4.create(), glm.translate(0, 1.8, 1), glm.scale(0.4, 0.4, 0.1)),
        new ShaderSGNode(createProgram(movie.gl, resources.envVS,  resources.envFS),
            skyboxReflectionNode
        )
    );
    rocketNode.append(mirrorWindowTransformationNode);

    // attachments
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

    rocketIronTextureNode.append(rightAttachmentRotationNode);
    rocketIronTextureNode.append(backAttachmentRotationNode);
    rocketIronTextureNode.append(leftAttachmentRotationNode);
    rocketIronTextureNode.append(frontAttachmentRotationNode);

    // Tip of rocket
    let tipTransformationMatrix = bodyTransformationMatrix;
    tipTransformationMatrix = mat4.multiply(mat4.create(), tipTransformationMatrix, glm.translate(0, 2, 0));
    let tipTransformationNode = new TransformationSGNode(tipTransformationMatrix);
    tipTransformationNode.append(new PyramidRenderSGNode());

    let tipMaterialNode =  new MaterialSGNode();
    let tipTextureNode = new EnabledTextureSGNode(resources.tipImage);
    tipMaterialNode.append(tipTextureNode);
    tipTextureNode.append(tipTransformationNode);

    rocketNode.append(tipMaterialNode);

    // lights above tip
    let lightNode = new LightSGNode([0, 0, 0]);
    lightNode.uniform = "u_light2";
    lightNode.diffuse = [1, 0, 0, 1];
    lightNode.specular = [1, 0, 0, 1];

    let lightBall = new MaterialSGNode(new RenderSGNode(makeSphere(0.1, 20, 20)));
    lightBall.diffuse = [193/255, 38/255, 56/255, 1];

    rocketNode.append(
        new TransformationSGNode(tipTransformationMatrix,
            new TransformationSGNode(mat4.multiply(mat4.create(), glm.translate(0, 0.95, 0), glm.scale(1, 0.5, 1)),
                [ lightBall, lightNode ]
            )
        )
    );


    return rocketNode;
}
