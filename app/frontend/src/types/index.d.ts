export {};

declare global {
    interface Window {
        onGoogleLibraryLoad: () => void;
    }
}
