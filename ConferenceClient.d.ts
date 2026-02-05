import { WHEPClient } from 'red5pro-webrtc-sdk';
import MediaStreamManager from './MediaStreamManager';
import { MonitorThresholds } from "./WebRTCStatsMonitor";
export interface ConferenceConfig {
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
export interface User {
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
export interface FileType {
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
export declare class ConferenceClient extends EventTarget {
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
    getNetworkQuality(): import("./WebRTCStatsMonitor").NetworkQualitySummary;
    /**
     * Get detailed stats for a specific connection
     */
    getConnectionStats(connectionId: string): import("./WebRTCStatsMonitor").DetailedConnectionStats;
    /**
     * Get all current issues
     */
    getCurrentWebRTCIssues(): import("./WebRTCStatsMonitor").Issue[];
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
export default ConferenceClient;
