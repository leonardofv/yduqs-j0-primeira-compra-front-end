import { Box, Button, Checkbox, FormControlLabel, MenuItem, TextField, Typography, Link, FormHelperText, Snackbar, Alert, CircularProgress } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { personalDataSchema, type PersonalData } from "./personalDataSchema";
import { PatternFormat } from "react-number-format";
import { simulateRequest } from "../../lib/simulateRequest";
import { useState } from "react";

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: 20 }, (_, index) => currentYear - index);

function PersonalDataForm() {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitting },
    } = useForm<PersonalData>({
        resolver: zodResolver(personalDataSchema),
        mode: 'onTouched',
        defaultValues: {
            fullName: '',
            cpf: '',
            birthDate: '',
            email: '',
            phone: '',
            acceptedTerms: false,
            whatsappOptIn: false,
        },
    });

    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit(async () => {
                    await simulateRequest();
                    reset();
                    setIsSuccessOpen(true);
                })}
                sx={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '660px' }}
            >
                <TextField
                    {...register('fullName')}
                    label="Nome completo"
                    fullWidth
                    error={!!errors.fullName}
                    slotProps={{ formHelperText: { component: 'div' } }}
                    helperText={errors.fullName?.message ?? ( 
                        <>
                            Preencha seu nome completo, sem abreviações, igual ao seu documento de identificação.{' '}
                            <Link component="button" type="button" color="inherit" underline="always">
                                Confira o exemplo.
                            </Link>
                        </>
                    )}
                />
                <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                        <PatternFormat
                            {...field}
                            format="###.###.###-##"
                            customInput={TextField}
                            label="CPF"
                            fullWidth
                            error={!!errors.cpf}
                            helperText={errors.cpf?.message}
                        />
                    )}
                />
                <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => (
                        <PatternFormat
                            {...field}
                            format="##/##/####"
                            customInput={TextField}
                            label="Data de nascimento"
                            fullWidth
                            error={!!errors.birthDate}
                            helperText={errors.birthDate?.message}
                        />
                    )}
                />
                <TextField
                    {...register('email')}
                    label="E-mail"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <PatternFormat
                            {...field}
                            format="(##) #####-####"
                            customInput={TextField}
                            label="Celular para contato"
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    )}
                />
                <Controller
                    name="graduationYear"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            value={field.value ?? ''}
                            select
                            label="Ano de conclusão do ensino médio"
                            fullWidth
                            error={!!errors.graduationYear}
                            helperText={errors.graduationYear?.message}
                        >
                            {graduationYears.map((year) => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))}
                        </TextField>
                    )}
                />   
                <Box>
                    <FormControlLabel
                        sx={{ ml: 0, alignItems: 'flex-start' }}
                        control={
                            <Controller
                                name="acceptedTerms"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox {...field} checked={field.value} sx={{ p: 0, mr: '8px' }} />
                                )}
                            />
                        }
                        label={
                            <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.33 }}>
                                Li e concordo com os <Link color="inherit" underline="always">termos do edital</Link>,
                                bem como com o tratamento dos meus dados para fins de prospecção dos serviços educacionais prestados pela Estácio e demais instituições de ensino do mesmo{' '}
                                <Link color="inherit" underline="always">Grupo Econômico</Link>, de acordo com a nossa <Link color="inherit" underline="always">política de privacidade</Link>.
                            </Typography>
                        }
                    />
                    {errors.acceptedTerms && (
                        <FormHelperText error sx={{ ml: '32px' }}>
                            {errors.acceptedTerms.message}
                        </FormHelperText>
                    )}
                </Box>
                <FormControlLabel
                    sx={{ ml: 0, alignItems: 'flex-start' }}
                    control={
                        <Controller
                            name="whatsappOptIn"
                            control={control}
                            render={({ field }) => (
                                <Checkbox {...field} checked={field.value} sx={{ p: 0, mr: '8px' }} />
                            )}
                        />
                    }
                    label={
                        <Typography sx={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.33 }}>
                            Aceito receber atualizações sobre minha inscrição pelo WhatsApp.
                        </Typography>
                    }
                />    
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isValid || isSubmitting}
                    aria-label={isSubmitting ? 'Enviando' : undefined}
                    sx={{
                        alignSelf: 'flex-start',
                        mt: '8px',
                        px: '24px',
                        minWidth: '114px',
                        '&.Mui-disabled': { color: '#121212', opacity: 0.7 },
                    }}
                >
                    {isSubmitting ? <CircularProgress size={20} color="inherit" /> : 'Avançar'}
                </Button>
            </Box>
            <Snackbar
                open={isSuccessOpen}
                autoHideDuration={6000}
                onClose={() => setIsSuccessOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity="success" variant="filled" onClose={() => setIsSuccessOpen(false)}>
                    Dados enviados com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}

export default PersonalDataForm;
