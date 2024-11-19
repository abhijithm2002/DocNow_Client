import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useConversation } from "../../../../socket/zustand/useConversation";
import { useSocketContext } from "../../../../socket/SocketContext";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { FaUserCircle } from "react-icons/fa";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function Conversation({ conversation, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const doctor = useSelector((state) => state.doctor.doctor);
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id); // Check if the conversation user is online

  useEffect(() => {
    setSelectedConversation(conversation);
  }, []);

  const handleSelectUser = (conversation) => {
    if (selectedConversation?._id !== conversation._id) {
      setSelectedConversation(conversation);
    }
  };

  return (
    <div key={conversation._id}>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 p-2 py-2 cursor-pointer ${
          isSelected ? "bg-gray-500" : ""
        }`}
        onClick={() => handleSelectUser(conversation)}
      >
        <div className="w-12 h-12">
          {conversation?.photo ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              invisible={!isOnline} // Show green dot only if online
            >
              <Avatar src={conversation.photo} alt="doctor avatar" className="w-12 h-12" />
            </StyledBadge>
          ) : (
            <FaUserCircle className="text-gray-500 w-full h-full" />
          )}
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-semibold">{conversation?.name}</p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </div>
  );
}

export default Conversation;
