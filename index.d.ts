import { WHEPClient } from 'red5pro-webrtc-sdk';

/**
 * Manual WebRTC Stats Collector and Issue Detection System
 */
interface MonitorThresholds {
    packetLossPercent: number;
    highRtt: number;
    highJitter: number;
    lowBitrate: number;
    freezeThreshold: number;
    audioLevelSilence: number;
}
interface MonitorConfig {
    pollingInterval: number;
    historySize: number;
    thresholds: MonitorThresholds;
}
interface MonitorOptions {
    pollingInterval?: number;
    historySize?: number;
    packetLossThreshold?: number;
    rttThreshold?: number;
    jitterThreshold?: number;
    bitrateThreshold?: number;
    freezeThreshold?: number;
    silenceThreshold?: number;
    thresholds?: Partial<MonitorThresholds>;
}
interface VideoOutboundStats {
    bytesSent: number;
    packetsSent: number;
    packetsLost: number;
    framesSent: number;
    framesPerSecond: number;
    frameWidth: number;
    frameHeight: number;
    targetBitrate: number;
    encoderImplementation?: string;
    qualityLimitationReason?: string;
    totalPacketSendDelay: number;
    retransmittedPacketsSent: number;
}
interface AudioOutboundStats {
    bytesSent: number;
    packetsSent: number;
    packetsLost: number;
    targetBitrate: number;
    totalAudioEnergy: number;
    totalSamplesDuration: number;
}
interface VideoInboundStats {
    bytesReceived: number;
    packetsReceived: number;
    packetsLost: number;
    framesReceived: number;
    framesDecoded: number;
    framesDropped: number;
    framesPerSecond: number;
    frameWidth: number;
    frameHeight: number;
    jitter: number;
    decoderImplementation?: string;
    totalDecodeTime: number;
    totalFramesDuration: number;
}
interface AudioInboundStats {
    bytesReceived: number;
    packetsReceived: number;
    packetsLost: number;
    jitter: number;
    totalAudioEnergy: number;
    totalSamplesDuration: number;
    totalSamplesReceived: number;
}
interface CandidatePair {
    id: string;
    rtt: number;
    bytesSent: number;
    bytesReceived: number;
    totalRtt: number;
    responses: number;
}
interface TransportStats {
    bytesSent: number;
    bytesReceived: number;
    packetsSent: number;
    packetsReceived: number;
}
interface CodecInfo {
    mimeType: string;
    payloadType: number;
    clockRate: number;
}
interface ParsedStats {
    outboundVideo: VideoOutboundStats | null;
    outboundAudio: AudioOutboundStats | null;
    inboundVideo: VideoInboundStats | null;
    inboundAudio: AudioInboundStats | null;
    candidatePairs: CandidatePair[];
    transport: TransportStats | null;
    codecs: CodecInfo[];
}
interface ConnectionStats extends ParsedStats {
    timestamp: number;
    connectionId: string;
    connectionType: string;
}
interface HistoricalStats extends ParsedStats {
    timestamp: number;
}
interface ConnectionInfo {
    id: string;
    pc: RTCPeerConnection;
    type: string;
    metadata: Record<string, any>;
    addedAt: number;
    lastStatsTime: number;
    consecutiveFailures: number;
}
interface ConnectionAnalysis {
    connectionId: string;
    connectionType: string;
    packetLossPercent: number;
    bitrate: number;
    rtt: number;
    jitter: number;
    framesPerSecond: number;
    quality: number;
}
interface OverallAnalysis {
    totalConnections: number;
    activeConnections: number;
    totalPacketLoss: number;
    averageRtt: number;
    totalBitrate: number;
}
interface StatsAnalysis {
    timestamp: number;
    connections: Record<string, ConnectionAnalysis>;
    overall: OverallAnalysis;
}
type IssueSeverity = 'warning' | 'critical';
type IssueType = 'network' | 'media';
type IssueReason = 'high-packet-loss' | 'high-rtt' | 'high-jitter' | 'video-freeze' | 'audio-silence';
interface Issue {
    type: IssueType;
    reason: IssueReason;
    severity: IssueSeverity;
    connectionId: string;
    timestamp: number;
    description: string;
    value?: number;
    threshold?: number;
}
type QualityLevel = 'unknown' | 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
interface ConnectionQuality {
    quality: number;
    packetLoss: number;
    bitrate: number;
    rtt: number;
    jitter: number;
}
interface NetworkQualitySummary {
    overall: QualityLevel;
    connections: Record<string, ConnectionQuality>;
    issues: number;
    timestamp: number;
}
interface DetailedConnectionStats {
    current: ConnectionStats | undefined;
    history: HistoricalStats[] | undefined;
    info: ConnectionInfo | undefined;
}

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

