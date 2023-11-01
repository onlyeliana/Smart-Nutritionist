import React, {useEffect, useState} from 'react';
import {chatServices} from '../services/chat-services';
import {Grid, CircularProgress, Typography} from '@mui/material';
import {KeyboardReturn} from '@mui/icons-material';
import articles from '../assets/articles.svg'
import {Link} from "react-router-dom";

const styles = {
    grid: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    input: {
        boxShadow: 24,
        height: '25px',
        width: '300px',
        minWidth: '100px'
    }
}
const Articles = () => {
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setError('');
        setUserInput(event.target.value);
    };

    const handlSendUserInput = async (event) => {
        event.persist();
        if (event.key !== "Enter") {
            return;
        }

        try {
            setLoading(true);
            const {response} = await chatServices.chatWithLLM({userInput});
            setAnswer(response + "\n Moreover, please checkout our shopmeal.");
        } catch (err) {
            setError(err);
            return;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInput != null && userInput.trim() === "") {
            setAnswer('');
        }
    }, [userInput]);
    return (
        <section className='article'>
            <h3>Chat with me to get advices ... 😊</h3>
            <Grid container spacing={2} style={styles.grid}>
                <Grid item xs={8} style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex'}}>
                        <input style={styles.input}
                               value={userInput}
                               onChange={handleInputChange}
                               onKeyDown={handlSendUserInput}
                               disabled={loading}
                        />
                        <KeyboardReturn style={{marginLeft: '5px', marginTop: '5px'}}/>
                        <Link to={'/chat-person'} style={{marginLeft: 32, fontFamily:'Caveat, cursive', color: '#154726', fontSize: 18}}>Chat with a nutritionist</Link>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div>
                        {loading && <div>
                            <CircularProgress color="secondary"/>
                            <CircularProgress color="success"/>
                            <CircularProgress color="inherit"/>
                        </div>}
                        {answer && <Typography>{answer}</Typography>}
                        {error && <p>Something bad happened</p>}
                    </div>
                </Grid>
            </Grid>
            <img src={articles} alt="articles"/>
        </section>
    )
}

export default Articles
