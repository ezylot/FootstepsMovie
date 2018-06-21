var gl = null;
'use strict';

// This is just for internal testing so we can skip ahead in time
// For example if you set it to 10000 it will start with scene 2
const TIME_OFFSET = 0;

const MANUAL_CAMERA_SPEED = 3; // Sane values are between 1 and 10
const LOOKING_SPEED = 6.1; // Sane values are between 1 and 10
const X_INVERTED = true;
const Y_INVERTED = false;

class Movie {
    constructor() {
        this.canvas = document.querySelector('#movieCanvas');
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        gl = this.gl;
        this.shaderProgram = null;

        this.cameraPosition = null;
        this.cameraTarget = null;

        this.scene1 = new SGNode();
        this.scene2 = new SGNode();
        this.scene3 = new SGNode();
        this.rootNode = null;

        this.fieldOfViewInRadians = convertDegreeToRadians(45);

        this.universumSkyboxTexture = null;
        this.universumSkyboxNode = null;
    }

    init(resources) {
        createHtmlText(this.canvas);
        this.shaderProgram = createProgram(this.gl, resources.defaultVS, resources.defaultFS);
        this.resetCamera();

        (function initUniversumBackground(movie, resources) {
            let gl = movie.gl;
            movie.universumSkyboxTexture = gl.createTexture();

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, movie.universumSkyboxTexture);

            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);

            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.universum_env_pos_x);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.universum_env_neg_x);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.universum_env_pos_y);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.universum_env_neg_y);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.universum_env_pos_z);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resources.universum_env_neg_z);

            gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);

            let environmentBoxNode = new EnvironmentSGNode(movie.universumSkyboxTexture, 4, false, new RenderSGNode(makeSphere(50)));
            let shaderNode = new ShaderSGNode(createProgram(movie.gl, resources.envVS,  resources.envFS));
            shaderNode.append(environmentBoxNode);

            movie.universumSkyboxNode = shaderNode;
        })(this, resources);


        (function initSun(movie){
            let lightNode = new SGNode();
            let lightTranslationNode = new TransformationSGNode(glm.translate(-2, 30, 30));
            lightNode.append(lightTranslationNode);

            let lightSourceNode = new LightSGNode([0, 0, 0]);
            lightSourceNode.ambient = [0, 0, 0, 1];
            lightSourceNode.diffuse = [1, 1, 1, 1];
            lightSourceNode.specular = [1, 1, 1, 1];

            let lightBallNode = new ShaderSGNode(createProgram(gl, resources.simpleLightVS, resources.simpleLightFS), [
                new RenderSGNode(makeSphere(.1,10,10))
            ]);

            lightTranslationNode.append(lightBallNode);
            lightTranslationNode.append(lightSourceNode);

            movie.scene1.append(lightNode);
            movie.scene2.append(lightNode);
            movie.scene3.append(lightNode);
        })(this);

        (function initScene1(movie) {
            // Setup rocket
            let rocket = new MaterialSGNode(
                new EnabledTextureSGNode(
                    resources.universum_env_pos_x,
                    createRocketNode()
                )
            );

            movie.scene1.append(rocket);

            let floor = new MaterialSGNode(
                new EnabledTextureSGNode(
                    resources.grassImage,
                    new RenderSGNode(makeRect(2, 2))
                )
            );

            movie.scene1.append(new TransformationSGNode(glm.transform({ translate: [0,-1.5,0], rotateX: -90, scale: 3}), [
                floor
            ]));

        })(this);

        (function initScene2(movie) {
            movie.scene2.append(movie.universumSkyboxNode);

        })(this);

        (function initScene3(movie) {
            movie.scene3.append(movie.universumSkyboxNode);
        })(this);

    };

    render(timeInMilliseconds) {
        //set background to the color of the background sky
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.useProgram(this.shaderProgram);

        //console.log(timeInMilliseconds);
        if(timeInMilliseconds < 10000) {
            this.gl.clearColor(0.247, 0.647, 1, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            if(this.rootNode !== this.scene1) {
                this.rootNode = this.scene1;
                this.resetCamera();
                displayText("Scene 1");
            }

        } else if(timeInMilliseconds < 20000) {
            // Black background for outer space
            this.gl.clearColor(0,0,0,1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            if(this.rootNode !== this.scene2) {
                this.rootNode = this.scene2;
                this.resetCamera();
                displayText("Scene 2");
            }

        } else {
            // Black background for outer space
            this.gl.clearColor(0,0,0,1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            if(this.rootNode !== this.scene3) {
                this.rootNode = this.scene3;
                this.resetCamera();
                displayText("Scene 3");
            }
        }

        this.rootNode.render(this.createSceneGraphContext(this.gl, this.shaderProgram));
        window.requestAnimationFrame((timestamp) => this.render(TIME_OFFSET + timestamp));
    };

    createSceneGraphContext(gl, shader) {
        let projectionMatrix = mat4.perspective(mat4.create(), this.fieldOfViewInRadians, this.canvas.width / this.canvas.height, 0.01, 100);
        gl.uniformMatrix4fv(gl.getUniformLocation(shader, 'u_projection'), false, projectionMatrix);

        let eye = this.cameraPosition;
        let center = this.cameraTarget;
        let up = vec3.fromValues(0, 1, 0);
        let viewMatrix = mat4.lookAt(mat4.create(), eye, center, up);

        return {
            gl: gl,
            sceneMatrix: mat4.create(),
            viewMatrix: viewMatrix,
            projectionMatrix: projectionMatrix,
            shader: shader,
            invViewMatrix: mat4.invert(mat4.create(), viewMatrix)
        };
    };


    /********** Camera movement *********/

    resetCamera() {
        this.cameraPosition = vec3.fromValues(1, 3, 8)
        this.cameraTarget = vec3.fromValues(0, 2, 0)
    };

    turnCamera(x, y) {
        this.cameraTarget[0] += x;
        this.cameraTarget[1] += y;
    };

    moveCloser() {
        let viewVector = this.calculateViewVector();
        let internalMultiplier = 30;

        this.cameraPosition[0] = this.cameraPosition[0] + MANUAL_CAMERA_SPEED / internalMultiplier * viewVector[0];
        this.cameraPosition[1] = this.cameraPosition[1] + MANUAL_CAMERA_SPEED / internalMultiplier * viewVector[1];
        this.cameraPosition[2] = this.cameraPosition[2] + MANUAL_CAMERA_SPEED / internalMultiplier * viewVector[2];

        this.cameraTarget[0] = this.cameraTarget[0] + MANUAL_CAMERA_SPEED / internalMultiplier *  viewVector[0];
        this.cameraTarget[1] = this.cameraTarget[1] + MANUAL_CAMERA_SPEED / internalMultiplier *  viewVector[1];
        this.cameraTarget[2] = this.cameraTarget[2] + MANUAL_CAMERA_SPEED / internalMultiplier *  viewVector[2];
    };

    moveFurther() {
        let viewVector = this.calculateViewVector();
        let internalMultiplier = 30;

        this.cameraPosition[0] = this.cameraPosition[0] - MANUAL_CAMERA_SPEED / internalMultiplier * viewVector[0];
        this.cameraPosition[1] = this.cameraPosition[1] - MANUAL_CAMERA_SPEED / internalMultiplier * viewVector[1];
        this.cameraPosition[2] = this.cameraPosition[2] - MANUAL_CAMERA_SPEED / internalMultiplier * viewVector[2];

        this.cameraTarget[0] = this.cameraTarget[0] - MANUAL_CAMERA_SPEED / internalMultiplier * viewVector[0];
        this.cameraTarget[1] = this.cameraTarget[1] - MANUAL_CAMERA_SPEED / internalMultiplier * viewVector[1];
        this.cameraTarget[2] = this.cameraTarget[2] - MANUAL_CAMERA_SPEED / internalMultiplier * viewVector[2];
    };

    calculateViewVector() {
        let viewVector = [
            this.cameraTarget[0] - this.cameraPosition[0],
            this.cameraTarget[1] - this.cameraPosition[1],
            this.cameraTarget[2] - this.cameraPosition[2]
        ];
        let length = Math.sqrt(Math.pow(viewVector[0], 2) + Math.pow(viewVector[1], 2) + Math.pow(viewVector[2], 2));

        return [
            viewVector[0] / length,
            viewVector[1] / length,
            viewVector[2] / length
        ];
    }
}

loadResources({
    defaultVS: 'shaders/master.vs.glsl',
    defaultFS: 'shaders/master.fs.glsl',
    envVS: 'shaders/envmap.vs.glsl',
    envFS: 'shaders/envmap.fs.glsl',
    simpleLightVS: 'shaders/simpleLight.vs.glsl',
    simpleLightFS: 'shaders/simpleLight.fs.glsl',

    grassImage: 'textures/grass.jpg',

    universum_env_pos_x: 'textures/skybox/Galaxy_RT.jpg',
    universum_env_neg_x: 'textures/skybox/Galaxy_LT.jpg',
    universum_env_pos_y: 'textures/skybox/Galaxy_DN.jpg',
    universum_env_neg_y: 'textures/skybox/Galaxy_UP.jpg',
    universum_env_pos_z: 'textures/skybox/Galaxy_FT.jpg',
    universum_env_neg_z: 'textures/skybox/Galaxy_BK.jpg'
}).then(resources => {
    let movie = new Movie();
    movie.init(resources);
    movie.render(TIME_OFFSET + performance.now());

    let arrowUpInterval = null;
    let arrowDownInterval = null;

    document.addEventListener('keydown', function(event) {
        // On Space press reset camera to normal position
        if(event.key === ' ' || event.key.toLocaleLowerCase() === 'spacebar') {
            event.preventDefault();
            movie.resetCamera();
        }

        // On Arrow up we fly closer
        if(["arrowup", "w"].includes(event.key.toLowerCase()) && arrowUpInterval == null) {
            arrowUpInterval = setInterval(() => movie.moveCloser(), 10);
        }
        if(["arrowdown", "s"].includes(event.key.toLowerCase()) && arrowDownInterval == null) {
            arrowDownInterval = setInterval(() => movie.moveFurther(), 10);
        }
    });

    document.addEventListener('keyup', function(event) {
        // On Arrow up we fly closer
        if(["arrowup", "w"].includes(event.key.toLowerCase())) {
            if(arrowUpInterval != null) {
                clearInterval(arrowUpInterval);
                arrowUpInterval = null;
            }
        }
        if(["arrowdown", "s"].includes(event.key.toLowerCase())) {
            if(arrowDownInterval != null) {
                clearInterval(arrowDownInterval);
                arrowDownInterval = null;
            }
        }
    });

    let lastSeenAt = {x: null, y: null};
    let canvas = document.querySelector('#movieCanvas');
    let lookEnabled = false;

    document.addEventListener('mousedown', function(event) {
        lastSeenAt = { x: event.clientX, y: event.clientY };
        lookEnabled = true;
    });

    document.addEventListener('mouseup', function() {
        lookEnabled = false;
    });

    document.addEventListener('mousemove', function(event) {
        if(lookEnabled) {
            let xMovement = (event.clientX - lastSeenAt.x) / canvas.width * LOOKING_SPEED;
            let yMovement = (event.clientY - lastSeenAt.y) / canvas.height * LOOKING_SPEED;

            if(X_INVERTED) { xMovement *= -1; }
            if(Y_INVERTED) { yMovement *= -1; }

            movie.turnCamera(xMovement, yMovement);

            lastSeenAt.x = event.clientX;
            lastSeenAt.y = event.clientY;
        }
    });
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
