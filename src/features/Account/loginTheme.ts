import type { ButtonProps, SxProps } from "@mui/material";

export const oauthButtonStyle: SxProps = {
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
  },
}

export const oauthButtonProps: ButtonProps = {
  size: 'large',
  variant: 'outlined',
  fullWidth: true,
}
