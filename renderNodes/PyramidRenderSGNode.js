class PyramidRenderSGNode extends RenderSGNode {
    constructor() {
        super({
            position: new Float32Array([
                // Bottom
                -1,-1,1,
                1,-1,1,
                1,-1,-1,
                -1,-1,-1,

                // Front
                -1,-1,1,
                1,-1,1,
                0,1,0,

                // Back
                1,-1,-1,
                -1,-1,-1,
                0,1,0,

                // Left
                -1,-1,-1,
                -1,-1,1,
                0,1,0,

                // Right
                1,-1,1,
                1,-1,-1,
                0,1,0,
            ]),
            texture: new Float32Array([
                0,0,    1,0,    1,1,    0,1, // Bottom
                0,0,    1,0,    0.5, 0.5,   // Front
                1,1,    0,1,    0.5, 0.5,   // Back
                0,1,    0,0,    0.5, 0.5,   // Left
                1,0,    1,1,    0.5, 0.5,   // Right
            ]),
            normal: new Float32Array([
                // Down
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,

                // front
                0, 1, 1,
                0, 1, 1,
                0, 1, 1,

                // back
                0, 1, -1,
                0, 1, -1,
                0, 1, -1,

                // left
                -1, 1, 0,
                -1, 1, 0,
                -1, 1, 0,

                // right
                1, 1, 0,
                1, 1, 0,
                1, 1, 0,
            ]),
            index: new Float32Array([
                0,1,2,  0,2,3,  // Bottom
                4,5,6,          // Front
                1,8,9,          // Left
                10,11,12,          // Back
                13,14,15,          // Right
            ])
        });
    }
}