export type MainViewMode = 'all' | 'pinned';

class UiStore {
	viewMode = $state<MainViewMode>('all');
	showFaceplate = $state(true);
	showPrintModal = $state(false);

	setViewMode(mode: MainViewMode) {
		this.viewMode = mode;
	}

	toggleFaceplate() {
		this.showFaceplate = !this.showFaceplate;
	}

	openPrintModal() {
		this.showPrintModal = true;
	}

	closePrintModal() {
		this.showPrintModal = false;
	}
}

export const uiStore = new UiStore();

