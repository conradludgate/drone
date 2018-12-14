drones = []

function setup() {
	createCanvas(600, 600);
	drones.push(new Drone());
}

function draw() {
	background(0);

	stroke(255);
	strokeWeight(2);
	for (drone of drones) {
		drone.draw();
	}
}