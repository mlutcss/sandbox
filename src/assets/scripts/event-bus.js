export class EventBus {
	events = {};

	on(event, handler) {
		if (this.events[event] == undefined) {
			this.events[event] = [];
		}

		this.events[event].push(handler);
	}

	off(event, handler) {
		if (this.events[event] == undefined) {
			return;
		}

		this.events[event] = this.events[event].filter((h) => h !== handler);
	}

	emit(event, data) {
		if (this.events[event] == undefined) {
			throw new Error('There is no such event!');
		}

		this.events[event].forEach((handler) => handler(data));
	}
}
