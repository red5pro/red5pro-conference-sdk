# Red5 Pro Conference SDK

The [Red5 Pro Conference SDK](https://www.red5.net/docs/red5-cloud/development/sdks/conference-sdk/) is a powerful, professional-grade toolkit for building multi-party video conferencing applications on the Red5 Pro platform. It handles room management, media streaming [WHIP/WHEP](https://www.red5.net/whip-and-whep), [WebRTC](https://www.red5.net/webrtc-server) statistics [interactive features powered by PubNub](https://www.red5.net/case-studies/red5-cloud-integrates-pubnub-to-deliver-interactivity-intelligence-and-global-scalability-for-real-time-streaming-experiences/), and advanced features like [virtual backgrounds](https://www.red5.net/blog/virtual-backgrounds-using-the-red5-webrtc-sdk/) and local recording.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Core API](#core-api)
- [Events](#events)
- [Advanced Features](#advanced-features)
- [Development](#development)

## Installation

Install the SDK via npm:

```bash
npm install red5pro-conference-sdk
```

## Quick Start

```javascript
import { ConferenceClient, ConferenceEvents } from 'red5pro-conference-sdk';

// 1. Configure the client
const config = {
  host: 'your-red5-pro-host',
  nodeGroup: 'your-node-group',
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  pubnubPublishKey: 'your-pubnub-publish-key',
  pubnubSubscribeKey: 'your-pubnub-subscribe-key'
};

const client = new ConferenceClient(config);

// 2. Listen for events
client.on(ConferenceEvents.USER_PUBLISHED, (event) => {
  console.log('Successfully published to room:', event.streamName);
});

client.on(ConferenceEvents.NEW_PARTICIPANT, (participant) => {
  console.log('New participant joined:', participant.userId);
  // Auto-subscribe to the new participant
  client.subscribe(participant);
});

// 3. Join a room
const joinParams = {
  roomId: 'my-awesome-room',
  userId: 'user-' + Math.floor(Math.random() * 1000),
  token: 'your-auth-token',
  role: 'publisher',
  mediaStream: await navigator.mediaDevices.getUserMedia({ video: true, audio: true }),
  videoEnabled: true,
  audioEnabled: true
};

await client.join(
  joinParams.roomId,
  joinParams.userId,
  joinParams.token,
  joinParams.role,
  joinParams.mediaStream,
  joinParams.videoEnabled,
  joinParams.audioEnabled
);
```

## Configuration

The `ConferenceConfig` object supports the following parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `host` | `string` | Red5 Pro Server host address. |
| `nodeGroup` | `string` | Optional node group for autoscaling. |
| `iceServers` | `RTCIceServer[]` | Array of ICE servers for WebRTC. |
| `reconnectionEnabled` | `boolean` | Enable automatic reconnection. Default: `true`. |
| `maxVideoBitrateKbps` | `number` | Maximum video bitrate for publishing. |
| `pubnubPublishKey` | `string` | PubNub Publish Key for chat/signaling. |
| `pubnubSubscribeKey` | `string` | PubNub Subscribe Key for chat/signaling. |

## Core API

### Room Management
- `join(roomId, userId, token, role, mediaStream, ...)`: Join a conference room.
- `leave()`: Disconnect and leave the room.

### Media Controls
- `muteVideo()` / `unmuteVideo()`: Control local camera.
- `muteAudio()` / `unmuteAudio()`: Control local microphone.
- `switchVideoDeviceWithTrackReplacement(deviceId)`: Seamlessly switch cameras.

### Publishing & Subscribing
- `subscribe(user)`: Start viewing a participant's stream.
- `unsubscribe(userId)`: Stop viewing a participant's stream.

## Events

The SDK uses `ConferenceEvents` for all notifications.

```javascript
import { ConferenceEvents } from 'red5pro-conference-sdk';

client.on(ConferenceEvents.ROOM_STATE_UPDATE, (state) => {
  console.log('Room users updated:', state.users);
});

client.on(ConferenceEvents.CHAT_MESSAGE, (message) => {
  console.log('New message:', message.text);
});

client.on(ConferenceEvents.ISSUES_DETECTED, (issues) => {
  console.warn('Network or WebRTC issues:', issues);
});
```

## Advanced Features

### Virtual Backgrounds
Requires `@mediapipe/selfie_segmentation`.

```javascript
await client.initializeVirtualBackground();
await client.enableVirtualBackground('blur', { blurAmount: 10 });
// Types: 'none', 'blur', 'slight-blur', 'image', 'color'
```

### Screen Sharing
```javascript
await client.startScreenShare({
  includeAudio: true,
  metaData: { type: 'presentation' }
});
await client.stopScreenShare();
```

### Local Recording
Records participant streams directly in the browser and creates a ZIP file.

```javascript
// Enable local recording
const zip = await client.generateLocalRecordingZip();
// Download the recording
await client.downloadLocalRecording('my-conference-record');
```
