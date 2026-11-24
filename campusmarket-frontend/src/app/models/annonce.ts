export interface Annonce {
_id?: string;
titre: string;
description: string;
prix: number;
categorie: string;
etat: 'Neuf' | 'Occasion' | string;
vendeur: string;
telephone: string;
image: string;
createdAt?: string;
updatedAt?: string;
}
export const CATEGORIES = [
'Livres',
'Informatique',
'Vêtements',
'Accessoires'
] as const;
