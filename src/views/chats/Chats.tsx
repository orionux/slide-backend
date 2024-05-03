import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';

import { IoMdSend } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import IconButton from '@mui/material/IconButton';
import { CiFaceSmile } from "react-icons/ci";


const StyledPaper = styled(Paper)({
  minWidth: 650,
});

const StyledChatSection = styled('div')({
  width: '100%',
  height: 'auto',
  backgroundColor: '#e0e0e0',
});

const StyledBorderRight = styled('div')({
  borderRight: '1px solid #e0e0e0',
});

const MessageAreaContainer = styled(List)({
  backgroundColor: '#F2F5FF',
  height: 'calc(100vh - 200px)', 
  overflowY: 'auto',
});

const SendMessageContainer = styled(Grid)({
  padding: '20px',
  justifyContent: 'flex-end',
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
});

const StyledTextField = styled(TextField, {
  name: "StyledTextField",
  
})({
  
  "& .MuiInputBase-root": {
    width: 600
    
  }
})

interface ChatImage {
  [key: string]: string; // Key can be any string, value is a string
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
};

const Chats = () => {

  const contacts = [
    { name: 'Ad', key: 'Ad' },
    { name: 'Project_Name_Here1', key: 'Project_Name_Here1' },
    { name: 'Project_Name_Here2', key: 'Project_Name_Here2' },
    { name: 'Project_Name_Here3', key: 'Project_Name_Here3' },
    { name: 'Project_Name_Here4', key: 'Project_Name_Here4' },
    { name: 'Project_Name_Here5', key: 'Project_Name_Here5' },
    { name: 'Project_Name_Here6', key: 'Project_Name_Here6' },
    { name: 'Project_Name_Here7', key: 'Project_Name_Here7' },
  ];

  const [messages, setMessages] = useState([
    { content: 'Happy to hear you. We got your request. Can you explain a bit more about your project?', time: '09:30' },
    { content: 'Hey, I am good! What about you?', time: '09:31' },
    { content: 'Cool. I am good, let\'s catch up!', time: '10:30' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const updatedMessages = [...messages, { content: newMessage, time: currentTime }];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  const handleChangeMessage = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewMessage(event.target.value);
  };
  
  return (
    <div>
      <Grid container >
        <Grid item xs={12}>
          
        </Grid>
      </Grid>
      <Grid container component={StyledPaper} className="chatSection">
        <Grid item xs={3} component={StyledBorderRight}>
          
          <Grid item container  xs={12} style={{ padding: '5px', display: 'flex', justifyContent: 'space-between', alignItems:'center',marginTop: "20px",marginBottom: "20px", paddingLeft: '20px', paddingRight: '20px'}}>
            <GiHamburgerMenu />
            <TextField 
            id="outlined-basic-email" 
            label="Search" 
            variant="outlined"
            size="small" 
            InputProps={{ sx: { borderRadius: 10 } }}
            style={{ 
              height: 'auto', 
              width: '90%',
              }}/>
          </Grid>
          <List style={{ paddingRight:''}}>
            {/*<ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="/images/chat1.png" />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp" />
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar alt="Alice" src="/images/chat2.png" />
              </ListItemIcon>
              <ListItemText primary="Alice" />
            </ListItem>
            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar alt="Cindy Baker" src="/images/chat3.png" />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker" />
            </ListItem>*/}
            {contacts.map((contact) => (
              <ListItem button key={contact.key}>
                <ListItemIcon>
                  <Avatar alt={contact.name} src={chatImages[contact.key]} />
                </ListItemIcon>
                <div>
                  <ListItemText primary={contact.name} />
                  <ListItemText secondary={contact.name} />
                </div>
              </ListItem>
      ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Grid item md={12}>
           <ListItem button key="RemySharp"  style={{justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                
                <ListItemIcon>
                  <Avatar alt="Remy Sharp" src="/images/chat/chat2.png" />
                </ListItemIcon>
                
                <div>
                  <ListItemText primary="Project_Name_Here1" />
                  <ListItemText secondary="last seen 5 mins ago" />
                </div>
              </div>
              <Button variant="contained" style={{backgroundColor:'#000'}}>Visit Workplace</Button>
            
            </ListItem>
            
          </Grid>
          <MessageAreaContainer className="messageArea">
          {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText primary={message.content} />
                <ListItemText secondary={message.time} />
              </ListItem>
            ))}
           {/*} <ListItem key="1">
              <ListItemText primary="Happy to here you. We got your request. can you explain
              bit more about your project" />
              <ListItemText secondary="09:30" />
            </ListItem>
            <ListItem key="2">
              <ListItemText primary="Hey, I am Good! What about you ?" />
              <ListItemText secondary="09:31" />
            </ListItem>
            <ListItem key="3">
              <ListItemText primary="Cool. I am good, let's catch up!" />
              <ListItemText secondary="10:30" />
            </ListItem>*/}
          </MessageAreaContainer>
          
          {/*<SendMessageContainer>
            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            <Fab color="primary" aria-label="add">
              <IoMdSend />
            </Fab>
    </SendMessageContainer>*/}
     
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        width:'100%',
        paddingLeft:'50px', 
        paddingRight:'50px', 
        paddingTop: "20px", 
        paddingBottom:"20px",
        backgroundColor:"#F2F5FF",
        color:"#fff"}}>
      
      <IconButton color="primary" style={{ width: '48px', zIndex:'1'}}>
        <CiFaceSmile  color='#8BABD8' style={{zIndex:'1'}}/>
      </IconButton>

      <StyledTextField
        label="Message"
        variant="outlined"
        InputProps={{ sx: { backgroundColor: '#fff', paddingLeft:'-100px' } }}
        value={newMessage}
        onChange={handleChangeMessage}
          />
      
      <IconButton color="primary" style={{ marginRight: '10px',width: '48px', }} onClick={handleSendMessage}>
        <IoMdSend color='#8BABD8'/>
      </IconButton>
      
    </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chats;
