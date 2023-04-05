import { Avatar, Box, Button, Typography, Dialog, DialogActions, Divider, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import type { NextPageWithLayout } from '@common/types';
import type { ReactElement } from 'react';
import PageLayout from '@common/layouts/PageLayout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function EditAccountForm(props) {
    const { isEditing, handleCancelClick, username, setUsername, accountType, setAccountType, handleSaveClick } = props;
    
    
    return (
        <>
            {/* Edit Profile Modal  */}
            <Dialog open={props.isEditing} onClose={handleCancelClick} sx={{fontFamily: 'Poppins, sans-serif'}} fullWidth>
    
            <DialogTitle sx={{fontFamily:'inherit' }}>
                Edit Profile
            </DialogTitle>

            <Typography variant="subtitle2" sx={{fontFamily:'inherit', mx: 3}}>
                Choosing an <strong>Account type</strong> is required to proceed.
            </Typography>

            <DialogContent sx={{fontFamily:'inherit'}}>
                <TextField label="Username" value={props.username} onChange={(e) => props.setUsername(e.target.value)} fullWidth sx={{fontFamily:'inherit'}} />
                <Box sx={{ mt: 2, fontFamily: 'inherit' }}>
                <Typography variant="subtitle1" sx={{fontFamily:'inherit'}}>Account type</Typography>
                
                <Button 
                    variant={props.accountType === 'admin' ? 'contained' : 'outlined'} 
                    sx={{ 
                    mx: 1, 
                    borderRadius: '25px',
                    fontFamily:'inherit',
                    bgcolor: props.accountType === 'admin' ? '#CF7F49' : 'white',
                    '&:hover': { bgcolor: '#9b5729', border: '1px solid #9b5729', color: 'white' },
                    color: props.accountType === 'admin' ? 'white' : '#CF7F49',
                    border: '1px solid #CF7F49'
                    }} 
                    onClick={() => props.setAccountType('admin')}>
                    Producer
                </Button>
                <Button 
                    variant={props.accountType === 'participant' ? 'contained' : 'outlined'} 
                    sx={{ 
                    mx: 1, 
                    borderRadius: '25px',
                    fontFamily:'inherit',
                    bgcolor: props.accountType === 'participant' ? '#CF7F49' : 'white',
                    '&:hover': { bgcolor: '#9b5729', border: '1px solid #9b5729', color: 'white' },
                    color: props.accountType === 'participant' ? 'white' : '#CF7F49',
                    border: '1px solid #CF7F49'
                    
                    }} 
                    onClick={() => props.setAccountType('participant')}>
                    Participant
                </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button 
                onClick={handleCancelClick} 
                sx={{fontFamily:'inherit', color: '#523638', '&hover': {backgroundColor: '#fbf8f8'}}}>
                    Cancel
                </Button>
                <Button 
                variant="outlined"
                onClick={handleSaveClick} 
                sx={{
                    color: '#523638',
                    border: '1px solid transparent',
                    '&:hover': { backgroundColor: '#CF7F49', color: 'white', border: '1px solid #CF7F49'}
                    }}>
                    Save
                </Button>
            </DialogActions>
            </Dialog>
    
        </>
    );
}