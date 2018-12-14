drones = []

function setup() {
	createCanvas(600, 600);
	drones.push(new Drone());
}

function draw() {
	background(0);

	for (drone of drones) {
		drone.draw();
	}
}