class ShaderSceneGraphNode extends RootNode {
    constructor(shader) {
        super();
        this.shader = shader;
    }

    render(context) {
        let backup = context.shader;
        context.shader = this.shader;
        context.gl.useProgram(this.shader);

        gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_projection'), false, context.projectionMatrix);
        super.render(context);

        context.shader = backup;
        context.gl.useProgram(backup);
    }
}