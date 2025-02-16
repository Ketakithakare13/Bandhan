import React from 'react';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
const RoomPage = () =>{
    const { roomId } = useParams()
    const myMeeting = async (element) =>{
       const appID = 1306376359;
       const serverSecret = "32abf4af016161e39385425168ea96d2"; 
       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID, 
        serverSecret, 
        roomId, 
        Date.now().toString(), 
        "Ketaki Thakare"
        )
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,
            sharedLinks: [ {
               name: 'Copy Link',
               url: `http://localhost:5174/room/${roomId}`,
            }
            ],
            scenario:{
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
        });
    }
    return <div>
        <div ref={myMeeting} />
        </div>;
    
}
export default RoomPage