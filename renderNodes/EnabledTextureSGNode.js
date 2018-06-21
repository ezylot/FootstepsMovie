class EnabledTextureSGNode extends AdvancedTextureSGNode {
    constructor(image, children) {
        super(image, children);
    }

    render(context) {
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableObjectTexture'), 1);
        super.render(context);
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableObjectTexture'), 0);
    }
}