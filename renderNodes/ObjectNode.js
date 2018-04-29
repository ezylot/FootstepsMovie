class ObjectNode extends RootNode {
    constructor(verticesBuffer, colorBuffer, alpha) {
        super();
        this.verticesBuffer = verticesBuffer;
        this.colorBuffer = colorBuffer;
        this.alpha = alpha;
    }
}