interface ConferenceConfig {
    host: string;
    nodeGroup?: string;
    iceServers?: RTCIceServer[];
    reconnectionEnabled?: boolean;
    maxReconnectionAttempts?: number;
    reconnectionDelay?: number;
    maxVideoBitrateKbps?: number;
    reconnectionDelayMax?: number;
    reconnectionDelayMultiplier?: number;
    joinResponseTimeout?: number;
    statsPollingInterval?: number;
    statsHistorySize?: number;
    packetLossThreshold?: number;
    rttThreshold?: number;
    jitterThreshold?: number;
    bitrateThreshold?: number;
    statsThresholds?: Record<string, number>;
    pubnubPublishKey?: string;
    pubnubSubscribeKey?: string;
    analyticsEndpoint?: string | null | undefined;
}
interface User {
    uid: string;
    online: boolean;
    videoEnabled?: boolean;
    audioEnabled?: boolean;
    metaData?: any;
    [key: string]: any;
}
interface SubscriberInfo {
    subscriber: any;
    user: User;
    mediaStream: MediaStream | null;
    audioMonitor?: AudioMonitor;
}
interface FileType {
    id: string;
    name: string;
    url: string | null | undefined;
}
interface AudioLevel {
    rms: number;
    db: number;
    normalized: number;
}
interface AudioMonitor {
    getLevel: () => AudioLevel;
    audioContext: AudioContext;
    analyser: AnalyserNode;
    cleanup: () => void;
}
interface FileMetadata {
    name: string;
    size: number;
    type: string;
}
interface SendFileResult {
    timetoken: string;
    name: string;
    id: string;
    url?: string;
}
/**
 * Red5 Pro Conference SDK
 */
