interface BackgroundOptions {
    blurAmount?: number;
    imageUrl?: string;
    color?: string;
}
type BackgroundType = 'none' | 'blur' | 'image' | 'color';
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
interface ProcessorStatus {
    isInitialized: boolean;
    isProcessing: boolean;
    backgroundType: BackgroundType;
    hasOriginalTrack: boolean;
    hasProcessedTrack: boolean;
    supportsInsertableStreams: boolean;
    hasMediaPipe: boolean;
    polyfillsLoaded: boolean;
    browserInfo: BrowserInfo;
}
/**
 * Virtual Background Processor using MediaPipe Selfie Segmentation
 * TypeScript version with full type safety
 */
declare class VirtualBackgroundProcessor {
    private selfieSegmentation;
    private canvas;
    private ctx;
    isInitialized: boolean;
    private isProcessing;
    backgroundType: BackgroundType;
    private backgroundImage;
    private backgroundColor;
    private blurAmount;
    private trackProcessor;
    private trackGenerator;
    private transformer;
    private originalVideoTrack;
    private processedVideoTrack;
    private polyfillsLoaded;
    private polyfillLoadingPromise;
    /**
     * Check if Insertable Streams APIs are available (native or polyfilled)
     */
    private _checkInsertableStreamsSupport;
    /**
     * Get browser compatibility information
     */
    private _getBrowserInfo;
    /**
     * Load polyfills if needed
     */
    private _loadPolyfillsIfNeeded;
    /**
     * Load polyfill scripts
     */
    private _loadPolyfillScripts;
    /**
     * Load a script dynamically
     */
    private _loadScript;
    /**
     * Initialize the virtual background processor
     */
    initialize(): Promise<void>;
    /**
     * Set background type and options
     */
    setBackground(type: BackgroundType, options?: BackgroundOptions): void;
    /**
     * Load background image
     */
    private _loadBackgroundImage;
    /**
     * Start processing video track with virtual background
     * Enhanced to better handle track replacement scenarios
     */
    startProcessing(videoTrack: MediaStreamTrack): Promise<MediaStreamTrackGenerator>;
    /**
     * Stop processing and return to original video track
     * Enhanced cleanup to prevent memory leaks
     */
    stopProcessing(): Promise<MediaStreamTrack | null>;
    /**
     * Handle MediaPipe segmentation results
     */
    private _onResults;
    /**
     * Apply blur background effect
     */
    private _applyBlurBackground;
    /**
     * Apply image background effect
     */
    private _applyImageBackground;
    /**
     * Apply color background effect
     */
    private _applyColorBackground;
    /**
     * Get current processing status
     */
    getStatus(): ProcessorStatus;
    /**
     * Cleanup resources
     */
    cleanup(): Promise<void>;
}
export default VirtualBackgroundProcessor;
