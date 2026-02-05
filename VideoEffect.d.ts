import "@mediapipe/selfie_segmentation";
interface SegmentationResults {
    image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;
    segmentationMask: HTMLCanvasElement | ImageData;
}
interface SelfieSegmentationOptions {
    selfieMode: boolean;
    modelSelection: number;
}
interface SelfieSegmentationConfig {
    locateFile: (file: string) => string;
}
declare class SelfieSegmentation {
    constructor(config: SelfieSegmentationConfig);
    setOptions(options: SelfieSegmentationOptions): void;
    onResults(callback: (results: SegmentationResults) => void): void;
    send(input: {
        image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;
    }): Promise<void>;
}
export declare class VideoEffect {
    #private;
    static readonly VIRTUAL_BACKGROUND = "virtual-background";
    static readonly BLUR_BACKGROUND = "blur-background";
    static readonly NO_EFFECT = "no-effect";
    static readonly LOCATE_FILE_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation";
    selfieSegmentation: SelfieSegmentation | null;
    effectCanvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    rawLocalVideo: HTMLVideoElement;
    canvasStream: MediaStream | null;
    backgroundBlurRange: number;
    edgeBlurRange: number;
    effectName: string;
    startTime: number;
    statTimerId: number;
    renderedFrameCount: number;
    lastRenderedFrameCount: number;
    effectCanvasFPS: number;
    videoCallbackPeriodMs: number;
    effectStreams: MediaStream[];
    isProcessingActive: boolean;
    isInitialized: boolean;
    constructor();
    init(stream: MediaStream): Promise<MediaStream>;
    setRawLocalVideo(stream: MediaStream): Promise<void>;
    createEffectCanvas(width: number, height: number): HTMLCanvasElement;
    initializeSelfieSegmentation(): void;
    set virtualBackgroundImage(imageElement: HTMLImageElement | null);
    startFpsCalculation(): void;
    stopFpsCalculation(): void;
    processFrame(): Promise<void>;
    setBlurEffectRange(backgroundBlurRange: number, edgeBlurRange: number): void;
    enableEffect(effectName: string): Promise<void>;
    drawSegmentationMask(segmentation: HTMLCanvasElement | ImageData): void;
    onResults(results: SegmentationResults): void;
    drawImageDirectly(image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement): void;
    drawVirtualBackground(image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement, segmentation: HTMLCanvasElement | ImageData, virtualBackgroundImage: HTMLImageElement): void;
    drawBlurBackground(image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement, segmentation: HTMLCanvasElement | ImageData, blurAmount: number): void;
    turnOffCamera(): void;
    turnOnCamera(_streamId?: string): Promise<void | null>;
}
export {};
