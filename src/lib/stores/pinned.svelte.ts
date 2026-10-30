const STORAGE_KEY = 'sp404mk2-pinned-tips-v1';
const isBrowser = typeof window !== 'undefined';

class PinnedStore {
	ids = $state<string[]>([]);

	constructor() {
		if (isBrowser) {
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				if (raw) {
					const parsed = JSON.parse(raw);
					if (Array.isArray(parsed)) {
						this.ids = parsed;
					}
				}
			} catch {
				// Ignore storage access errors
			}
		}
	}

	private save() {
		if (isBrowser) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids));
			} catch {
				// Ignore storage write errors
			}
		}
	}

	has(id: string): boolean {
		return this.ids.includes(id);
	}

	toggle(id: string) {
		if (this.ids.includes(id)) {
			this.ids = this.ids.filter((item) => item !== id);
		} else {
			this.ids = [...this.ids, id];
		}
		this.save();
	}

	clear() {
		this.ids = [];
		this.save();
	}
}

export const pinnedStore = new PinnedStore();
