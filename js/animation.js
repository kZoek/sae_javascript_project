const speed = 0.2;
const expansion = 0.75;
const repeat = 50;
const timeOut = 200;
const duration = 70;
const totalDurationInMs = 5000;

let start = null;
let counter = 0;
let containers = [];


function doVortex() {
    createFirstParticle();
    requestAnimationFrame(update);
    setTimeout(function () {
        let vortex = document.getElementById('vortex');
        while (vortex.lastElementChild)
            vortex.removeChild(vortex.lastElementChild);
    }, totalDurationInMs);
}

function update() {
    if(Date.now() > start + timeOut) {
        addContainer();
        start = Date.now();
    }
    containers.forEach(con => {
        var t = con.getT();
        if(t < duration) {
            var tag = con.getTag();
            var xPos = tag.position().left + x(t);
            var yPos = tag.position().top + y(t);
            tag.css({'left':xPos + 'px'});
            tag.css({'top':yPos + 'px'});
            con.incT();
        } else {
            containers.splice(containers.indexOf(con), 1)
        }
    });
    if(containers.length > 0) {
        requestAnimationFrame(update);
    }
}

function addContainer() {
    if(counter < repeat) {
        counter++;
        var tag = $('#movingContainer').clone();
        tag.attr('id', 'moving' + counter);
        $('#vortex').append(tag);
        containers.push(new MovingContainer(tag));
    } else {
        $('#movingContainer').remove();
    }
}

function createFirstParticle(){
    let particle = `<div class="startPos" id="movingContainer">
    <img src="bilder/question.png"  alt="placeholder">
</div>`
    $('#vortex').append(particle);
    start = null;
    counter = 0;
    containers = [];
}

function x(t) {
    return expansion * t * Math.cos(t);
}

function y(t) {
    return expansion * t * Math.sin(t);
}

class MovingContainer {
    constructor(tag) {
        this.tag = tag;
        this.t = 0;
    }

    getTag() {
        return this.tag;
    }

    getT() {
        return this.t;
    }

    incT() {
        this.t += speed;
    }
}