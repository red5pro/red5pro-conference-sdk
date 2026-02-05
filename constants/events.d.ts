/**
 * Conference event types
 */
export declare const ConferenceEvents: {
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
export declare const ChatEventTypes: {
    MESSAGE_RECEIVED: string;
    REACTIONS: string;
    RAISED_HAND: string;
    TURN_YOUR_MIC_OFF: string;
};
/**
 * Layout options
 */
export declare const LayoutOptions: {
    AUTO: string;
    TILED: string;
    SIDEBAR: string;
};
/**
 * Virtual background types
 */
export declare const VirtualBackgroundTypes: {
    NONE: string;
    BLUR: string;
    SLIGHT_BLUR: string;
    IMAGE: string;
    COLOR: string;
};
