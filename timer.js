class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
		//*instance variables for other methods inside of our class if we so choose.
		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}
	start = () => {
		if (this.onStart) {
			this.onStart(this.timeRemaining);
		}
		this.tick();
		this.interval = setInterval(this.tick, 20);
		//*this is a built-in JS funciton.
	};
	tick = () => {
		const timeRemaining = this.timeRemaining;
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.timeRemaining = timeRemaining - 0.02;
			if (this.onTick) {
				this.onTick(this.timeRemaining);
			}
		}
	};
	pause = () => {
		clearInterval(this.interval);
	};
	get timeRemaining() {
		return parseFloat(this.durationInput.value);
		//*the get keyword treats this as an instance variable
		//*parseFloat will pull out the number from a string and return the number
		//*another: parseInt will give us an integer. It gets rid of the number outside of the decimal.
	}
	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}
}
