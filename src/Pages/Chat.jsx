import React, {useEffect, useState} from 'react';
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
import SendIcon from '@mui/icons-material/Send';

const styles = {
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0',
        height: '100%',
        position: 'relative',
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
};

const ChatItem = ({from, text, time}) => {
    return (<ListItem key="1">
        <Grid container>
            <Grid item xs={12}>
                <ListItemText align={from === 'you'? 'right': 'left' } primary={text}></ListItemText>
            </Grid>
            <Grid item xs={12}>
                <ListItemText align={from === 'you'? 'right': 'left' } secondary={time}></ListItemText>
            </Grid>
        </Grid>
    </ListItem>);
}

const Chat = () => {
    const [records, setRecords] = useState([]);
    const [message, setMessage] = useState('');
    const [replyCount, setReplyCount] = useState(0);
    const doctorReplies = ['Weight management can be challenging. It\'s important to focus on a sustainable approach. Let\'s discuss your daily calorie intake and how to make healthier food choices.', 'Snacking is common, but we can find healthier options. Let\'s explore snacks that are both satisfying and nutritious'];
    useEffect(()=>{
        const newRecords = [];
        newRecords.push({from: 'doctor', text: 'Hi, how are you.', time: '09:31:32'});
        newRecords.push({from: 'you', text: 'Hi, I am good.', time: '09:31:50'});
        newRecords.push({from: 'doctor', text: 'How can I help you today?', time: '09:32:10'});
        setRecords(newRecords);
    }, []);

    const postMessage = () => {
        setRecords([...records, {from: 'you', text: message, time: getCurrentTime()}]);
        setTimeout(function() {
            setRecords([...records, {from: 'you', text: message, time: getCurrentTime()}, {from: 'doctor', text: doctorReplies[replyCount%doctorReplies.length], time: getCurrentTime()}]);
            }, 2000);
        setReplyCount(replyCount+1);
        setMessage('');
    };

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div style={{padding: 20}}>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat with your nutritionist</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} style={styles.chatSection}>
                <Grid item xs={3}  style={styles.borderRight500}>
                    <List>
                        <ListItem button key="Alice">
                            <ListItemIcon>
                                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Mai mai">Mai mai</ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>

                        <ListItem button key="CindyBaker">
                            <ListItemIcon>
                                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                        </ListItem>
                    </List>
                    <a href="/report.pdf" download="report.pdf" style={{position: 'absolute', bottom: 10, left: 10}}>Download Report</a>
                </Grid>
                <Grid item xs={9}>
                    <List style={styles.messageArea}>
                        {
                            records.map(record => <ChatItem from={record.from} text={record.text} time={record.time}></ChatItem>)
                        }
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px', marginTop: -20}}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth value={message} onChange={event => setMessage(event.target.value)} />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={postMessage}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;