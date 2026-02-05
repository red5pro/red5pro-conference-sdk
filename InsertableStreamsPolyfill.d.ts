/**
 * Insertable Streams Polyfill Loader
 * Ensures that the required APIs are available before using virtual backgrounds
 */
interface BrowserInfo {
    browser: string;
    version: string;
    userAgent: string;
    nativeSupport: boolean;
    polyfillSupport: boolean;
    anySupport: boolean;
    recommended: boolean;
    notes: string;
}
declare global {
    interface Window {
        MediaStreamTrackProcessor?: typeof MediaStreamTrackProcessor;
        MediaStreamTrackGenerator?: typeof MediaStreamTrackGenerator;
        VideoFrame?: typeof VideoFrame;
    }
}
declare class InsertableStreamsPolyfill {
    private polyfillsLoaded;
    private loadingPromise;
    constructor();
    /**
     * Check if native support is available
     */
    hasNativeSupport(): boolean;
    /**
     * Check if polyfills are already loaded
     */
    hasPolyfillSupport(): boolean;
    /**
     * Check if any support (native or polyfilled) is available
     */
    hasSupport(): boolean;
    /**
     * Load polyfills if needed
     */
    loadPolyfills(): Promise<void>;
    /**
     * Actually load the polyfill scripts
     */
    private _loadPolyfillScripts;
    /**
     * Load a script dynamically
     */
    private _loadScript;
    /**
     * Get browser compatibility information
     */
    getBrowserInfo(): BrowserInfo;
    /**
     * Show browser compatibility warning if needed
     */
    showCompatibilityWarning(): boolean;
}
declare const insertableStreamsPolyfill: InsertableStreamsPolyfill;
export default insertableStreamsPolyfill;
