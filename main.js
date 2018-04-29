'use strict';

class Movie {
    constructor() {
        this.canvas = document.querySelector('#movieCanvas');
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        this.shaderProgram = null;
        this.rootNode = new RootNode();
        this.fieldOfViewInRadians = convertDegreeToRadians(45);

        this.rocketNode = null;
        this.rocketTransformationNode = null;
    }

    init(resources) {
        this.shaderProgram = createProgram(this.gl, resources.defaultVS, resources.defaultFS);

        // Set up the green floor
        let floorTransformationMatrix = mat4.create();
        floorTransformationMatrix = mat4.multiply(mat4.create(), floorTransformationMatrix, glm.scale(2, 0, 2));
        floorTransformationMatrix = mat4.multiply(mat4.create(), floorTransformationMatrix, glm.rotateX(90));

        let floorTransformationNode = new TransformationNode(floorTransformationMatrix);
        this.rootNode.append(floorTransformationNode);

        let floorNode = createFloorNode(this.gl);
        floorTransformationNode.append(floorNode);


        // Setup rocket object
        let rocketTransformationMatrix = mat4.create();
        rocketTransformationMatrix = mat4.multiply(mat4.create(), rocketTransformationMatrix, glm.rotateY(30));

        this.rocketTransformationNode = new TransformationNode(rocketTransformationMatrix);
        this.rootNode.append(this.rocketTransformationNode);

        let rocketColorNode = new ShaderNode(createProgram(this.gl, resources.defaultVS, resources.defaultFS));
        this.rocketTransformationNode.append(rocketColorNode);

        this.rocketNode = createRocketNode(this.gl);
        rocketColorNode.append(this.rocketNode);
    };

    render(timeInMilliseconds) {
        //set background to the color of the background sky
        this.gl.clearColor(0.247, 0.647, 1, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.useProgram(this.shaderProgram);


        if(timeInMilliseconds > 2000) {
            let rocketTransMatrix = this.rocketTransformationNode.getMatrix();
            let thrust = (timeInMilliseconds / 1000000) * Math.exp((timeInMilliseconds / 5000));
            rocketTransMatrix = mat4.multiply(mat4.create(), rocketTransMatrix, glm.translate(0, thrust, 0));
            rocketTransMatrix = mat4.multiply(mat4.create(), rocketTransMatrix, glm.rotateY(0.2));
            this.rocketTransformationNode.setMatrix(rocketTransMatrix);
        }

        this.rootNode.render(this.createSceneGraphContext(this.gl, this.shaderProgram));

        window.requestAnimationFrame((timestamp) => this.render(timestamp));
    };

    createSceneGraphContext(gl, shader) {
        let projectionMatrix = mat4.perspective(mat4.create(), this.fieldOfViewInRadians, this.canvas.width / this.canvas.height, 0.01, 20);
        gl.uniformMatrix4fv(gl.getUniformLocation(shader, 'u_projection'), false, projectionMatrix);

        let eye = vec3.fromValues(1, 3, 8);
        let center = vec3.fromValues(0, 2, 0);
        let up = vec3.fromValues(0, 1, 0);
        let viewMatrix = mat4.lookAt(mat4.create(), eye, center, up);

        return {
            gl: gl,
            sceneMatrix: mat4.create(),
            viewMatrix: viewMatrix,
            projectionMatrix: projectionMatrix,
            shader: shader
        };
    };
}

loadResources({
    defaultVS: 'shaders/simple.vs.glsl',
    defaultFS: 'shaders/simple.fs.glsl',
}).then(resources => {
    let movie = new Movie();
    movie.init(resources);
    movie.render(performance.now());
});

function convertDegreeToRadians(degree) {
    return degree * Math.PI / 180
}

function repeat(array, n) {
    let repeated = [];
    for(let i = 0; i < n; i++) {
        repeated = repeated.concat(array);
    }
    return repeated;
}