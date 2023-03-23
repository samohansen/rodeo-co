import { SxProps } from '@mui/system';

export const buttonStyle: SxProps = {
    width: '100%',
    border: '1px solid',
    borderColor: 'divider',
    paddingY: '3',
    display: 'flex',
    justifyContent: 'center',
    gap: '2',
    color: 'text.primary',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: 'background.paper',
        boxShadow: '',
    }
};