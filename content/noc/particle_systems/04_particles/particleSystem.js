function randomInt(val) {
    return int(random(val))
}
class ParticleSystem {
    constructor(x, y, l) {
        this.particles = [];
        this.origin = createVector(x, y);
        this.color = [randomInt(255), randomInt(255), randomInt(255)]        
    }

    addParticle() {
        if (random(1) < 0.5) {
            this.particles.push(new Particle(this.origin.x, this.origin.y, this.color));
        }
        else {
            this.particles.push(new Confetti(this.origin.x, this.origin.y, this.color));
        }
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

    applyForce(f) {
        for (var p of this.particles) {
            p.applyForce(f);
        }
    }

    applyRepeller(r) {
        for (var p of this.particles) {
            p.applyForce(r.repel(p));
        }
    }
}
