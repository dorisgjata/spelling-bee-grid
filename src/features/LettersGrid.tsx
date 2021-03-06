
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useContext } from 'react';
import { GridType } from '../types';
import { AppContext } from './state/context';

export default function LettersGrid(props: GridType) {
    const { letters, rowHeader } = props;
    const { state } = useContext(AppContext);
    return (
        <TableContainer component={Box} sx={{ borderRadius: 1, border: 1, borderColor: 'lightgrey', minWidth: 400, maxWidth: 800 }}>
            <Typography component='h1' variant='h1' align='center' sx={{ fontSize: 32, mt: 2 }}>Spelling Bee Grid</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                {letters.map(letter => (<Typography key={letter} sx={{ m: 2 }}>{letter}</Typography>))}
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />{/** empty first cell */}
                        {rowHeader.map(header => <TableCell key={header} sx={{ fontWeight: 600 }}>{header}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.rows.map(row => (
                        <TableRow key={row.letter}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0, fontWeight: 600 },
                            }}
                        >
                            <TableCell component='th' scope='row' sx={{ fontWeight: 600 }}>
                                {row.letter}
                            </TableCell>
                            {row.repeats.map((num, index) => (
                                <TableCell key={`${row.letter}_${index}`} >{num === 0 ? '-' : num}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >

    )
}
