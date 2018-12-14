class Drone {
	constructor() {
		this.p = createVector(width/2, height/2);
		this.v = createVector();
		this.a = createVector(10, 10);
		this.dir = 0;

		this.frame_mass = 1;

		// Drones have 4 rotors
		// All equidistant from the center of mass for simplicity
		this.rotor_dist = 50;
		this.rotor_size = 40;
		this.rotor_mass = 1; // Assume mass is uniform
		// Front Left, Front Right
		// Back Left, Back Right
		this.rotor_rpm = [0, 0, 0, 0];
	}

	update(drones, delta) {
		this.p.add(p5.Vector.mult(this.v, delta));
		this.v.add(p5.Vector.mult(this.a, delta));

		this.dir += delta * PI;
		this.dir %= 2*PI
	}

	draw() {
		let s = this.rotor_dist * sin(this.dir + PI/4);
		let c = this.rotor_dist * cos(this.dir + PI/4);

		stroke("red"); ellipse(this.p.x - c, this.p.y + s, this.rotor_size);
		stroke("green"); ellipse(this.p.x + c, this.p.y + s, this.rotor_size);
		stroke("blue"); ellipse(this.p.x - c, this.p.y - s, this.rotor_size);
		stroke(255); ellipse(this.p.x + c, this.p.y - s, this.rotor_size);

		s = this.rotor_dist * sin(this.dir);
		c = this.rotor_dist * cos(this.dir);

		let x = this.p.x + c;
		let y = this.p.y + s;

		triangle(x, y, x - 0.1 * c - 0.1 * s, y - 0.1 * s + 0.1 * c, x - 0.1 * c + 0.1 * s, y - 0.1 * s - 0.1 * c);
	}
}