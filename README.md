# Red5 Pro Conference SDK

The Red5 Pro Conference SDK is a browser toolkit for building multi-party video conferencing applications on Red5 Cloud and Red5 Pro. It handles room membership, publishing and subscribing over WHIP/WHEP, WebRTC statistics, chat and file sharing, screen sharing, virtual backgrounds, noise suppression and local recording.

**Full documentation:** [Conference SDK guide](https://www.red5.net/docs/red5-cloud/development/sdks/conference-sdk/) · [API Reference](https://www.red5.net/docs/red5-cloud/development/sdks/conference-sdk/api-reference/) · [Examples](https://www.red5.net/docs/red5-cloud/development/sdks/conference-sdk/examples/)

## Installation

```bash
npm install red5pro-conference-sdk
```

```javascript
import { ConferenceClient, ConferenceEvents } from 'red5pro-conference-sdk';
```

Or with script tags. Load PubNub first; the SDK bundle already includes the Red5 WebRTC SDK.

```html
<script src="https://cdn.pubnub.com/sdk/javascript/pubnub.10.2.5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/red5pro-conference-sdk@1/red5pro-conference-sdk.min.js"></script>
<script>
  const { ConferenceClient, ConferenceEvents } = red5proConferenceSdk;
</script>
```

## Required: the local video element

The SDK publishes from, and previews into, a `<video>` element with the exact id **`red5pro-publisher`**. Add it to the page for every role before calling `join()`:

```html
<video id="red5pro-publisher" autoplay playsinline muted></video>
```

Without it, publishing fails with a `PUBLISH_FAILED` event and you never join, even though `join()` resolves to `true`. Screen sharing similarly needs `<video id="red5pro-publisher-screenshare" autoplay playsinline muted>`.

Remote participants are not rendered by the SDK: attach the `mediaStream` from `SUBSCRIBE_SUCCESS` to your own `<video>` elements.

## Quick start

You need your deployment's host name (without `https://`) and a conference token for each participant, generated on your server with the Red5 Backend SDK. The token's `uid`, `roomId` and `role` must match the `join()` arguments. Serve the page over HTTPS or from `localhost`.

```javascript
import { ConferenceClient, ConferenceEvents } from 'red5pro-conference-sdk';

const client = new ConferenceClient({ host: 'userid-000-xxxxxxxxxx.cloud.red5.net' });

// Joined: subscribe to everyone already in the room (keyed by uid)
client.on(ConferenceEvents.USER_PUBLISHED, ({ participants }) => {
  Object.values(participants).forEach(p => client.subscribe(p));
});

// Someone joined later
client.on(ConferenceEvents.NEW_PARTICIPANT, ({ participant }) => client.subscribe(participant));

// Remote media is ready: render it yourself
client.on(ConferenceEvents.SUBSCRIBE_SUCCESS, ({ uid, mediaStream }) => {
  const video = document.createElement('video');
  video.id = `remote-${uid}`;
  video.autoplay = true;
  video.playsInline = true;
  video.srcObject = mediaStream;
  document.body.appendChild(video);
});

client.on(ConferenceEvents.PARTICIPANT_DISCONNECTED, ({ participant }) => {
  document.getElementById(`remote-${participant.uid}`)?.remove();
});

// join() resolves before the connection exists: failures arrive as events
client.on(ConferenceEvents.PUBLISH_FAILED, ({ error }) => console.error('Publish failed:', error));
client.on(ConferenceEvents.JOIN_FAILED, ({ statusCode }) => console.error('Join rejected:', statusCode));
client.on(ConferenceEvents.JOIN_BLOCKED, () => console.error('Blocked from this room'));

// Let the SDK own the local stream
const media = client.mediaStreamManager;
const cameraStream = await media.getMediaStream(true, true);
media.setOriginalStream(cameraStream);
media.setCurrentStream(cameraStream);
const localStream = media.getCurrentStream();
document.getElementById('red5pro-publisher').srcObject = localStream;

await client.join('my-room', 'alice', token, 'publisher', localStream, true, true);

// Later
await client.leave();
client.cleanupChat();
```

`client.on(event, handler)` passes the event payload directly. `client.addEventListener(event, handler)` passes a `CustomEvent`, with the payload in `event.detail`.

## Examples

The [`examples`](./examples) folder has one runnable page per feature: basic join, mute controls, screen share, local recording, virtual background, network stats, device switch, chat, guest management and file transfer. Serve the folder with any static server (for example `npx serve examples`) and open an example from `localhost`.
