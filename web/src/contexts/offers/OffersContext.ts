import { createContext, useContext } from "react";
import type { CourseOffer } from "../../types/offer";

type OffersContextValue = {
  offers: CourseOffer[];
  selectedOffer: CourseOffer | null;
  isDetailsOpen: boolean;
  selectedInstallments: number;
  openDetails: (offer: CourseOffer) => void;
  closeDetails: () => void;
  selectInstallments: (installments: number) => void;
};

export const OffersContext = createContext<OffersContextValue | undefined>(undefined);

export function useOffers() {
  const context = useContext(OffersContext);
  if (context === undefined) {
    throw new Error('useOffers must be used within an OffersProvider');
  }
  return context;
}