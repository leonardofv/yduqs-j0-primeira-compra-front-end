type InstallmentOption = {
    installments: number;
    installmentValue: string;
    total: string;
};

export type OfferPrice = {
    original: string;
    installments: number;
    installmentValue: string;
    cash: string;
    installmentOptions: InstallmentOption[];
};

export type CourseOffer = {
    id: string;
    modality: string;
    shift?: string;
    price?: OfferPrice;
    campus: {
        name: string;
        address: string;
    };
};
