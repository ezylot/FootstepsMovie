'use strict';

class Movie {
    constructor() {
        this.canvas = document.querySelector('#movieCanvas');
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        this.shaderProgram = null;

        this.scene1 = new SGNode();
        this.scene2 = new SGNode();
        this.scene3 = new SGNode();
        this.rootNode = null;

        this.fieldOfViewInRadians = convertDegreeToRadians(45);

        this.rocketNode = null;
        this.scene1rocketTransformationNode = null;
        this.scene2rocketTransformationNode = null;

    }

    init(resources) {
        this.shaderProgram = createProgram(this.gl, resources.defaultVS, resources.defaultFS);

        // Setup rocket
        (function rocket(movie) {
            // Setup rocket object
            movie.rocketNode = createRocketNode(movie.gl);
        })(this);

        // Setup scene 1
        (function scene1(movie) {
            // Set up the green floor
            let floorTransformationMatrix = mat4.create();
            floorTransformationMatrix = mat4.multiply(mat4.create(), floorTransformationMatrix, glm.scale(2, 0, 2));
            floorTransformationMatrix = mat4.multiply(mat4.create(), floorTransformationMatrix, glm.rotateX(90));

            let floorTransformationNode = new TransformationSGNode(floorTransformationMatrix);
            movie.scene1.append(floorTransformationNode);

            let floorNode = createFloorNode(movie.gl);
            floorTransformationNode.append(floorNode);

            let rocketTransformationMatrix = mat4.create();
            rocketTransformationMatrix = mat4.multiply(mat4.create(), rocketTransformationMatrix, glm.rotateY(30));
            movie.scene1rocketTransformationNode = new TransformationSGNode(rocketTransformationMatrix);

            // Add rocket to scene
            movie.scene1.append(movie.scene1rocketTransformationNode);
            movie.scene1rocketTransformationNode.append(movie.rocketNode);
        })(this);

        // Setup scene 2
        (function scene2(movie) {
            //Set up the earth
            /*let earthTransformationMatrix = mat4.create();
            earthTransformationMatrix = mat4.multiply(mat4.create(), earthTransformationMatrix, glm.scale(2, 0, 2));
            earthTransformationMatrix = mat4.multiply(mat4.create(), earthTransformationMatrix, glm.rotateX(90));
            let earthTransformationNode = new TransformationSGNode(earthTransformationMatrix);
            movie.scene2.append(earthTransformationNode);

            let earthNode = createEarthNode(movie.gl);
            earthTransformationNode.append(earthNode);*/


            let rocketTransformationMatrix = mat4.create();
            rocketTransformationMatrix = mat4.multiply(mat4.create(),rocketTransformationMatrix,glm.translate(-5.5,1,-1))
            rocketTransformationMatrix = mat4.multiply(mat4.create(), rocketTransformationMatrix, glm.rotateY(-20));
            rocketTransformationMatrix = mat4.multiply(mat4.create(), rocketTransformationMatrix, glm.rotateZ(280));
            movie.scene2rocketTransformationNode = new TransformationSGNode(rocketTransformationMatrix);

            // Add rocket to scene
            movie.scene2.append(movie.scene2rocketTransformationNode);
            movie.scene2rocketTransformationNode.append(movie.rocketNode);

        })(this);

        // Setup scene 3
        (function scene3(movie) {
            // movie.scene3.append(.....)
            // movie.scene3.append(movie.rocketNode)
        })(this);

    };

    render(timeInMilliseconds) {
        //set background to the color of the background sky
        this.gl.clearColor(0.247, 0.647, 1, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.useProgram(this.shaderProgram);

        console.log(timeInMilliseconds);
        if(timeInMilliseconds < 10000) {
            this.rootNode = this.scene1;

            // Animation of scene 1
            /*if(timeInMilliseconds > 2000) {
                let rocketTransMatrix = this.scene1rocketTransformationNode.matrix;
                let thrust = (timeInMilliseconds / 1000000) * Math.exp((timeInMilliseconds / 5000));
                rocketTransMatrix = mat4.multiply(mat4.create(), rocketTransMatrix, glm.translate(0, thrust, 0));
                rocketTransMatrix = mat4.multiply(mat4.create(), rocketTransMatrix, glm.rotateY(0.2));
                this.scene1rocketTransformationNode.matrix = rocketTransMatrix;
            }

        } else if(timeInMilliseconds < 20000) {*/
            this.rootNode = this.scene2;

            // Animation of scene 2
                let rocketTransMatrix = this.scene2rocketTransformationNode.matrix;
                let thrust = (timeInMilliseconds / 1000000) * Math.exp((timeInMilliseconds / 5000));
                rocketTransMatrix = mat4.multiply(mat4.create(), rocketTransMatrix, glm.translate(0, thrust, 0));
                rocketTransMatrix = mat4.multiply(mat4.create(), rocketTransMatrix, glm.rotateY(0.2));
                this.scene2rocketTransformationNode.matrix = rocketTransMatrix;
        } else {
            this.rootNode = this.scene3;

            // Animation of scene 3
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