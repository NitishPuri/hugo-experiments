class ParticleSystem {
    constructor() {
        this.particles = [];
        // this.origin = createVector(x, y);
        // this.img = img_;
    }

    addParticle(x, y, f, img) {
        // this.particles.push(new Particle(this.origin.x, this.origin.y, f,  this.img));
        this.particles.push(new Particle(x, y, f, img));
        // if(random(1) < 0.5) {
        //     this.particles.push(new Particle(this.origin.x, this.origin.y));
        // }
        // else {
        //     this.particles.push(new Confetti(this.origin.x, this.origin.y));            
        // }
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            var p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}
