class AlphaOverrideSGNode extends SetUniformSGNode {
    constructor(alpha, children) {
        super('u_enableAlphaOverride', 1, children);
        this.newAlpha = alpha;
    }

    render(context) {
        gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), this.newAlpha);
        super.render(context);
        gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), 1.0);
    }
}