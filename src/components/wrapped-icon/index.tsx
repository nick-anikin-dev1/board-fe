import { Icon, IconProps } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';

interface WrappedIconProps extends IconProps {
    container?: BoxProps,
}

export const WrappedIcon = ({container, ...other}: WrappedIconProps) => (
    <Box {...container} >
        <Icon {...other}/>
    </Box>
)
