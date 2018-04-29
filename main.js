function Movie() {
    this.gl = null;
    this.shaderProgram = null;
    this.rootNode = null;

    this.canvas = document.querySelector('#movieCanvas');

    this.animatedAngle = 0;
    this.fieldOfViewInRadians = convertDegreeToRadians(45);

    this.init = function (resources) {
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        this.shaderProgram = createProgram(this.gl, resources.defaultVS, resources.defaultFS);
        this.rootNode = new RootNode();
    };

    this.render = function (timeInMilliseconds) {
        this.animatedAngle = (timeInMilliseconds / 10) % 360;

        //set background color to light gray
        this.gl.clearColor(0.9, 0.9, 0.9, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.useProgram(this.shaderProgram);

        this.rootNode.render(this.createSceneGraphContext(this.gl, this.shaderProgram));

        window.requestAnimationFrame((timestamp) => this.render(timestamp));
    };

    this.createSceneGraphContext = function (gl, shader) {
        let projectionMatrix = mat4.perspective(mat4.create(), this.fieldOfViewInRadians, this.canvas.width / this.canvas.height, 0.01, 10);
        gl.uniformMatrix4fv(gl.getUniformLocation(shader, 'u_projection'), false, projectionMatrix);

        let eye = vec3.fromValues(0, 3, 5);
        let center = vec3.fromValues(0, 0, 0);
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
    yellow_colorVS: 'shaders/yellowColor.vs.glsl'
}).then(resources => {
    let movie = new Movie();
    movie.init(resources);
    movie.render(performance.now());
});

function convertDegreeToRadians(degree) {
    return degree * Math.PI / 180
}
