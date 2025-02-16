// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// // import { io } from "socket.io-client";

// // Connect to Socket.io server
// const socket = io("http://localhost:5000");

// export default function ChatRoom() {
//     const [message, setMessage] = useState("");
//     const [name, setName] = useState(""); 
//     const [chat, setChat] = useState([]);

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (message.trim().length > 0) {
//             const node = {
//                 user: localStorage.getItem("name"),
//                 msg: message,
//                 time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//             };
//             socket.emit("chat-message", node);
//             setChat([...chat, node]);
//             setMessage("");
//         }
//     };

//     useEffect(() => {
//         if (!localStorage.getItem("name")) {
//             const promptValue = prompt("Enter your username:");
//             localStorage.setItem("name", promptValue);
//             setName(promptValue);
//         } else {
//             setName(localStorage.getItem("name"));
//         }

//         socket.on("broadcast", (msg) => {
//             setChat((prevChat) => [...prevChat, msg]);
//         });

//         socket.on("previous-messages", (messages) => {
//             setChat(messages);
//         });

//         return () => {
//             socket.off("broadcast");
//             socket.off("previous-messages");
//         };
//     }, []);

//     return (
//         <div className="flex h-[90vh] justify-center">
//             <div className="flex flex-col justify-between container w-full md:w-[60%] h-[90vh] bg-white shadow-lg">
//                 <div className="text-3xl font-bold header h-8 bg-pink-600 text-white flex justify-center items-center p-6">
//                     Talk with Stranger <span className="text-sm ml-4">Hi {name}</span>
//                 </div>
//                 <div id="msgArea" className="overflow-y-scroll flex-grow p-4">
//                     <div className="msg-area pb-3">
//                         {chat.map((node, index) => (
//                             <div
//                                 className={`flex ${
//                                     node.user === name ? "justify-end" : "justify-start"
//                                 } items-center mb-2`}
//                                 key={index}
//                             >
//                                 <div
//                                     className={`sender rounded-full w-10 h-10 text-white mx-1 text-center py-2 ${
//                                         node.user === name ? "bg-pink-600" : "bg-blue-600"
//                                     }`}
//                                 >
//                                     {node.user.charAt(0).toUpperCase()}
//                                 </div>
//                                 <div
//                                     className={`msg ${
//                                         node.user === name ? "msg-out bg-pink-200" : "msg-in bg-blue-200"
//                                     } p-2 rounded-lg`}
//                                 >
//                                     {node.msg}
//                                     <div className="text-xs text-right">{node.time}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="footer px-2 py-2 bg-gray-200">
//                     <form onSubmit={sendMessage} className="flex">
//                         <input
//                             type="text"
//                             name="message"
//                             placeholder="Type your message here"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="w-full h-10 px-4 rounded-l-sm"
//                         />
//                         <button
//                             type="submit"
//                             className="w-auto px-4 bg-pink-600 text-white rounded-r-sm"
//                         >
//                             Send
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import React, { useState, useEffect } from "react";
// import "../../Styles/chatroom.css"

// export default function ChatRoom() {
//     const [message, setMessage] = useState("");
//     const [name, setName] = useState("");
//     const [chat, setChat] = useState([]);

//     const channel = new BroadcastChannel("chat");

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (message.trim().length > 0) {
//             const node = {
//                 user: name,
//                 msg: message,
//                 time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//             };
           
//             channel.postMessage(node);
           
//             setChat([...chat, node]);
//             setMessage("");
//         }
//     };

//     useEffect(() => {
//         if (!localStorage.getItem("name")) {
//             const promptValue = prompt("Enter your username:");
//             localStorage.setItem("name", promptValue);
//             setName(promptValue);
//         } else {
//             setName(localStorage.getItem("name"));
//         }

        
//         channel.onmessage = (event) => {
//             setChat((prevChat) => [...prevChat, event.data]);
//         };

//         return () => {
//             channel.close(); 
//         };
//     }, []);

//     return (
//         <div className="flex h-[90vh] justify-center">
//             <div className="flex flex-col justify-between container w-full md:w-[60%] h-[90vh] bg-white shadow-lg">
//                 <div className="text-3xl font-bold header h-8 bg-pink-600 text-white flex justify-center items-center p-6">
//                     Talk with Stranger <span className="text-sm ml-4">Hi {name}</span>
//                 </div>
//                 <div id="msgArea" className="overflow-y-scroll flex-grow p-4">
//                     <div className="msg-area pb-3">
//                         {chat.map((node, index) => (
//                             <div
//                                 className={`flex ${
//                                     node.user === name ? "justify-end" : "justify-start"
//                                 } items-center mb-2`}
//                                 key={index}
//                             >
//                                 <div
//                                     className={`sender rounded-full w-10 h-10 text-white mx-1 text-center py-2 ${
//                                         node.user === name ? "bg-pink-600" : "bg-blue-600"
//                                     }`}
//                                 >
//                                     {node.user.charAt(0).toUpperCase()}
//                                 </div>
//                                 <div
//                                     className={`msg ${
//                                         node.user === name ? "msg-out bg-pink-200" : "msg-in bg-blue-200"
//                                     } p-2 rounded-lg`}
//                                 >
//                                     {node.msg}
//                                     <div className="text-xs text-right">{node.time}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="footer px-2 py-2 bg-gray-200">
//                     <form onSubmit={sendMessage} className="flex">
//                         <input
//                             type="text"
//                             name="message"
//                             placeholder="Type your message here"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="w-full h-10 px-4 rounded-l-sm"
//                         />
//                         <button
//                             type="submit"
//                             className="w-auto px-4 bg-pink-600 text-white rounded-r-sm"
//                         >
//                             Send
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from "react";
// import "../../Styles/chatroom.css";
// import { Link } from "react-router-dom";

// export default function ChatRoom() {
//     const [message, setMessage] = useState("");
//     const [name, setName] = useState("");
//     const [chat, setChat] = useState([]);

//     const channel = new BroadcastChannel("chat");

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (message.trim().length > 0) {
//             const node = {
//                 user: name,
//                 msg: message,
//                 time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//             };

//             channel.postMessage(node);

//             setChat([...chat, node]);
//             setMessage("");
//         }
//     };

//     useEffect(() => {
//         if (!localStorage.getItem("name")) {
//             const promptValue = prompt("Enter your username:");
//             localStorage.setItem("name", promptValue);
//             setName(promptValue);
//         } else {
//             setName(localStorage.getItem("name"));
//         }

//         channel.onmessage = (event) => {
//             setChat((prevChat) => [...prevChat, event.data]);
//         };

//         return () => {
//             channel.close();
//         };
//     }, []);

//     const handleVideoCall = () => {
//         alert("Video call initiated!");
//         // You can add logic here to initiate a video call
//     };

//     return (
//         <div className="flex h-[90vh] justify-center">
//             <div className="flex flex-col justify-between container w-full md:w-[60%] h-[90vh] bg-white shadow-lg">
//                 <div className="text-3xl font-bold header h-8 bg-pink-600 text-white flex justify-center items-center p-6 relative">
//                     Talk with Stranger
//                     <span className="text-sm ml-4">Hi {name}</span>
//                     {/* Video call button */}
//                    <Link to="/video">
//                    <button
                        
//                         className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
//                         style={{marginLeft:"1100px", marginTop:"20px", width:"50px"}}
//                     >
//                         <i class="bi bi-camera-video-fill"></i>
//                     </button></Link>
//                 </div>
//                 <div id="msgArea" className="overflow-y-scroll flex-grow p-4">
//                     <div className="msg-area pb-3">
//                         {chat.map((node, index) => (
//                             <div
//                                 className={`flex ${
//                                     node.user === name ? "justify-end" : "justify-start"
//                                 } items-center mb-2`}
//                                 key={index}
//                             >
//                                 <div
//                                     className={`sender rounded-full w-10 h-10 text-white mx-1 text-center py-2 ${
//                                         node.user === name ? "bg-pink-600" : "bg-blue-600"
//                                     }`}
//                                 >
//                                     {node.user.charAt(0).toUpperCase()}
//                                 </div>
//                                 <div
//                                     className={`msg ${
//                                         node.user === name ? "msg-out bg-pink-200" : "msg-in bg-blue-200"
//                                     } p-2 rounded-lg`}
//                                 >
//                                     {node.msg}
//                                     <div className="text-xs text-right">{node.time}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="footer px-2 py-2 bg-gray-200">
//                     <form onSubmit={sendMessage} className="flex">
//                         <input
//                             type="text"
//                             name="message"
//                             placeholder="Type your message here"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="w-full h-10 px-4 rounded-l-sm"
//                         />
//                         <button
//                             type="submit"
//                             className="w-auto px-4 bg-pink-600 text-white rounded-r-sm"
//                             style={{marginLeft:"20px"}}
//                         >
//                             Send
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from "react";
// import "../../Styles/chatroom.css";
// import { Link } from "react-router-dom";
// import axios from 'axios';

// export default function ChatRoom() {
//     const [message, setMessage] = useState("");
//     const [name, setName] = useState("");
//     const [chat, setChat] = useState([]);
//     const [receiverId, setReceiverId] = useState(2); // Assuming receiverId is hardcoded to 2 for now, change accordingly

//     const channel = new BroadcastChannel("chat");

//     const sendMessage = async (e) => {
//         e.preventDefault();
//         if (message.trim().length > 0) {
//             const senderId = localStorage.getItem("userId"); // Assume userId is stored in localStorage
//             const content = message;

//             try {
//                 // Sending message to the backend
//                 await axios.post('http://localhost:8080/messages/send', null, {
//                     params: { senderId, receiverId, content }
//                 });

//                 // Create a message object for frontend update
//                 const node = {
//                     user: name,
//                     msg: message,
//                     time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//                 };

//                 channel.postMessage(node);
//                 setChat([...chat, node]);
//                 setMessage("");
//             } catch (error) {
//                 console.error("Error sending message:", error);
//             }
//         }
//     };

//     // Fetch inbox messages from the backend
//     const fetchInboxMessages = async () => {
//         const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
//         try {
//             const response = await axios.get(`http://localhost:8080/messages/inbox/${userId}`);
//             const receivedMessages = response.data.map((message) => ({
//                 user: message.sender.name, // assuming 'sender' has 'name' attribute
//                 msg: message.content,
//                 time: message.timestamp.substring(11, 16), // Extracting time portion
//             }));
//             setChat(receivedMessages);
//         } catch (error) {
//             console.error("Error fetching inbox messages:", error);
//         }
//     };

//     useEffect(() => {
//         if (!localStorage.getItem("name")) {
//             const promptValue = prompt("Enter your username:");
//             localStorage.setItem("name", promptValue);
//             setName(promptValue);
//         } else {
//             setName(localStorage.getItem("name"));
//         }

//         // Assuming you have a userId in localStorage to fetch user-specific messages
//         fetchInboxMessages();

//         channel.onmessage = (event) => {
//             setChat((prevChat) => [...prevChat, event.data]);
//         };

//         return () => {
//             channel.close();
//         };
//     }, []);

//     const handleVideoCall = () => {
//         alert("Video call initiated!");
//         // You can add logic here to initiate a video call
//     };

//     return (
//         <div className="flex h-[90vh] justify-center">
//             <div className="flex flex-col justify-between container w-full md:w-[60%] h-[90vh] bg-white shadow-lg">
//                 <div className="text-3xl font-bold header h-8 bg-pink-600 text-white flex justify-center items-center p-6 relative">
//                     Talk with Stranger
//                     <span className="text-sm ml-4">Hi {name}</span>
//                     {/* Video call button */}
//                     <Link to="/video">
//                         <button
//                             className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
//                             style={{ marginLeft: "1100px", marginTop: "20px", width: "50px" }}
//                         >
//                             <i className="bi bi-camera-video-fill"></i>
//                         </button>
//                     </Link>
//                 </div>
//                 <div id="msgArea" className="overflow-y-scroll flex-grow p-4">
//                     <div className="msg-area pb-3">
//                         {chat.map((node, index) => (
//                             <div
//                                 className={`flex ${
//                                     node.user === name ? "justify-end" : "justify-start"
//                                 } items-center mb-2`}
//                                 key={index}
//                             >
//                                 <div
//                                     className={`sender rounded-full w-10 h-10 text-white mx-1 text-center py-2 ${
//                                         node.user === name ? "bg-pink-600" : "bg-blue-600"
//                                     }`}
//                                 >
//                                     {node.user.charAt(0).toUpperCase()}
//                                 </div>
//                                 <div
//                                     className={`msg ${
//                                         node.user === name ? "msg-out bg-pink-200" : "msg-in bg-blue-200"
//                                     } p-2 rounded-lg`}
//                                 >
//                                     {node.msg}
//                                     <div className="text-xs text-right">{node.time}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="footer px-2 py-2 bg-gray-200">
//                     <form onSubmit={sendMessage} className="flex">
//                         <input
//                             type="text"
//                             name="message"
//                             placeholder="Type your message here"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="w-full h-10 px-4 rounded-l-sm"
//                         />
//                         <button
//                             type="submit"
//                             className="w-auto px-4 bg-pink-600 text-white rounded-r-sm"
//                             style={{ marginLeft: "20px" }}
//                         >
//                             Send
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import React, { useState, useEffect } from "react";
// import "../../Styles/chatroom.css";

// export default function ChatRoom() {
//     const [message, setMessage] = useState("");
//     const [name, setName] = useState("");
//     const [chat, setChat] = useState([]);

//     const channel = new BroadcastChannel("chat");

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (message.trim().length > 0) {
//             const node = {
//                 user: name,
//                 msg: message,
//                 time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//             };

//             channel.postMessage(node);
//             setChat([...chat, node]);
//             setMessage("");
//         }
//     };

//     const startVideoCall = () => {
//         alert("Starting video call... (Integrate WebRTC or Jitsi here)");
//     };

//     useEffect(() => {
//         if (!localStorage.getItem("name")) {
//             const promptValue = prompt("Enter your username:");
//             localStorage.setItem("name", promptValue);
//             setName(promptValue);
//         } else {
//             setName(localStorage.getItem("name"));
//         }

//         channel.onmessage = (event) => {
//             setChat((prevChat) => [...prevChat, event.data]);
//         };

//         return () => {
//             channel.close();
//         };
//     }, []);

//     return (
//         <div className="flex h-[90vh] justify-center">
//             <div className="flex flex-col justify-between container w-full md:w-[60%] h-[90vh] bg-white shadow-lg">
//                 {/* Chat Header */}
//                 <div className="flex justify-between items-center bg-pink-600 text-white p-6">
//                     <div className="text-2xl font-bold">Talk with Stranger</div>
//                     <div className="text-sm ml-4">Hi {name}</div>
//                     <button 
//                         onClick={startVideoCall} 
//                         className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
//                     >
//                         📹 Video Call
//                     </button>
//                 </div>

//                 {/* Chat Messages Area */}
//                 <div id="msgArea" className="overflow-y-scroll flex-grow p-4">
//                     <div className="msg-area pb-3">
//                         {chat.map((node, index) => (
//                             <div
//                                 className={`flex ${node.user === name ? "justify-end" : "justify-start"} items-center mb-2`}
//                                 key={index}
//                             >
//                                 <div
//                                     className={`sender rounded-full w-10 h-10 text-white mx-1 text-center py-2 ${
//                                         node.user === name ? "bg-pink-600" : "bg-blue-600"
//                                     }`}
//                                 >
//                                     {node.user.charAt(0).toUpperCase()}
//                                 </div>
//                                 <div
//                                     className={`msg ${
//                                         node.user === name ? "msg-out bg-pink-200" : "msg-in bg-blue-200"
//                                     } p-2 rounded-lg`}
//                                 >
//                                     {node.msg}
//                                     <div className="text-xs text-right">{node.time}</div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Chat Input Field */}
//                 <div className="footer px-2 py-2 bg-gray-200">
//                     <form onSubmit={sendMessage} className="flex">
//                         <input
//                             type="text"
//                             name="message"
//                             placeholder="Type your message here"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             className="w-full h-10 px-4 rounded-l-sm"
//                         />
//                         <button type="submit" className="w-auto px-4 bg-pink-600 text-white rounded-r-sm">
//                             Send
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import React, { useEffect, useRef, useState } from "react";
// // import Peer from "simple-peer";
// import Peer from "simple-peer";

// const ws = new WebSocket("ws://localhost:8080/video-call");

// export default function ChatRoom() {
//     const [me, setMe] = useState(null);
//     const [stream, setStream] = useState(null);
//     const [receivingCall, setReceivingCall] = useState(false);
//     const [callerSignal, setCallerSignal] = useState(null);
//     const [callAccepted, setCallAccepted] = useState(false);
//     const [callEnded, setCallEnded] = useState(false);
//     const [receiverId, setReceiverId] = useState(null);

//     const myVideo = useRef();
//     const userVideo = useRef();
//     const connectionRef = useRef();

//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//             setStream(stream);
//             myVideo.current.srcObject = stream;
//         });

//         ws.onmessage = (message) => {
//             const data = JSON.parse(message.data);
//             if (data.type === "offer") {
//                 setReceivingCall(true);
//                 setCallerSignal(data.signal);
//             } else if (data.type === "answer") {
//                 connectionRef.current.signal(data.signal);
//             }
//         };
//     }, []);

//     const callUser = () => {
//         const peer = new Peer({ initiator: true, trickle: false, stream });

//         peer.on("signal", (signal) => {
//             ws.send(JSON.stringify({ type: "offer", signal }));
//         });

//         peer.on("stream", (userStream) => {
//             userVideo.current.srcObject = userStream;
//         });

//         connectionRef.current = peer;
//     };

//     const answerCall = () => {
//         setCallAccepted(true);
//         const peer = new Peer({ initiator: false, trickle: false, stream });

//         peer.on("signal", (signal) => {
//             ws.send(JSON.stringify({ type: "answer", signal }));
//         });

//         peer.on("stream", (userStream) => {
//             userVideo.current.srcObject = userStream;
//         });

//         peer.signal(callerSignal);
//         connectionRef.current = peer;
//     };

//     const endCall = () => {
//         setCallEnded(true);
//         if (connectionRef.current) {
//             connectionRef.current.destroy();
//         }
//     };

//     return (
//         <div className="chat-container">
//             <div className="video-container">
//                 <video playsInline muted ref={myVideo} autoPlay className="w-48 h-48 border" />
//                 {callAccepted && !callEnded && <video playsInline ref={userVideo} autoPlay className="w-48 h-48 border" />}
//             </div>

//             {!callAccepted && (
//                 <button onClick={callUser} className="bg-blue-500 text-white px-4 py-2">
//                     📹 Video Call
//                 </button>
//             )}

//             {receivingCall && !callAccepted && (
//                 <div>
//                     <p>Incoming Call...</p>
//                     <button onClick={answerCall} className="bg-green-500 text-white px-4 py-2">Accept</button>
//                     <button onClick={() => setReceivingCall(false)} className="bg-red-500 text-white px-4 py-2">Reject</button>
//                 </div>
//             )}

//             {callAccepted && !callEnded && (
//                 <button onClick={endCall} className="bg-red-500 text-white px-4 py-2">
//                     End Call
//                 </button>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import "../../Styles/chatroom.css";

export default function ChatRoom() {
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [chat, setChat] = useState([]);
    const [stream, setStream] = useState(null);
    const [receivingCall, setReceivingCall] = useState(false);
    const [callerSignal, setCallerSignal] = useState(null);
    const [caller, setCaller] = useState("");
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [isCalling, setIsCalling] = useState(false);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    
    const channel = new BroadcastChannel("chat");

 useEffect(() => {
    channel.onmessage = (event) => {
        console.log("Received event:", event.data); // Debugging

        if (event.data.type === "offer") {
            // Handling incoming video call
            console.log("Receiving call from:", event.data.caller);
            setReceivingCall(true);
            setCaller(event.data.caller);
            setCallerSignal(event.data.signal);
        } else if (event.data.type === "answer") {
            // Handling call answer
            console.log("Received answer, connecting...");
            if (connectionRef.current) {
                connectionRef.current.signal(event.data.signal);
            }
        } else if (event.data.type === "message") {
            // Handling incoming chat messages
            console.log("New message received:", event.data);

            const newMessage = {
                user: event.data.sender,
                msg: event.data.content,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };

            setChat((prevChat) => [...prevChat, newMessage]);
        }
    };

    return () => {
        channel.close();
    };
}, []);

    

const sendMessage = async (senderId, receiverId, messageContent) => {
    const messageData = {
        senderId: senderId, // Dynamic ID
        receiverId: receiverId, // Dynamic ID
        content: messageContent,
    };

    try {
        const response = await fetch("http://localhost:8080/messages/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(messageData),
        });

        if (!response.ok) {
            console.error("Server Error:", await response.text());
            return;
        }

        console.log("Message sent successfully!");
    } catch (error) {
        console.error("Error sending message", error);
    }
};

    const startVideoCall = async () => {
        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(userStream);
            if (myVideo.current) {
                myVideo.current.srcObject = userStream;
            }
            setIsCalling(true);
            console.log("Video stream started successfully!");
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };
    
    

    const callUser = async () => {
        if (!stream) {
            console.error("Stream not available");
            return;
        }
    
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream, 
        });
    
        peer.on("signal", (signal) => {
            console.log("Sending offer to other user", signal);
            channel.postMessage({ type: "offer", signal, caller: name });
        });
    
        peer.on("stream", (userStream) => {
            console.log("Receiving remote stream:", userStream);
            if (userVideo.current) {
                userVideo.current.srcObject = userStream;
            }
        });
    
        peer.on("error", (err) => console.error("Peer error:", err));
    
        connectionRef.current = peer;
    };
    

    const answerCall = async () => {
        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(userStream);
            if (myVideo.current) {
                myVideo.current.srcObject = userStream;
            }
            setCallAccepted(true);
    
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: userStream,  
            });
    
            peer.on("signal", (signal) => {
                console.log("Sending answer to caller...");
                channel.postMessage({ type: "answer", signal, receiver: name });
            });
    
            peer.on("stream", (userStream) => {
                console.log("Receiving remote stream:", userStream);
                if (userVideo.current) {
                    userVideo.current.srcObject = userStream;
                }
            });
    
            peer.signal(callerSignal);
            connectionRef.current = peer;
        } catch (error) {
            console.error("Error answering call:", error);
        }
    };
    
    const endCall = () => {
        console.log("📴 Ending call...");
    
        setCallEnded(true);
    
        // Stop all media tracks (turn off camera & mic)
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    
        // Destroy peer connection
        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
    
        // Reset state
        setStream(null);
        setIsCalling(false);
        setCallAccepted(false);
        setReceivingCall(false);
    };
    

    return (
        <div className="flex h-[90vh] justify-center">
            <div className="flex flex-col justify-between container w-full md:w-[60%] h-[90vh] bg-white shadow-lg">
                
                {/* Chat Header */}
                <div className="flex justify-between items-center bg-pink-600 text-white p-6">
                    <div className="text-2xl font-bold">Chat Room</div>
                    <div className="text-sm ml-4">Hi {name}</div>
                    <button 
                        onClick={startVideoCall} 
                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        📹 Start Video Call
                    </button>
                </div>

                {/* Chat Messages Area */}
                <div id="msgArea" className="overflow-y-scroll flex-grow p-4">
                    <div className="msg-area pb-3">
                        {chat.map((node, index) => (
                            <div className={`flex ${node.user === name ? "justify-end" : "justify-start"} items-center mb-2`} key={index}>
                                <div className={`sender rounded-full w-10 h-10 text-white mx-1 text-center py-2 ${
                                        node.user === name ? "bg-pink-600" : "bg-blue-600"
                                    }`}>
                                    {node.user.charAt(0).toUpperCase()}
                                </div>
                                <div className={`msg ${
                                        node.user === name ? "msg-out bg-pink-200" : "msg-in bg-blue-200"
                                    } p-2 rounded-lg`}>
                                    {node.msg}
                                    <div className="text-xs text-right">{node.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Input Field */}
                <div className="footer px-2 py-2 bg-gray-200">
                    <form onSubmit={sendMessage} className="flex">
                        <input
                            type="text"
                            name="message"
                            placeholder="Type your message here"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full h-10 px-4 rounded-l-sm"
                        />
                        <button type="submit" className="w-auto px-4 bg-pink-600 text-white rounded-r-sm">
                            Send
                        </button>
                    </form>
                </div>
            </div>

            {/* Video Call Interface */}
            {isCalling && (
                <div className="absolute top-20 right-10 bg-white p-4 shadow-lg rounded-lg">
                    <video playsInline muted ref={myVideo} autoPlay className="w-48 h-48 border rounded" />
                    {callAccepted && !callEnded && <video playsInline ref={userVideo} autoPlay className="w-48 h-48 border rounded" />}
                    <button onClick={callUser} className="bg-green-500 text-white px-4 py-2 rounded">Call</button>
                    <button onClick={endCall} className="bg-red-500 text-white px-4 py-2 rounded">End Call</button>
                </div>
            )}

{receivingCall && !callAccepted && (
    <div className="absolute top-20 left-10 bg-white p-4 shadow-lg rounded-lg">
        <p className="text-lg font-semibold">{caller} is calling...</p>
        <button 
            onClick={answerCall} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
        >
            Answer Call
        </button>
    </div>
)}
        </div>
    );
}


// import React, { useState, useEffect, useRef } from "react";
// import Peer from "simple-peer";
// import "../../Styles/chatroom.css";

// const socket = io("http://localhost:8080"); // WebSocket connection

// const ChatRoom = ({ sender, receiver, onClose }) => {
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState("");
//     const [stream, setStream] = useState(null);
//     const [callAccepted, setCallAccepted] = useState(false);
//     const [receivingCall, setReceivingCall] = useState(false);
//     const [callerSignal, setCallerSignal] = useState(null);
//     const myVideo = useRef();
//     const userVideo = useRef();
//     const connectionRef = useRef();

//     useEffect(() => {
//         fetch(`http://localhost:8080/messages/${sender.id}/${receiver.id}`)
//             .then(res => res.json())
//             .then(data => setMessages(data));

//         socket.on("receiveMessage", (message) => {
//             setMessages(prev => [...prev, message]);
//         });

//         socket.on("callUser", (data) => {
//             setReceivingCall(true);
//             setCallerSignal(data.signal);
//         });

//         return () => {
//             socket.off("receiveMessage");
//             socket.off("callUser");
//         };
//     }, [sender, receiver]);

//     const sendMessage = () => {
//         if (!messageInput.trim()) return;

//         const message = {
//             senderId: sender.id,
//             receiverId: receiver.id,
//             content: messageInput
//         };

//         socket.emit("sendMessage", message);
//         setMessages(prev => [...prev, message]);
//         setMessageInput("");
//     };

//     const startVideoCall = async () => {
//         try {
//             const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//             setStream(userStream);
//             myVideo.current.srcObject = userStream;

//             const peer = new Peer({ initiator: true, trickle: false, stream: userStream });

//             peer.on("signal", (signal) => {
//                 socket.emit("callUser", { signal, to: receiver.id });
//             });

//             peer.on("stream", (userStream) => {
//                 userVideo.current.srcObject = userStream;
//             });

//             connectionRef.current = peer;
//         } catch (error) {
//             console.error("Error starting video call:", error);
//         }
//     };

//     const answerCall = async () => {
//         try {
//             const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//             setStream(userStream);
//             myVideo.current.srcObject = userStream;
//             setCallAccepted(true);

//             const peer = new Peer({ initiator: false, trickle: false, stream: userStream });

//             peer.on("signal", (signal) => {
//                 socket.emit("answerCall", { signal, to: receiver.id });
//             });

//             peer.on("stream", (userStream) => {
//                 userVideo.current.srcObject = userStream;
//             });

//             peer.signal(callerSignal);
//             connectionRef.current = peer;
//         } catch (error) {
//             console.error("Error answering call:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Chat with {receiver.name}</h2>
//             <div className="chat-box">
//                 {messages.map((msg, index) => (
//                     <div key={index} className={msg.senderId === sender.id ? "sent" : "received"}>
//                         <strong>{msg.senderId === sender.id ? "You" : receiver.name}:</strong> {msg.content}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//                 placeholder="Type a message..."
//             />
//             <button onClick={sendMessage}>Send</button>
//             <button onClick={startVideoCall}>📹 Video Call</button>

//             {receivingCall && !callAccepted && (
//                 <div>
//                     <p>Incoming call...</p>
//                     <button onClick={answerCall}>Answer</button>
//                 </div>
//             )}

//             <video ref={myVideo} autoPlay playsInline />
//             <video ref={userVideo} autoPlay playsInline />
//         </div>
//     );
// };

// export default ChatRoom;
