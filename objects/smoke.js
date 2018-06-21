

//var img = document.getElementById('smoke-particle');

//var c = document.getElementById('canvas');
//var ctx = c.getContext('2d');

//smoke
/*var canvas = document.querySelector('#movieCanvas');
var ctx = canvas.getContext('2d');
var originX = -200;
var originY = -200;
var particleW = 5;
var particleH = 5;
var xSpeed = 0.5;
var ySpeed = 2;
var maxParticles = 50;
var particles = [maxParticles];
setInterval(particleSystem, 33);
function particleSystem(){

    var randXMax = 2;
    var randYMax = 2;
    var growParticles = 1.5;
    growParticles = parseInt(growParticles);
    console.log(growParticles);

    var particle = {
        x: originX,
        y: originY,
        w: particleW,
        h: particleH,
    };

    if(particles.length == maxParticles){
        particles.splice(0, 1);
    } else{
        particles.push(particle);
    }

    for(var i=0; i<particles.length; i++){

        var randX = getRandomInt(0, randXMax);
        var randY = getRandomInt(0, randYMax);

        particles[i].x = (particles[i].x + randX) + xSpeed;
        particles[i].y = (particles[i].y + randY) + ySpeed;

        particles[i].w = particles[i].w + growParticles;
        particles[i].h = particles[i].h + growParticles;

    }

    renderParticles(particles);

}

function renderParticles(particles){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var alpha = 0;
    for(var i=0; i<particles.length; i++){
        var alpha = alpha + (1/maxParticles);
        ctx.globalAlpha = alpha;
        var x = particles[i].x;
        var y = particles[i].y;
        ctx.drawImage(img,-x,-y, particles[i].w, particles[i].h);
    }
    let node = new SGNode(particles);

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}*/
