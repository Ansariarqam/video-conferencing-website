// app.js
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');

let localStream;
let remoteStream;
let peerConnection;

startButton.addEventListener('click', startVideoChat);

async function startVideoChat() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        // Create a peer connection
        peerConnection = new RTCPeerConnection();

        // Add local stream to peer connection
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        // Set up event handlers for peer connection
        peerConnection.onicecandidate = handleIceCandidate;
        peerConnection.ontrack = handleRemoteStream;

        // Create an offer to initiate the call
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        // Send the offer to the remote peer (you'd need a signaling server for this)
        // Example: Send offer to a WebSocket server which forwards it to the remote peer

    } catch (error) {
        console.error('Error starting video chat:', error);
    }
}

function handleIceCandidate(event) {
    // Handle ICE candidate events (exchange ICE candidates with the remote peer)
}

function handleRemoteStream(event) {
    remoteStream = event.stream;
    remoteVideo.srcObject = remoteStream;
}
