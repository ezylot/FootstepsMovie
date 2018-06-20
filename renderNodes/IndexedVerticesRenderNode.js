class IndexedVerticesRenderNode extends ObjectNode {

    constructor(verticesBuffer, verticesIndexBuffer, verticesCount) {
        super(verticesBuffer, verticesCount);
        this.verticesIndexBuffer = verticesIndexBuffer;
    }

    render(context) {
        let modelViewMatrix = mat4.multiply(mat4.create(), context.viewMatrix, context.sceneMatrix);
        let gl = context.gl;

        gl.uniformMatrix4fv(gl.getUniformLocation(context.shader, 'u_modelView'), false, modelViewMatrix);

        let positionLocation = gl.getAttribLocation(context.shader, 'a_position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.verticesIndexBuffer);
        gl.drawElements(gl.TRIANGLES, this.verticesCount, gl.UNSIGNED_SHORT, 0);

        super.render(context);
    }
}