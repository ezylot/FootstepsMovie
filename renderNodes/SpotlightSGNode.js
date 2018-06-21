class SpotlightSGNode extends LightSGNode {
    constructor(position, direction, degrees, children) {
        super(position, children);
        this.direction = direction;
        this.degrees = convertDegreeToRadians(degrees);
    }

    render(context) {
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableSpotlight'), 1);
        gl.uniform3fv(gl.getUniformLocation(context.shader, 'u_spotlightPos'), this.position);
        gl.uniform1f(gl.getUniformLocation(context.shader, this.uniform+'.degrees'), this.degrees);
        gl.uniform3fv(gl.getUniformLocation(context.shader, this.uniform+'.direction'), this.direction);
        super.render(context);
        gl.uniform1i(gl.getUniformLocation(context.shader, 'u_enableSpotlight'), 0);
    }

}