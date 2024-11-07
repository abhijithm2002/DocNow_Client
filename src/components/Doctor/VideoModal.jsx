import React,{useEffect, useState} from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import {FiPhoneOff} from 'react-icons/fi'
import { useSocketContext } from '../../socket/SocketContext';
const AppId = Number(import.meta.env.VITE_APPID);
const ServerSecret = import.meta.env.VITE_SERVERSECRET




function randomID(len) {
    let result = "";
    if (result) return result;
    var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  
  export function getUrlParams(url = window.location.href) {
    let urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
  }



const VideoModal = () => {
    const Doctor = useSelector((state) => state.doctor.doctor);
    const {socket} = useSocketContext();
    const [calling, setCalling] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state.data;
    const Caller = Doctor;
    const roomID = getUrlParams().get('roomID') || randomID(5);

    useEffect(() => {
        const initMeeting = async(element) => {
          const  appID = AppId
          const serverSecret = ServerSecret
          const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            randomID(5),
            randomID(5)
          )

          const zp = ZegoUIKitPrebuilt.create(kitToken)
          zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: "Personal link",
                    url:
                    window.location.protocol +
                    "//" +
                    window.location.host +
                    "/redirectToCall" +
                    "?roomID=" +
                    "&userId=" +
                    userId,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showPreJoinView: false,
          })
        }

        const personalLink = `${window.location.protocol}//${window.location.host}/redirectToCall?roomID=${roomID}&userId=${userId}`;

        if(calling === 0 ) {
            socket.emit('callingUser', {Caller, userId, personalLink})
            setCalling(1)
        }
        initMeeting(document.querySelector('.myCallContainer'));
    },[roomID, userId]);

    useEffect(() => {
        return () => {
            window.location.reload();
        }
    },[]);

    const handleDisconnect = () => {
        navigate(-1)
    }



  return (
    <div className="flex flex-col items-center justify-center w-full h-[88vh] p-4">
      <div
        className="myCallContainer sm:w-100px md:w-full h-4/5"
        style={{ maxHeight: "80vh" }}
      >

      </div>
      <button
        onClick={handleDisconnect}
        className="bg-red-500 text-white rounded-lg py-2 px-4 mt-4 flex items-center justify-center w-1/2"
      >
        <FiPhoneOff className="mr-2" />
        Disconnect
      </button>
    </div>
  )
}

export default VideoModal
