/**
 * @file pwa.svelte.ts
 * @description Reactive state management for PWA installation and online/offline status
 */

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[];
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed';
		platform: string;
	}>;
	prompt(): Promise<void>;
}

class PwaStore {
	isOnline = $state(true);
	canInstall = $state(false);
	isInstalled = $state(false);
	showInstallModal = $state(false);
	private deferredPrompt: BeforeInstallPromptEvent | null = null;

	init() {
		if (typeof window === 'undefined') return;

		this.isOnline = navigator.onLine;

		window.addEventListener('online', () => {
			this.isOnline = true;
		});

		window.addEventListener('offline', () => {
			this.isOnline = false;
		});

		if (
			window.matchMedia('(display-mode: standalone)').matches ||
			('standalone' in window.navigator &&
				(window.navigator as unknown as { standalone: boolean }).standalone === true)
		) {
			this.isInstalled = true;
		}

		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			this.deferredPrompt = e as BeforeInstallPromptEvent;
			this.canInstall = true;
		});

		window.addEventListener('appinstalled', () => {
			this.isInstalled = true;
			this.canInstall = false;
			this.deferredPrompt = null;
		});
	}

	async promptInstall() {
		if (this.deferredPrompt) {
			try {
				await this.deferredPrompt.prompt();
				const choice = await this.deferredPrompt.userChoice;
				if (choice.outcome === 'accepted') {
					this.isInstalled = true;
					this.canInstall = false;
				}
				this.deferredPrompt = null;
			} catch {
				this.showInstallModal = true;
			}
		} else {
			this.showInstallModal = true;
		}
	}

	openInstallModal() {
		this.showInstallModal = true;
	}

	closeInstallModal() {
		this.showInstallModal = false;
	}
}

export const pwaStore = new PwaStore();
