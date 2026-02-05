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
declare class WebRTCStatsMonitor extends EventTarget {
    config: MonitorConfig;
    private connections;
    private statsHistory;
    private currentStats;
    private issues;
    private isMonitoring;
    private monitoringInterval;
    constructor(options?: MonitorOptions);
    /**
     * Add a peer connection to monitor
     */
    addConnection(id: string, peerConnection: RTCPeerConnection, type?: string, metadata?: Record<string, any>): void;
    /**
     * Remove a connection from monitoring
     */
    removeConnection(id: string): void;
    /**
     * Start monitoring all connections
     */
    startMonitoring(): void;
    /**
     * Stop monitoring
     */
    stopMonitoring(): void;
    /**
     * Collect stats from all connections
     */
    private _collectStats;
    /**
     * Collect stats for a specific connection
     */
    private _collectConnectionStats;
    /**
     * Parse raw WebRTC stats into structured format
     */
    private _parseStats;
    private _parseVideoOutboundStats;
    private _parseAudioOutboundStats;
    private _parseVideoInboundStats;
    private _parseAudioInboundStats;
    /**
     * Analyze current stats and calculate metrics
     */
    private _analyzeStats;
    /**
     * Analyze stats for a specific connection
     */
    private _analyzeConnectionStats;
    /**
     * Calculate quality score based on metrics
     */
    private _calculateQualityScore;
    /**
     * Detect issues based on current stats
     */
    private _detectIssues;
    /**
     * Detect issues for a specific connection
     */
    private _detectConnectionIssues;
    /**
     * Handle connection state changes
     */
    private _handleConnectionStateChange;
    /**
     * Handle ICE connection state changes
     */
    private _handleIceStateChange;
    /**
     * Handle stats collection failures
     */
    private _handleStatsCollectionFailure;
    /**
     * Get current network quality summary
     */
    getNetworkQuality(): NetworkQualitySummary;
    /**
     * Get detailed stats for a connection
     */
    getConnectionStats(id: string): DetailedConnectionStats;
    /**
     * Get all current issues
     */
    getCurrentIssues(): Issue[];
    /**
     * Emit custom events
     */
    private _emit;
    /**
     * Add event listener
     */
    on(eventType: string, callback: (data: any) => void): void;
    /**
     * Remove event listener
     */
    off(eventType: string, callback: (data: any) => void): void;
}
export default WebRTCStatsMonitor;
export type { MonitorOptions, MonitorConfig, MonitorThresholds, ConnectionStats, ConnectionAnalysis, StatsAnalysis, Issue, NetworkQualitySummary, ConnectionQuality, DetailedConnectionStats, VideoOutboundStats, AudioOutboundStats, VideoInboundStats, AudioInboundStats, CandidatePair, TransportStats, CodecInfo, ParsedStats, IssueSeverity, IssueType, IssueReason, QualityLevel };
