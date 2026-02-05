import VirtualBackgroundProcessor from './VirtualBackgroundProcessor';
interface MediaConstraintsConfig {
    video: MediaTrackConstraints | boolean;
    audio: MediaTrackConstraints | boolean;
}
interface DevicePermissions {
    camera: PermissionState;
    microphone: PermissionState;
}
interface DeviceList {
    audioInputs: MediaDeviceInfo[];
    videoInputs: MediaDeviceInfo[];
    audioOutputs: MediaDeviceInfo[];
}
interface VirtualBackgroundStatus {
    isEnabled: boolean;
    [key: string]: any;
}
interface VirtualBackgroundOptions {
    [key: string]: any;
}
interface WHIPClient {
    getPeerConnection(): RTCPeerConnection;
}
declare class MediaStreamManager {
    private originalMediaStream;
    private currentMediaStream;
    dummyVideoStream: MediaStream | null;
    private screenShareStream;
    private currentAudioDeviceId;
    private currentVideoDeviceId;
    private audioContext;
    private gainNode;
    private highpassFilter;
    private rnnoiseEnabled;
    publisherName: string;
    private isVideoMuted;
    private isAudioMuted;
    blackFrameCanvas: HTMLCanvasElement | null;
    private blackFrameTimer;
    virtualBackgroundProcessor: VirtualBackgroundProcessor;
    private isVirtualBackgroundEnabled;
    private processedStream;
    private readonly defaultConstraints;
    constructor();
    /**
     * Initialize virtual background processor
     */
    initializeVirtualBackground(): Promise<void>;
    /**
     * Enable virtual background with specified type and options
     * Enhanced to properly track current video track
     */
    enableVirtualBackground(type: string, options?: VirtualBackgroundOptions, whipClient?: WHIPClient | null): Promise<void>;
    /**
     * Disable virtual background
     * Fixed to handle cases where original track is no longer valid
     */
    disableVirtualBackground(whipClient?: WHIPClient | null): Promise<void>;
    /**
     * Change virtual background without disabling
     */
    changeVirtualBackground(type: string, options?: VirtualBackgroundOptions): Promise<void>;
    /**
     * Get virtual background status
     */
    getVirtualBackgroundStatus(): VirtualBackgroundStatus;
    getMediaConstraints(audio?: boolean, video?: boolean): MediaConstraintsConfig;
    getMediaStream(audio?: boolean, video?: boolean, useBasicConstraints?: boolean): Promise<MediaStream>;
    /**
     * Replace video track
     */
    replaceVideoTrack(whipClient: WHIPClient, newVideoTrack: MediaStreamTrack): Promise<void>;
    updateLocalStreamVideoTrack(newVideoTrack: MediaStreamTrack): void;
    /**
     * Replace audio track
     */
    replaceAudioTrack(whipClient: WHIPClient, newAudioTrack: MediaStreamTrack): Promise<void>;
    updateLocalStreamAudioTrack(newAudioTrack: MediaStreamTrack): void;
    applyRNNoiseProcessing: (inputStream: MediaStream) => Promise<MediaStream>;
    getCurrentStream(): MediaStream | null;
    setOriginalStream(mediaStream: MediaStream): void;
    getOriginalStream(): MediaStream | null;
    setScreenShareStream(mediaStream: MediaStream): void;
    getScreenShareStream(): MediaStream | null;
    checkPermissions(): Promise<DevicePermissions>;
    getDeviceList(): Promise<DeviceList>;
    switchAudioDeviceWithTrackReplacement(audioDeviceId: string, whipClient: WHIPClient | null): Promise<MediaStream | null>;
    switchVideoDeviceWithTrackReplacement(videoDeviceId: string, whipClient: WHIPClient | null): Promise<MediaStream | null>;
    /**
     * Set current stream and apply noise suppression if enabled
     * This method should be used instead of directly setting currentMediaStream
     */
    setCurrentStream(mediaStream: MediaStream): void;
    /**
     * Update current stream with a new video track while preserving audio
     * Useful when replacing video tracks without affecting audio processing
     */
    updateCurrentStreamVideoTrack(newVideoTrack: MediaStreamTrack): void;
    initializeBlackFrameCanvas(): void;
    createDummyVideoStream(): MediaStream;
    startBlackFrameTimer(): void;
    stopBlackFrameTimer(): void;
    cleanupCurrentMediaStream(): void;
    cleanupMediaStreams(): Promise<void>;
    private _stopCurrentTracks;
    setAudioMuted(muted: boolean): void;
    setVideoMuted(muted: boolean): void;
}
export default MediaStreamManager;
