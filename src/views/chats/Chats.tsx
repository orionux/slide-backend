import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { CiFaceSmile } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

import { v4 as uuidv4 } from 'uuid';


const StyledPaper = styled(Paper)({
  minWidth: 650,
});

const StyledBorderRight = styled('div')({
  borderRight: '1px solid #e0e0e0',
});

const MessageAreaContainer = styled(List)({
  backgroundColor: '#F2F5FF',
  height: 'calc(100% - 200px)', 
  overflowY: 'auto',
});

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    width: '100%'
  }
});

const StyledMessageBubble = styled('div')({
  backgroundColor: '#57EBB7',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '5px',
});

interface ChatImage {
  [key: string]: string;
}

const chatImages: ChatImage = {
  Ad: '/images/chat/chat1.png',
  Project_Name_Here1: '/images/chat/chat2.png',
  Project_Name_Here2: '/images/chat/chat3.png',
  Project_Name_Here3: '/images/chat/chat4.png',
  Project_Name_Here4: '/images/chat/chat5.png',
  Project_Name_Here5: '/images/chat/chat6.png',
  Project_Name_Here6: '/images/chat/chat7.png',
  Project_Name_Here7: '/images/chat/chat8.png',
} as const;


const Chats = () => {
  const contacts = [
    { name: 'Ad', key: 'Ad', msg: 'Chatgram Web was updated.', lastSeen: '2024-05-07T12:30:00' },
    { name: 'Project_Name_Here1', key: 'Project_Name_Here1', msg: 'Ok, see you later', lastSeen: '2024-05-07T12:45:00' },
    { name: 'Project_Name_Here2', key: 'Project_Name_Here2', msg: 'You: i don`t remember anything 😄 ', lastSeen: '2024-05-07T13:00:00' },
    { name: 'Project_Name_Here3', key: 'Project_Name_Here3', msg: 'I got a job at SpaceX 🎉 🚀', lastSeen: '2024-05-07T13:15:00' },
    { name: 'Project_Name_Here4', key: 'Project_Name_Here4', msg: 'Table for four, 5PM. Be there.', lastSeen: '2024-05-07T13:30:00' },
    { name: 'Project_Name_Here5', key: 'Project_Name_Here5', msg: 'Lewis: All done mate 😆 ', lastSeen: '2024-05-07T13:45:00' },
    { name: 'Project_Name_Here6', key: 'Project_Name_Here6', msg: 'Channel created', lastSeen: '2024-05-07T14:00:00' },
    { name: 'Project_Name_Here7', key: 'Project_Name_Here7', msg: 'Tell mom i will be home for tea 💜  ', lastSeen: '2024-05-07T14:15:00' },
  ];
  

  const [messages, setMessages] = useState<{ id: string; content: JSX.Element | string; time: string }[]>([
    { id: uuidv4(), content: <img src="/images/chat/53.png" alt="53" />, time: '09:30' }, // Render an img tag for the image
    { id: uuidv4(), content: 'Happy to hear you. We got your request. Can you explain a bit more about your project?', time: '09:30' },
  ]);
  
  
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  useEffect(() => {
    // Set the selected contact to the key of the first contact in the list
    if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[1].key);
    }
  }, [contacts, selectedContact]);
  
 {/*} const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const updatedMessages = [...messages, { content: newMessage, time: currentTime }];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };*/}
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const messageId = uuidv4(); // Generate UUID for the message
      const updatedMessages = [
        ...messages,
        { id: messageId, content: newMessage, time: currentTime }
      ];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };
  

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };
  
  const handleContactClick = (key: string) => {
    setSelectedContact(key);
  };

  // Calculate the time difference in minutes
  const calculateTimeDifference = (lastSeen?: string): string => {
    if (!lastSeen) return '';
  
    const currentTime = new Date();
    const lastSeenTime = new Date(lastSeen);
    const timeDifferenceInMinutes = Math.floor((currentTime.getTime() - lastSeenTime.getTime()) / (1000 * 60));
  
    if (timeDifferenceInMinutes < 1) {
      return 'Just now';
    } else if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes} minutes ago`;
    } else if (timeDifferenceInMinutes < 1440) { // 1440 minutes in a day
      const hours = Math.floor(timeDifferenceInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(timeDifferenceInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };
  
  return (
    <div>
      <Grid container>
        <Grid item xs={12}></Grid>
      </Grid>
      <Grid container component={StyledPaper} className="chatSection">
        <Grid item xs={3} component={StyledBorderRight}>
          <Grid item container xs={12} style={{ padding: '5px', display: 'flex', justifyContent: 'space-between', alignItems:'center', marginTop: "20px", marginBottom: "20px", paddingLeft: '20px', paddingRight: '20px'}}>
            <GiHamburgerMenu />
            <TextField 
              id="outlined-basic-email" 
              label="Search" 
              variant="outlined"
              size="small" 
              InputProps={{ sx: { borderRadius: 10 } }}
              style={{ height: 'auto', width: '90%' }}
            />
          </Grid>
          <List style={{ paddingRight:''}}>
            {contacts.map((contact) => (
              <ListItem button key={contact.key} onClick={() => handleContactClick(contact.key)}>
                <ListItemIcon>
                  <Avatar alt={contact.name} src={chatImages[contact.key]} />
                </ListItemIcon>
                <div>
                  <ListItemText 
                    primary={contact.name}
                    primaryTypographyProps={{fontSize: '15px',fontWeight:'bold'}} 
                  />
                  <ListItemText 
                    secondary={contact.msg} 
                    secondaryTypographyProps={{fontSize: '13px',fontWeight:'500'}} 
                  />
                </div>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Grid item md={12}>
            {selectedContact && (
              <ListItem button key="RemySharp"  style={{justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                  <ListItemIcon>
                    <Avatar alt={contacts.find(contact => contact.key === selectedContact)?.name || ""} src={chatImages[selectedContact]} />
                  </ListItemIcon>
                  <div>
                    <ListItemText primary={contacts.find(contact => contact.key === selectedContact)?.name || ""} />
                    <ListItemText
                      secondary={selectedContact ? calculateTimeDifference(contacts.find(contact => contact.key === selectedContact)?.lastSeen || '') : ''}
                    />

                  </div>
                </div>
                <Button variant="contained" style={{backgroundColor:'#000'}}>Visit Workplace</Button>
              </ListItem>
            )}
          </Grid>
          {/*
          <MessageAreaContainer className="messageArea">
            {messages.map((message, index) => (
              <ListItem key={index} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <StyledMessageBubble>
                  <ListItemText primary={message.content} />
                  <ListItemText 
                    secondary={message.time}
                    secondaryTypographyProps={{color:"#fff", fontSize:'12px'}}
                  />
                </StyledMessageBubble> 
              </ListItem>
            ))}
          </MessageAreaContainer>
          */}
          <MessageAreaContainer className="messageArea">
            {messages.map((message) => (
              <ListItem key={message.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <StyledMessageBubble>
                  <ListItemText primary={message.content} />
                  <ListItemText 
                    secondary={message.time}
                    secondaryTypographyProps={{color:"#fff", fontSize:'12px'}}
                  />
                </StyledMessageBubble> 
              </ListItem>
            ))}
          </MessageAreaContainer>

          <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%',
              paddingLeft: '50px', 
              paddingRight: '50px', 
              paddingTop: '20px', 
              paddingBottom: '50px',
              backgroundColor: '#F2F5FF',
              color: '#fff',
            }}>
              <StyledTextField
                  label="Message"
                  variant="outlined"
                  InputProps={{
                    sx: { backgroundColor: '#fff',
                        cursor:'pointer'
                     },
                    startAdornment: (
                      <InputAdornment position="start">
                        <CiFaceSmile color='#8BABD8' />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary" onClick={handleSendMessage}>
                          <IoMdSend color='#8BABD8'/>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={newMessage}
                  onChange={handleChangeMessage}
                  style={{ flex: 1 }}
                />

        </div>

        </Grid>
      </Grid>
    </div>
  );
};

export default Chats;
