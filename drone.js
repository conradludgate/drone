class Drone {
	constructor() {
		this.p = createVector();
		this.v = createVector();
		this.a = createVector(1, 1);
		this.dir = 0;

		this.frame_mass = 1;

		// Drones have 4 rotors
		// All equidistant from the center of mass for simplicity
		this.rotor_dist = 5;
		this.rotor_size = 4;
		this.rotor_mass = 1; // Assume mass is uniform
		// Front Left, Front Right
		// Back Left, Back Right
		this.rotor_rpm = [0, 0, 0, 0];
	}

	update(delta) {
		this.p.add(p5.Vector.mul(this.v, delta));
		this.v.add(p5.Vector.mul(this.a, delta));

		this.dir += delta * PI;
	}

	draw() {
		s = this.rotor_dist * sin(this.dir + PI/4);
		c = this.rotor_dist * cos(this.dir + PI/4);

		ellipse(this.p.x - c, this.p.y + s, this.rotor_size);
		ellipse(this.p.x + c, this.p.y + s, this.rotor_size);
		ellipse(this.p.x - c, this.p.y - s, this.rotor_size);
		ellipse(this.p.x + c, this.p.y - s, this.rotor_size);

		s = this.rotor_dist * sin(this.dir);
		c = this.rotor_dist * cos(this.dir);

		x = this.p.x + c;
		y = this.p.y + s;

		triangle(x, y, x - 0.1 * c - 0.1 * s, y - 0.1 * s + 0.1 * c, x - 0.1 * c + 0.1 * s, y - 0.1 * s - 0.1 * c);
	}
}