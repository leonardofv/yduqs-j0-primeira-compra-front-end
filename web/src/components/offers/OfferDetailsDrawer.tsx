import { Box, Drawer, Typography } from "@mui/material";
import type { CourseOffer } from "./OfferCard";

type OfferDetailsDrawerProps = {
    offer: CourseOffer | null;
    open: boolean;
    onClose: () => void;
};

function OfferDetailsDrawer({ offer, open, onClose }: OfferDetailsDrawerProps) {
    if (offer === null) return null;

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ p: '16px' }}>
                <Typography component="h2">
                    Mais detalhes
                </Typography>
            </Box>
        </Drawer>
    );
};

export default OfferDetailsDrawer;