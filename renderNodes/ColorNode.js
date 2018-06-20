class ColorNode extends SGNode {

    constructor(colorBuffer, alpha, children) {
        super(children);
        this.alpha = alpha;
        this.colorBuffer = colorBuffer;
    }

    render(context) {
        let gl = context.gl;

        let colorLocation = gl.getAttribLocation(context.shader, 'a_color');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colorLocation);

        gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), this.alpha);

        super.render(context);
    }
}
