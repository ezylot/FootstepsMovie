class PyramidRenderSGNode extends RenderSGNode {
    constructor() {
        super({
            position: new Float32Array([
                -0.5,0,-0.5,   // 0 - DLB
                -0.5,0,0.5,    // 1 - DLF
                0.5,0,0.5,     // 2 - DRF
                0.5,0,-0.5,    // 3 - DRF
                0,1,0,      // 4 tip
            ]),
            texture: null,
            normal: null,
            index: new Float32Array([
                0,1,2,  0,2,3,  // Bottom
                4,1,2,          // Front
                4,1,0,          // Left
                4,0,3,          // Back
                4,2,3,          // Right
            ])
        });
    }
}