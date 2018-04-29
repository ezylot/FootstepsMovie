class ObjectNode extends RootNode {
    constructor(verticesBuffer, verticesCount, colorBuffer, alpha) {
        super();
        this.verticesBuffer = verticesBuffer;
        this.verticesCount = verticesCount;
        this.colorBuffer = colorBuffer;
        this.alpha = alpha;
    }
}