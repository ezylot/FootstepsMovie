function getPedestal(gl) {
    let pedestalNode = new SGNode();
    pedestalNode.append(createCube(gl, [ 0.1, 0.1, 0.1 ]));
    return pedestalNode
}