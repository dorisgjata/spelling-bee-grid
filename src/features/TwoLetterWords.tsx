
import { Box, Chip, TextField, Typography } from '@mui/material';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import data from '../data/12-27-2021.json';

export default function TwoLetterWords() {
    const { twoLetterWords } = data;
    return (
        <Box sx={{ borderRadius: 1, border: 1, borderColor: 'lightgrey', minWidth: 400, maxWidth: 800, width: 1 }}>
            <Typography component='h2' variant='h1' align='center' sx={{ fontSize: 32, mt: 2 }}>Two Letter List</Typography>
            <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                {twoLetterWords.map((item) => (
                    <Box key={item.letters} sx={{ display: 'flex', justifyContent: 'row', p: 1 }}>
                        <Typography sx={{ m: 2 }}>{item.letters}</Typography>
                        {FindWords(item.letters)}
                    </Box>
                ))}
            </Box>
        </Box>

    )
}

function FindWords(twoLetters: string) {
    const [words, setWords] = useState<string[]>([]);
    const [word, setWord] = useState<string>('');
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setState: Dispatch<SetStateAction<string>>) => setState(event.target.value);
    const handleDelete = (deleteWord: string) => () => {
        setWords(words => words.filter(word => word !== deleteWord));
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (word.startsWith(twoLetters.toLowerCase()) && !words.find(w => w === word) && word.length >= 4) {
            setWord('');
            setWords([...words, word]);
        }
    }
    return (
        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                value={word}
                onChange={(e) => handleChange(e, setWord)}
            />
            <Box sx={{ display: 'flex', flexFlow: 'row' }}>
                {words.map((word, index) => <Box sx={{ p: 1 }} key={`${word}_${index}`}> <Chip color='primary' label={word} onDelete={handleDelete(word)} /> </Box>)}
            </Box>
        </Box>
    )
}