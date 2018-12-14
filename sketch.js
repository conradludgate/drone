drones = []
time = undefined

function setup() {
	createCanvas(600, 600);
	drones.push(new Drone());

	time = Date.now();
}

function draw() {
	background(0);

	stroke(255);
	strokeWeight(2);
	ellipse(width/2, height/2, 5);
	for (drone of drones) {
		drone.draw();
	}

	let newtime = Date.now()
	let delta = (newtime - time) / 1000;
	time = newtime;

	for (drone of drones) {
		drone.update(drones, delta);
	}
}