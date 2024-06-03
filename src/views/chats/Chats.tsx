import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material';
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

// import { CiFaceSmile } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

// import Picker from '@emoji-mart/react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const StyledPaper = styled(Paper)({
  minWidth: 650,
  minHeight: '70vh'
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

const StyledMessageBubble = styled('div')(({ sent }: { sent: boolean }) => ({
  backgroundColor: sent ? '#57EBB7' : '#fff',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '5px',
  position: 'relative',
}));

const DeliveredIcon = styled(AiOutlineCheckCircle)({
  position: 'absolute',
  bottom: '2px',
  right: '4px',
});

const ReadIcon = styled(FaCheck)({
  position: 'absolute',
  bottom: '2px',
  right: '4px',
});

// const EmojiPickerWrapper = styled('div')({
//   position: 'absolute',
//   bottom: '110px', 
//   left: '50px', 
// });

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
  const apiUrl = ''; //API URL here

  const contacts = [
    { name: 'Ad', key: 'Ad', msg: '', lastSeen: '2024-05-07T12:30:00' },
    { name: 'Project_Name_Here1', key: 'Project_Name_Here1', msg: '', lastSeen: '2024-05-07T12:45:00' },
    { name: 'Project_Name_Here2', key: 'Project_Name_Here2', msg: '', lastSeen: '2024-05-07T13:00:00' },
    { name: 'Project_Name_Here3', key: 'Project_Name_Here3', msg: '', lastSeen: '2024-05-07T13:15:00' },
    { name: 'Project_Name_Here4', key: 'Project_Name_Here4', msg: '', lastSeen: '2024-05-07T13:30:00' },
    { name: 'Project_Name_Here5', key: 'Project_Name_Here5', msg: '', lastSeen: '2024-05-07T13:45:00' },
    { name: 'Project_Name_Here6', key: 'Project_Name_Here6', msg: '', lastSeen: '2024-05-07T14:00:00' },
    { name: 'Project_Name_Here7', key: 'Project_Name_Here7', msg: '', lastSeen: '2024-05-07T14:15:00' },
  ];

  const [chatMessages, setChatMessages] = useState<{ [key: string]: { id: string; content: JSX.Element | string; time: string; sent: boolean; delivered?: boolean; read?: boolean }[] }>({});
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0].key);
      const initialMessages: { [key: string]: { id: string; content: JSX.Element | string; time: string; sent: boolean; delivered?: boolean; read?: boolean }[] } = {};
      contacts.forEach(contact => {
        initialMessages[contact.key] = [{ id: uuidv4(), content: contact.msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), sent: false }];
      });
      setChatMessages(initialMessages);
    }
  }, [contacts, selectedContact, apiUrl]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && selectedContact) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const messageId = uuidv4(); // Generate UUID for the message
      const updatedMessages = [...(chatMessages[selectedContact] || []), { id: messageId, content: newMessage, time: currentTime, sent: true, delivered: false, read: false }];
      setChatMessages({ ...chatMessages, [selectedContact]: updatedMessages });
      setNewMessage('');
    }
  };

  const markAsRead = (contactKey: string) => {
    if (selectedContact === contactKey && chatMessages[selectedContact]) {
      const updatedMessages = chatMessages[selectedContact].map(message => {
        if (!message.read) {

          return { ...message, read: true };
        }

        return message;
      });
      setChatMessages({ ...chatMessages, [selectedContact]: updatedMessages });
    }
  };

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };
  
  const handleContactClick = (key: string) => {
    setSelectedContact(key);
    markAsRead(key);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // const handleSelectEmoji = (emoji: any) => {
  //   setNewMessage(newMessage + emoji.native);
  //   setShowEmojiPicker(false);
  // };

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

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid container component={StyledPaper} className="chatSection">
          <Grid item xs={4} component={StyledBorderRight}>
            <Grid item container xs={12} style={{ padding: '5px', display: 'flex', justifyContent: 'space-between', alignItems:'center', marginTop: "20px", marginBottom: "20px", paddingLeft: '20px', paddingRight: '20px'}}>
              <GiHamburgerMenu />
              <TextField 
                id="outlined-basic-email" 
                label="Search" 
                variant="outlined"
                size="small" 
                InputProps={{ sx: { borderRadius: 10 } }}
                style={{ height: 'auto', width: '90%', paddingLeft:'5px' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Grid>
            <List style={{ paddingRight:''}}>
              {filteredContacts.map((contact) => (
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
                      secondary={chatMessages[contact.key] && chatMessages[contact.key].length > 0 ? chatMessages[contact.key][chatMessages[contact.key].length - 1].content : ''} 
                      secondaryTypographyProps={{fontSize: '13px',fontWeight:'500'}} 
                    />
                  </div>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={8}>
            <Grid item md={12}>
              {selectedContact && (
                <ListItem button key="RemySharp"  style={{justifyContent:'space-between',  borderBottom:'1px solid #e0e0e0'}}>
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
            <MessageAreaContainer className="messageArea">
              {selectedContact && chatMessages[selectedContact]?.map((message) => (
                <ListItem key={message.id} style={{ display: 'flex', justifyContent: message.sent ? 'flex-end' : 'flex-start' }}>
                  <StyledMessageBubble sent={message.sent}>
                    <ListItemText primary={message.content} primaryTypographyProps={{ color: '#000' }} />
                    <ListItemText
                      secondary={message.time}
                      secondaryTypographyProps={{ color: message.sent ? '#fff' : '#000', fontSize: '12px', textAlign: 'end', marginRight: '0' }}
                    />
                    {message.sent && message.delivered && <DeliveredIcon fontSize="0.7em" />}
                    {message.sent && message.read && <ReadIcon fontSize="0.7em" color='#fff'/>}
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
                position: 'relative', 
              }}>
                <StyledTextField
                    label="Message"
                    variant="outlined"
                    InputProps={{
                      sx: { backgroundColor: '#fff', cursor:'pointer' },
                      startAdornment: (
                        <InputAdornment position="start">

                          {/* <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            <CiFaceSmile color='#8BABD8' />
                          </IconButton> */}
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

                  {/* {showEmojiPicker && (
                    <EmojiPickerWrapper>
                      <Picker onEmojiSelect={handleSelectEmoji} />
                    </EmojiPickerWrapper>
                  )} */}
            </div>

          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Chats;
