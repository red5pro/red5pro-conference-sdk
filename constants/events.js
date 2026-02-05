/**
 * 
 *   red5pro-conference-sdk - Conference SDK
 *   Author: 
 *   Version: 1.0.2
 *   Url: undefined
 * 
 *   Copyright © 2015 Infrared5, Inc. All rights reserved.
 * 
 *   The accompanying code comprising examples for use solely in conjunction with Red5 Pro (the "Example Code")
 *   is  licensed  to  you  by  Infrared5  Inc.  in  consideration  of  your  agreement  to  the  following
 *   license terms  and  conditions.  Access,  use,  modification,  or  redistribution  of  the  accompanying
 *   code  constitutes your acceptance of the following license terms and conditions.
 * 
 *   Permission is hereby granted, free of charge, to you to use the Example Code and associated documentation
 *   files (collectively, the "Software") without restriction, including without limitation the rights to use,
 *   copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 *   persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 *   The Software shall be used solely in conjunction with Red5 Pro. Red5 Pro is licensed under a separate end
 *   user  license  agreement  (the  "EULA"),  which  must  be  executed  with  Infrared5,  Inc.
 *   An  example  of  the EULA can be found on our website at: https://account.red5.net/assets/LICENSE.txt.
 * 
 *   The above copyright notice and this license shall be included in all copies or portions of the Software.
 * 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,  INCLUDING  BUT
 *   NOT  LIMITED  TO  THE  WARRANTIES  OF  MERCHANTABILITY, FITNESS  FOR  A  PARTICULAR  PURPOSE  AND
 *   NONINFRINGEMENT.   IN  NO  EVENT  SHALL INFRARED5, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 *   WHETHER IN  AN  ACTION  OF  CONTRACT,  TORT  OR  OTHERWISE,  ARISING  FROM,  OUT  OF  OR  IN CONNECTION
 *   WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

Object.defineProperty(exports,"__esModule",{value:!0}),exports.VirtualBackgroundTypes=exports.LayoutOptions=exports.ChatEventTypes=exports.ConferenceEvents=void 0,exports.ConferenceEvents={JOIN_FAILED:"join-failed",JOIN_BLOCKED:"join-blocked",PUBLISH_FAIL:"publish-fail",PUBLISH_FAILED:"publish-failed",USER_PUBLISHED:"user-published",GUEST_JOIN_REQUEST:"guest-join-request",RECONNECTION_ATTEMPT:"reconnection-attempt",RECONNECTION_SUCCESS:"reconnection-success",RECONNECTION_FAILED:"reconnection-failed",RECONNECTION_ERROR:"reconnection-error",LOCAL_RECORDING_ENABLED:"local-recording-enabled",LOCAL_RECORDING_ERROR:"local-recording-error",LOCAL_RECORDING_STARTED:"local-recording-started",LOCAL_RECORDING_STOPPED:"local-recording-stopped",LOCAL_RECORDING_PAUSED:"local-recording-paused",LOCAL_RECORDING_RESUMED:"local-recording-resumed",LOCAL_RECORDING_DATA:"local-recording-data",LOCAL_RECORDING_CLEARED:"local-recording-cleared",LOCAL_RECORDING_DOWNLOADED:"local-recording-downloaded",LOCAL_RECORDING_SEGMENT_SAVED:"local-recording-segment-saved",NEW_PARTICIPANT:"new-participant",PARTICIPANT_DISCONNECTED:"participant-disconnected",PARTICIPANT_MEDIA_UPDATE:"participant-media-update",SUBSCRIBE_SUCCESS:"subscribe-success",SUBSCRIBE_FAILED:"subscribe-failed",SUBSCRIBE_STOP:"subscribe-stop",UNSUBSCRIBE_SUCCESS:"unsubscribe-success",UNSUBSCRIBE_FAILED:"unsubscribe-failed",AUDIO_LEVEL:"audio-level",VIDEO_MUTED:"video-muted",VIDEO_UNMUTED:"video-unmuted",AUDIO_MUTED:"audio-muted",AUDIO_UNMUTED:"audio-unmuted",VIDEO_MUTE_FAILED:"video-mute-failed",VIDEO_UNMUTE_FAILED:"video-unmute-failed",AUDIO_MUTE_FAILED:"audio-mute-failed",AUDIO_UNMUTE_FAILED:"audio-unmute-failed",CONNECT_FAIL:"connect-fail",CONNECTION_CLOSED:"connection-closed",CONNECTION_ADDED:"connection-added",CONNECTION_REMOVED:"connection-removed",CONNECTION_FAILED:"connection-failed",CONNECTION_STATE_CHANGED:"connection-state-changed",MONITORING_STARTED:"monitoring-started",MONITORING_STOPPED:"monitoring-stopped",ISSUES_DETECTED:"issues-detected",ICE_STATE_CHANGED:"ice-state-changed",STATS_ANALYZED:"stats-analyzed",STATS_COLLECTION_FAILED:"stats-collection-failed",SCREEN_SHARE_STARTED:"screen-share-started",SCREEN_SHARE_STOPPED:"screen-share-stopped",SCREEN_SHARE_FAILED:"screen-share-failed",SCREEN_SHARE_STOP_FAILED:"screen-share-stop-failed",ROOM_STATE_UPDATE:"room-state-update",DATACHANNEL_AVAILABLE:"datachannel-available",CHAT_MESSAGE:"chat-message",NETWORK_SCORES_UPDATED:"network-scores-updated",WEBRTC_ISSUES_DETECTED:"webrtc-issues-detected",TRANSCRIPTION_RESULT:"transcription-result",VIRTUAL_BACKGROUND_INITIALIZED:"virtual-background-initialized",VIRTUAL_BACKGROUND_ENABLED:"virtual-background-enabled",VIRTUAL_BACKGROUND_DISABLED:"virtual-background-disabled",VIRTUAL_BACKGROUND_CHANGED:"virtual-background-changed",VIRTUAL_BACKGROUND_ENABLE_FAILED:"virtual-background-enable-failed",VIRTUAL_BACKGROUND_DISABLE_FAILED:"virtual-background-disable-failed",VIRTUAL_BACKGROUND_CHANGE_FAILED:"virtual-background-change-failed",VIRTUAL_BACKGROUND_INIT_FAILED:"virtual-background-init-failed"},exports.ChatEventTypes={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",REACTIONS:"REACTIONS",RAISED_HAND:"RAISED_HAND",TURN_YOUR_MIC_OFF:"TURN_YOUR_MIC_OFF"},exports.LayoutOptions={AUTO:"Auto",TILED:"Tiled",SIDEBAR:"Sidebar"},exports.VirtualBackgroundTypes={NONE:"none",BLUR:"blur",SLIGHT_BLUR:"slight-blur",IMAGE:"image",COLOR:"color"};
