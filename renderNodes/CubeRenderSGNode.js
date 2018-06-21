class CubeRenderSGNode extends RenderSGNode {
    constructor() {
        super({
            position: new Float32Array([
                // DOWN
                -1,-1,1,
                1,-1,1,
                1,-1,-1,
                -1,-1,-1,

                // UP
                -1,1,1,
                1,1,1,
                1,1,-1,
                -1,1,-1,

                // FRONT
                -1,-1,1,
                1,-1,1,
                1,1,1,
                -1,1,1,

                // BACK
                -1,-1,-1,
                1,-1,-1,
                1,1,-1,
                -1,1,-1,

                // LEFT
                -1,-1,1,
                -1,1,1,
                -1,1,-1,
                -1,-1,-1,

                // RIGHT
                1,-1,1,
                1,1,1,
                1,1,-1,
                1,-1,-1,
            ]),
            texture: new Float32Array([
                0,0,    1,0,    1,1,    0,1,
                0,0,    1,0,    1,1,    0,1,
                0,0,    1,0,    1,1,    0,1,
                0,0,    1,0,    1,1,    0,1,
                0,0,    1,0,    1,1,    0,1,
                0,0,    1,0,    1,1,    0,1,
            ]),
            normal: new Float32Array([
                // Facing down
                0,-1,0,
                0,-1,0,
                0,-1,0,
                0,-1,0,
                // Facing up
                0,1,0,
                0,1,0,
                0,1,0,
                0,1,0,
                // Facing towards you
                0,0,1,
                0,0,1,
                0,0,1,
                0,0,1,
                // Facing away from you
                0,0,-1,
                0,0,-1,
                0,0,-1,
                0,0,-1,
                // Facing left
                -1,0,0,
                -1,0,0,
                -1,0,0,
                -1,0,0,
                // Facing right
                1,0,0,
                1,0,0,
                1,0,0,
                1,0,0,
            ]),
            index: new Float32Array([
                0,1,2,  0,2,3,   //DOWN
                4,5,6,  4,6,7,    //UP
                8,9,10,  8,10,11,    //FACING FRONT
                12,13,14,  12,14,15,    //FACING BACK
                16,17,18,  16,18,19,    //FACING LEFT
                20,21,22,  20,22,23,    //FACING RIGHT
            ])
        });
    }
}