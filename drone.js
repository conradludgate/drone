class Drone {
	constructor() {
		this.orbit_r = 100;
		this.orbit_o = createVector(width/2, height/2);

		this.p = createVector(this.orbit_r, 0);
		this.p.add(this.orbit_o);
		
		this.v = createVector(0, -this.orbit_r);
		this.a = createVector(-this.orbit_r, 0);

		this.dir = PI;

		this.frame_mass = 1;

		// Drones have 4 rotors
		// All equidistant from the center of mass for simplicity
		this.rotor_dist = 10;
		this.rotor_size = 9;
		this.rotor_mass = 1; // Assume mass is uniform
		// Front Left, Front Right
		// Back Left, Back Right
		this.rotor_rpm = [0, 0, 0, 0];
	}

	update(drones, delta) {
		this.p.add(p5.Vector.mult(this.v, delta));
		this.v.add(p5.Vector.mult(this.a, delta));

		this.a = p5.Vector.sub(this.orbit_o, this.p);
		this.dir = this.a.heading();

		// this.dir += delta * PI * 0.25;
		// this.dir %= 2*PI
	}

	draw() {
		let s = this.rotor_dist * sin(this.dir + PI/4);
		let c = this.rotor_dist * cos(this.dir + PI/4);

		ellipse(this.p.x + s, this.p.y - c, this.rotor_size);
		ellipse(this.p.x + c, this.p.y + s, this.rotor_size);
		ellipse(this.p.x - c, this.p.y - s, this.rotor_size);
		ellipse(this.p.x - s, this.p.y + c, this.rotor_size);

		s = this.rotor_dist * sin(this.dir);
		c = this.rotor_dist * cos(this.dir);

		let x = this.p.x + c;
		let y = this.p.y + s;

		triangle(x, y, x - 0.1 * c - 0.1 * s, y - 0.1 * s + 0.1 * c, x - 0.1 * c + 0.1 * s, y - 0.1 * s - 0.1 * c);
	}
}