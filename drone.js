class Drone {
	constructor() {
		this.p = createVector(width/2 + 100, height/2);
		this.v = createVector(0, 0)	;
		this.dir = PI;

		this.frame_mass = 1;
		this.drag = 0.25;

		// Drones have 4 rotors
		// All equidistant from the center of mass for simplicity
		this.rotor_dist = 10;
		this.rotor_size = 9;
		this.rotor_mass = 1; // Assume mass is uniform
		this.rotor_thrust = 0.05; // Mass lifted with 1 rps
		this.rotor_max_rps = 500;

		// Front Left, Front Right
		// Back Left, Back Right
		// Front Left & Back Right - Clockwise
		// Front Right & Back Left - Anticlockwise
		this.rotor_rps = [0, 0, 0, 0];

		this.total_mass = 4 * this.rotor_mass + this.frame_mass;

		this.control(100, 3 * PI / 2, 0.01);

		this.debug = false;
	}

	update(drones, delta) {
		this.p.add(p5.Vector.mult(this.v, delta));

		// for (let rotor of this.rotor_rps) {
		// 	rotor = max(min(rotor, this.rotor_max_rps), -this.rotor_max_rps);
		// }

		let net_rps = this.rotor_rps[0] - this.rotor_rps[1] -
					  this.rotor_rps[2] + this.rotor_rps[3];

		// Currently does not take into account the tilt of the drone
		let net_force = createVector(
			- this.rotor_rps[0] - this.rotor_rps[1]  // Front
			+ this.rotor_rps[2] + this.rotor_rps[3], // Back
			+ this.rotor_rps[0] - this.rotor_rps[1]  // Front
			+ this.rotor_rps[2] - this.rotor_rps[3], // Back
		); // Left                Right

		net_force.mult(this.rotor_thrust);
		net_force.rotate(this.dir);
		net_force.add(p5.Vector.mult(this.v, this.drag)); // Air Resistance

		if (this.debug) {
			console.log(net_force);
			console.log(net_rps);
		}

		this.v.add(p5.Vector.mult(net_force, delta / this.total_mass));
		this.dir += 2 * PI * delta * net_rps;
	}

	// r is the desired speed
	// theta is the angle to travel at
	// rps is the desired rotations per second of the drone (+ve for acw, -ve for cw)
	control(r, theta, rps) {
		let upwards = this.total_mass / this.rotor_thrust;

		r = 100 * r / upwards / 3;

		let rc = r * cos(theta) / this.rotor_thrust;
		let rs = r * sin(theta) / this.rotor_thrust;
		this.rotor_rps = [
			(upwards + rc + rs - rps) / 4,
			(upwards + rc - rs + rps) / 4,
			(upwards - rc + rs + rps) / 4,
			(upwards - rc - rs - rps) / 4
		];
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