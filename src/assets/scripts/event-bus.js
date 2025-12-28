export class EventBus {
	constructor() {
		this.events = {}
	}

	on(event, handler){
		if (!this.events[event]){
			this.events[event] = []
		}
		this.events[event].push(handler)
	}

	off(event, handler){
		if (!this.events[event]){
			return
		}
		this.events[event].filter(h => h !== handler);
	}

	emit(event, data){
		if (!this.events[event]){
			throw new Error("There is no such event!")
		}
		this.events[event].forEach(handler => handler(data))
	}
}