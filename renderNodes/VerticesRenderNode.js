class VerticesRenderNode extends ObjectNode {
    render(context) {
        let modelViewMatrix = mat4.multiply(mat4.create(), context.viewMatrix, context.sceneMatrix);
        let gl = context.gl;

        gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_modelView'), false, modelViewMatrix);

        let positionLocation = gl.getAttribLocation(context.shader, 'a_position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);

        let colorLocation = gl.getAttribLocation(context.shader, 'a_color');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colorLocation);

        gl.uniform1f(gl.getUniformLocation(context.shader, 'u_alpha'), this.alpha);

        gl.drawArrays(gl.TRIANGLES, 0, this.verticesCount);

        super.render(context);
    }
}