import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import type { InstallmentOption, OfferPrice } from "../../types/offer";

type InstallmentOptionsProps = {
    price: OfferPrice;
    selectedInstallments: number;
    onSelect: (installments: number) => void;
};

type InstallmentRowProps = {
    option: InstallmentOption;
    showDivider: boolean;
};

function InstallmentsTableHeader() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: '16px',
                py: '8px',
                bgcolor: 'primary.main',
                color: 'common.white'
            }}
        >
            <Typography sx={{ fontSize: '16px', lineHeight: 1.71 }}>Parcelas</Typography>
            <Typography sx={{ fontSize: '16px', lineHeight: 1.71 }}>Total</Typography>
        </Box>
    )
}

function InstallmentRow({ option, showDivider }: InstallmentRowProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: '16px',
                py: '16px',
                borderTop: showDivider ? 1 : 0,
                borderColor: 'divider',
            }}
        >
            <FormControlLabel
                value={String(option.installments)}
                control={<Radio sx={{ p: 0 }} />}
                label={`${option.installments}x ${option.installmentValue}`}
                sx={{ m: 0, gap: '8px' }}
                slotProps={{ typography: { sx: { fontSize: '14px', fontWeight: 500, lineHeight: 1.17 } } }}
            />
            <Typography sx={{ fontSize: '14px', lineHeight: 1.71, opacity: 0.72 }}>{option.total}</Typography>
        </Box>
    )
}

function InstallmentOptions({ price, selectedInstallments, onSelect }: InstallmentOptionsProps) {
    return (
        <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel 
                component="legend" 
                sx={{
                    color: 'text.primary',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: 1.35,
                    mb: '16px',
                    '&.Mui-focused': { color: 'text.primary' },
                }}
            >
                Qual dessas opções de parcelas você prefere?
            </FormLabel>
            <Box sx={{ border: 1, borderColor: 'primary.main', borderRadius: '4px', overflow: 'hidden' }}>
                <InstallmentsTableHeader />
                <RadioGroup
                    value={String(selectedInstallments)}
                    onChange={(event) => onSelect(Number(event.target.value))}
                >
                    {price.installmentOptions.map((option, index) => (
                        <InstallmentRow
                            key={option.installments}
                            option={option}
                            showDivider={index > 0}
                        />
                    ))}
                </RadioGroup>
            </Box>
        </FormControl>
    )
}

export default InstallmentOptions;
