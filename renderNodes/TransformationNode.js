class TransformationNode extends RootNode {
    constructor(matrix) {
        super();
        this.matrix = matrix || mat4.create();
    }

    render(context) {
        var previous = context.sceneMatrix;
        context.sceneMatrix = mat4.multiply(mat4.create(), previous, this.matrix);
        super.render(context);
        context.sceneMatrix = previous;
    }

    setMatrix(matrix) {
        this.matrix = matrix;
    }

    getMatrix() {
        return this.matrix;
    }
}