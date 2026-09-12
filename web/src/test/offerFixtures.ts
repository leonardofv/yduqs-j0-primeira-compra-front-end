import type { CourseOffer, OfferPrice } from '../components/offers/OfferCard';

export const priceFixture: OfferPrice = {
    original: 'R$ 4.752,00',
    installments: 18,
    installmentValue: 'R$ 169,95',
    cash: 'R$ 2.613,60',
    installmentOptions: [
        { installments: 1, installmentValue: 'R$ 2.613,60', total: 'R$ 2.613,60' },
        { installments: 12, installmentValue: 'R$ 247,50', total: 'R$ 2.946,00' },
        { installments: 18, installmentValue: 'R$ 169,95', total: 'R$ 3.059,10' },
    ],
};

export const offerWithPrice: CourseOffer = {
    id: 'offer-with-price',
    modality: 'Presencial',
    shift: 'Manhã',
    price: priceFixture,
    campus: {
        name: 'CAMPINAS - VILA INDUSTRIAL',
        address: 'RUA DR. SALES DE OLIVEIRA, Nº 1661 - VILA INDUSTRIAL - CAMPINAS - SP',
    },
};

export const offerWithoutPrice: CourseOffer = {
    id: 'offer-without-price',
    modality: 'Digital (EaD)',
    campus: {
        name: 'BARRA DA TIJUCA - TOM JOBIM',
        address: 'AV. DAS AMÉRICAS, 4.200, BLOCO 11 - BARRA DA TIJUCA - RIO DE JANEIRO - RJ',
    },
};