declare class ConferenceClient extends EventTarget {
    private statsMonitor;
    mediaStreamManager: MediaStreamManager;
    config: Required<Omit<ConferenceConfig, 'maxVideoBitrateKbps' | 'statsThresholds'>> & {
        maxVideoBitrateKbps?: number;
        statsThresholds?: Record<string, number>;
    };
    private audioLevelTimers;
    private isJoined;
    private isPublishing;
    private publisher;
    subscribers: Map<string, SubscriberInfo>;
    private roomUsers;
    private guestsWaitingApproval;
    private roomId;
    streamName: string | null;
    private role;
    private token;
    private screenShareToken;
    private audioLevelIntervalMs;
    isScreenSharing: boolean;
    private screenSharePublisher;
    private isVideoMuted;
    private isAudioMuted;
    private joinStatusApiCallAttempts;
    private reconnectionAttempts;
    private reconnectionTimer;
    private isReconnecting;
    private lastMediaStream;
    private joinResponseTimer;
    private waitingForJoinResponse;
    private joinParameters;
    private pubNubClient?;
    private pubnubToken?;
    private pubnubSubscribeKey?;
    private pubnubPublishKey?;
    private joinRequested;
    metaData?: any;
    private screenShareMetaData?;
    private localAudioMonitor;
    private localAudioLevelTimer;
    private localRecorder;
    private recordedChunks;
    private recordedSegments;
    private segmentsMetadata;
    private chunkMetadata;
    private recordingStream;
    private recordingMimeType;
    isLocalRecording: boolean;
    private recordingStartTime;
    private screenRecorder;
    private screenRecordedChunks;
    private screenRecordedSegments;
    private isScreenRecording;
    private screenRecordingStartTime;
    private screenChunkMetadata;
    private screenSegmentsMetadata;
    constructor(config: ConferenceConfig);
    private decodeJWT;
    private setupPubNub;
    /**
     * Join a conference room (REST API calls only)
     * @param {string} roomId - Room identifier
     * @param {string} userId - User identifier - unique stream name
     * @param {string} token - Authentication token
     * @param {string} role - User role (default: 'publisher')
     * @param mediaStream
     * @param videoEnabled
     * @param audioEnabled
     * @param metaData
     * @returns {Promise<Object>} User information and token
     */
    join(roomId: string, userId: string | null | undefined, token: string | undefined, role: string | undefined, mediaStream: MediaStream | null, videoEnabled?: boolean, audioEnabled?: boolean, metaData?: any): Promise<boolean>;
    /**
     * Initialize virtual background support
     */
    initializeVirtualBackground(): Promise<void>;
    /**
     * Enable virtual background
     * @param {string} type - Background type: 'blur', 'image', 'color', 'none'
     * @param {Object} options - Background options
     * @param {string} options.imageUrl - URL for image background
     * @param {string} options.color - Color for color background
     * @param {number} options.blurAmount - Blur amount for blur background
     */
    enableVirtualBackground(type: string, options?: {}): Promise<void>;
    /**
     * Disable virtual background
     */
    disableVirtualBackground(): Promise<void>;
    /**
     * Change virtual background
     * @param {string} type - Background type
     * @param {Object} options - Background options
     */
    changeVirtualBackground(type: string, options?: {}): Promise<void>;
    /**
     * Approve guest join request
     * @param {string} userId - User identifier to approve
     */
    approveGuest(userId: string): Promise<void>;
    /**
     * Reject guest join request
     * @param {string} userId - User identifier to reject
     */
    rejectGuest(userId: string): Promise<void>;
    /**
     * Get virtual background status
     */
    getVirtualBackgroundStatus(): any;
    refreshPublisherStream(mediaStream: MediaStream): Promise<void>;
    refreshScreenShareStream(mediaStream: MediaStream): Promise<void>;
    /**
     * Handle join response timeout - leave and rejoin
     */
    _handleJoinResponseTimeout(): Promise<void>;
    _checkJoinStatusFromApi(): Promise<void>;
    /**
     * Start the join response timeout timer
     */
    _startJoinResponseTimeout(): void;
    /**
     * Clear the join response timeout timer
     */
    _clearJoinResponseTimeout(): void;
    /**
     * Set up event listeners for the stats monitor
     */
    _setupStatsMonitorListeners(): void;
    /**
     * Publish media stream to the conference
     * @param {MediaStream | null} mediaStream - Media stream to publish
     * @param {Object} constraints - Media constraints (optional)
     * @returns {Promise<void>}
     */
    _publish(mediaStream: MediaStream | null, constraints: MediaTrackConstraints): Promise<void>;
    startScreenShare(options?: {}): Promise<void>;
    _captureScreen(options?: {}): Promise<unknown>;
    _sendScreenShareLeaveMessage(): void;
    /**
     * Stop screen sharing
     * @returns {Promise<void>}
     */
    stopScreenShare(): Promise<void>;
    private _startScreenRecorder;
    private _stopScreenRecorder;
    /**
     * Start local recording of your own media stream
     * @param {MediaStream} stream - Optional custom stream to record. If not provided, uses the publisher's stream
     * @param {number} timeslice - How often to emit data chunks in milliseconds (default: 1000)
     * @param {string} mimeType - MIME type for recording (default: 'video/webm;codecs=vp9')
     * @returns {void}
     */
    startLocalRecording(stream?: MediaStream, timeslice?: number, mimeType?: string): void;
    /**
     * Stop local recording
     * @returns {Blob | null} The recorded video blob, or null if not recording
     */
    stopLocalRecording(): Blob | null;
    /**
     * Pause local recording
     */
    pauseLocalRecording(): void;
    /**
     * Resume local recording
     */
    resumeLocalRecording(): void;
    /**
     * Generate a ZIP blob containing all recorded segments and metadata
     * @returns {Promise<Blob | null>} The ZIP blob or null if no data
     */
    generateLocalRecordingZip(): Promise<Blob | null>;
    /**
     * Download all local recording segments as a single ZIP file
     * @param {string} baseFilename - Base name for the files (default: 'recording-{timestamp}')
     * @returns {boolean} True if downloads were initiated, false otherwise
     */
    downloadLocalRecording(baseFilename?: string): Promise<boolean>;
    /**
     * Get the recorded blobs without downloading
     * @returns {Blob[] | null} Array of recorded video blobs, or null if no data
     */
    getLocalRecordingBlob(): Blob[] | null;
    /**
     * Get local recording status
     * @returns {Object} Recording status information
     */
    getLocalRecordingStatus(): {
        isRecording: boolean;
        isPaused: boolean;
        chunks: number;
        segments: number;
        estimatedSize: number;
        state: string | null;
    };
    /**
     * Clear all recorded data (chunks and segments) without downloading
     */
    clearLocalRecording(): void;
    /**
     * Update local recording tracks when the source stream changes
     * Call this when switching cameras or toggling video on/off
     * This saves the current recording as a segment and starts fresh with the new stream
     * @param {MediaStream} newStream - The new media stream to record
     */
    updateLocalRecordingTracks(newStream?: MediaStream): void;
    /**
     * Stop publishing media
     * @returns {Promise<void>}
     */
    _unpublish(): Promise<void>;
    /**
     * Subscribe to a user's media stream
     * @param {Object} user - User object
     * @returns {Promise<Object>} Subscriber information
     */
    subscribe(user: User): Promise<{
        subscriber: WHEPClient;
        user: User;
        mediaStream: null;
    }>;
    /**
     * Unsubscribe from a user's media stream
     * @param {string} userId - User identifier, unique stream name of the user
     * @returns {Promise<void>}
     */
    unsubscribe(userId: string): Promise<void>;
    /**
     * Leave the conference room
     * @returns {Promise<void>}
     */
    leave(): Promise<void>;
    /**
     * Get current network quality
     */
    getNetworkQuality(): NetworkQualitySummary;
    /**
     * Get detailed stats for a specific connection
     */
    getConnectionStats(connectionId: string): DetailedConnectionStats;
    /**
     * Get all current issues
     */
    getCurrentWebRTCIssues(): Issue[];
    /**
     * Enable/disable stats monitoring
     */
    setStatsMonitoringEnabled(enabled: boolean): void;
    /**
     * Update stats monitoring thresholds
     */
    updateStatsThresholds(newThresholds: MonitorThresholds): void;
    /**
     * Enable/disable reconnection
     * @param {boolean} enabled
     */
    setReconnectionEnabled(enabled: boolean): void;
    /**
     * Get current room users
     * @returns {Object} Room users
     */
    getRoomUsers(): {
        [userId: string]: User;
    };
    /**
     * Get guests waiting approval
     * @returns {Object} Guests waiting approval
     */
    getGuestsWaitingApproval(): {
        [userId: string]: User;
    };
    /**
     * Check if user is joined
     * @returns {boolean}
     */
    getIsJoined(): boolean;
    /**
     * Check if user is publishing
     * @returns {boolean}
     */
    getIsPublishing(): boolean;
    /**
     * Check if currently reconnecting
     * @returns {boolean}
     */
    getIsReconnecting(): boolean;
    _generateUserId(): string;
    _handlePublisherEvent(event: any): void;
    _handleScreenShareEvent(event: any): void;
    _handleSubscriberEvent(event: any, userId: string): void;
    _handleDataChannelMessage(data: string): void;
    _handleChatMessage(chatMessage: any): void;
    _handleParticipantUpdate(participantUpdate: any): void;
    _handleTranscriptionResult(transcriptionResult: any): void;
    _handleJoinResponse(joinResponse: any): void;
    _handleGuestJoinRequest(guestJoinRequest: any): void;
    _handleRoomStateUpdate(roomState: any): void;
    _getOtherParticipants(users: any): {};
    /**
     * Schedule a reconnection attempt
     */
    _scheduleReconnection(): void;
    /**
     * Attempt to reconnect
     */
    _attemptReconnection(): Promise<void>;
    /**
     * Stop reconnection attempts
     */
    _stopReconnection(): void;
    /**
     * Create audio level monitor for a MediaStream
     * @param {MediaStream} mediaStream - The media stream to monitor
     * @returns {Function} Function that returns current audio level
     */
    _createAudioLevelMonitor(mediaStream: MediaStream): {
        getLevel: () => {
            rms: number;
            db: number;
            normalized: number;
        };
        audioContext: AudioContext;
        analyser: AnalyserNode;
        cleanup: () => void;
    } | null;
    /**
     * Start audio level monitoring for a subscriber
     * @param {string} userId - User ID to monitor
     */
    _startAudioLevelMonitoring(userId: string): void;
    /**
    * Start audio level monitoring for local user
    */
    _startLocalAudioLevelMonitoring(): void;
    /**
     * Stop audio level monitoring for local user
     */
    _stopLocalAudioLevelMonitoring(): void;
    /**
     * Stop audio level monitoring for a subscriber
     * @param {string} userId - User ID to stop monitoring
     */
    _stopAudioLevelMonitoring(userId: string): void;
    _sendLeaveMessage(): void;
    sendChatMessage(messageText: string): boolean | undefined;
    _sendApproveGuestDataChannelMessage(guestStreamName: string, isApproved: boolean): void;
    _sendSetMetaDataMessage(metaData: any): void;
    setUserMetaData(metaData: any): void;
    _sendJoinMessage(): void;
    /**
     * Mute audio on the publisher
     * @returns {void}
     */
    muteAudio(): void;
    /**
     * Unmute audio on the publisher
     * @returns {void}
     */
    unmuteAudio(): void;
    muteVideo(): Promise<void>;
    /**
     * Unmute video by getting new camera stream and re-applying virtual background if needed
     */
    unmuteVideo(): Promise<void>;
    /**
     * Set max video publish kbps on air
     */
    setMaxVideoPublishKbps(kbps: number): any;
    sendEvent(eventType: any, payload?: {}): void;
    sendFile(file: File, metadata?: FileMetadata): Promise<SendFileResult | null>;
    sendFiles(files: File[]): Promise<SendFileResult[]>;
    sendMessageWithFiles(message: string, name: string, fileResults: SendFileResult[]): void;
    getFileUrl(fileId: string, fileName: string): string | null;
    downloadFile(fileId: string, fileName: string): Promise<Blob | null>;
    listFiles(limit?: number): Promise<any[]>;
    deleteFile(fileId: string, fileName: string): Promise<boolean>;
    cleanupChat(): void;
    _getTrackSender(connection: any, kind: any): any;
    switchVideoDeviceWithTrackReplacement(videoDeviceId: string): Promise<MediaStream | null>;
    switchAudioDeviceWithTrackReplacement(audioDeviceId: string): Promise<MediaStream | null>;
    _emit(eventType: any, data?: {}): void;
    on(eventType: any, callback: any): void;
    off(eventType: any, callback: any): void;
}

