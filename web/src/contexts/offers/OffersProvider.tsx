import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { CourseOffer } from "../../types/offer";
import { OffersContext } from "./OffersContext";

const OFFERS: CourseOffer[] = [
    {
        id: '1',
        modality: 'Presencial',
        shift: 'Manhã',
        price: { 
            original: 'R$ 4.752,00',
            installments: 18, 
            installmentValue: 'R$ 169,95', 
            cash: 'R$ 2.613,60',
            installmentOptions: [
                { installments: 1, installmentValue: 'R$ 2.613,60', total: 'R$ 2.613,60' },
                { installments: 3, installmentValue: 'R$ 900,90', total: 'R$ 2.702,70' },
                { installments: 6, installmentValue: 'R$ 465,30', total: 'R$ 2.791,80' },
                { installments: 9, installmentValue: 'R$ 320,10', total: 'R$ 2.880,90' },
                { installments: 12, installmentValue: 'R$ 247,50', total: 'R$ 2.946,00' },
                { installments: 15, installmentValue: 'R$ 200,97', total: 'R$ 3.014,55' },
                { installments: 18, installmentValue: 'R$ 169,95', total: 'R$ 3.059,10' },    
            ], 
        },
        campus: {
            name: 'CAMPINAS - VILA INDUSTRIAL',
            address: 'RUA DR. SALES DE OLIVEIRA, Nº 1661 - VILA INDUSTRIAL - CAMPINAS - SP',
        },
    },
    {
        id: '2',
        modality: 'Digital (EaD)',
        campus: {
            name: 'BARRA DA TIJUCA - TOM JOBIM',
            address: 'AV. DAS AMÉRICAS, 4.200, BLOCO 11 - BARRA DA TIJUCA - RIO DE JANEIRO - RJ',
        },
    },
];

export function OffersProvider({ children }: { children: ReactNode }) {
    const [selectedOffer, setSelectedOffer] = useState<CourseOffer | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedInstallments, setSelectedInstallments] = useState(0);

    const openDetails = useCallback((offer: CourseOffer) => {
        setSelectedOffer(offer);
        setSelectedInstallments(offer.price?.installments ?? 0);
        setIsDetailsOpen(true);
    }, []);
    
    const closeDetails = useCallback(() => setIsDetailsOpen(false), []);
    
    const value = useMemo(() => ({
        offers: OFFERS,
        selectedOffer,
        isDetailsOpen,
        selectedInstallments,
        openDetails,
        closeDetails,
        selectInstallments: setSelectedInstallments
    }), [selectedOffer, isDetailsOpen, selectedInstallments, openDetails, closeDetails]);

    return (
        <OffersContext.Provider value={value}>
            {children}
        </OffersContext.Provider>
    );
}