/**
 * Conference event types
 */
declare const ConferenceEvents: {
    JOIN_FAILED: string;
    JOIN_BLOCKED: string;
    PUBLISH_FAIL: string;
    PUBLISH_FAILED: string;
    USER_PUBLISHED: string;
    GUEST_JOIN_REQUEST: string;
    RECONNECTION_ATTEMPT: string;
    RECONNECTION_SUCCESS: string;
    RECONNECTION_FAILED: string;
    RECONNECTION_ERROR: string;
    LOCAL_RECORDING_ENABLED: string;
    LOCAL_RECORDING_ERROR: string;
    LOCAL_RECORDING_STARTED: string;
    LOCAL_RECORDING_STOPPED: string;
    LOCAL_RECORDING_PAUSED: string;
    LOCAL_RECORDING_RESUMED: string;
    LOCAL_RECORDING_DATA: string;
    LOCAL_RECORDING_CLEARED: string;
    LOCAL_RECORDING_DOWNLOADED: string;
    LOCAL_RECORDING_SEGMENT_SAVED: string;
    NEW_PARTICIPANT: string;
    PARTICIPANT_DISCONNECTED: string;
    PARTICIPANT_MEDIA_UPDATE: string;
    SUBSCRIBE_SUCCESS: string;
    SUBSCRIBE_FAILED: string;
    SUBSCRIBE_STOP: string;
    UNSUBSCRIBE_SUCCESS: string;
    UNSUBSCRIBE_FAILED: string;
    AUDIO_LEVEL: string;
    VIDEO_MUTED: string;
    VIDEO_UNMUTED: string;
    AUDIO_MUTED: string;
    AUDIO_UNMUTED: string;
    VIDEO_MUTE_FAILED: string;
    VIDEO_UNMUTE_FAILED: string;
    AUDIO_MUTE_FAILED: string;
    AUDIO_UNMUTE_FAILED: string;
    CONNECT_FAIL: string;
    CONNECTION_CLOSED: string;
    CONNECTION_ADDED: string;
    CONNECTION_REMOVED: string;
    CONNECTION_FAILED: string;
    CONNECTION_STATE_CHANGED: string;
    MONITORING_STARTED: string;
    MONITORING_STOPPED: string;
    ISSUES_DETECTED: string;
    ICE_STATE_CHANGED: string;
    STATS_ANALYZED: string;
    STATS_COLLECTION_FAILED: string;
    SCREEN_SHARE_STARTED: string;
    SCREEN_SHARE_STOPPED: string;
    SCREEN_SHARE_FAILED: string;
    SCREEN_SHARE_STOP_FAILED: string;
    ROOM_STATE_UPDATE: string;
    DATACHANNEL_AVAILABLE: string;
    CHAT_MESSAGE: string;
    NETWORK_SCORES_UPDATED: string;
    WEBRTC_ISSUES_DETECTED: string;
    TRANSCRIPTION_RESULT: string;
    VIRTUAL_BACKGROUND_INITIALIZED: string;
    VIRTUAL_BACKGROUND_ENABLED: string;
    VIRTUAL_BACKGROUND_DISABLED: string;
    VIRTUAL_BACKGROUND_CHANGED: string;
    VIRTUAL_BACKGROUND_ENABLE_FAILED: string;
    VIRTUAL_BACKGROUND_DISABLE_FAILED: string;
    VIRTUAL_BACKGROUND_CHANGE_FAILED: string;
    VIRTUAL_BACKGROUND_INIT_FAILED: string;
};
/**
 * Chat message event types
 */
declare const ChatEventTypes: {
    MESSAGE_RECEIVED: string;
    REACTIONS: string;
    RAISED_HAND: string;
    TURN_YOUR_MIC_OFF: string;
};
/**
 * Layout options
 */
declare const LayoutOptions: {
    AUTO: string;
    TILED: string;
    SIDEBAR: string;
};
/**
 * Virtual background types
 */
declare const VirtualBackgroundTypes: {
    NONE: string;
    BLUR: string;
    SLIGHT_BLUR: string;
    IMAGE: string;
    COLOR: string;
};

export { ChatEventTypes, ConferenceClient, ConferenceEvents, LayoutOptions, VirtualBackgroundTypes };
export type { AudioInboundStats, AudioOutboundStats, CandidatePair, CodecInfo, ConferenceConfig, ConnectionAnalysis, ConnectionQuality, ConnectionStats, DetailedConnectionStats, FileType, Issue, IssueReason, IssueSeverity, IssueType, MonitorConfig, MonitorOptions, MonitorThresholds, NetworkQualitySummary, ParsedStats, QualityLevel, StatsAnalysis, TransportStats, User, VideoInboundStats, VideoOutboundStats };
