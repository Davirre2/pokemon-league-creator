export interface Pokemon {
  id: number;
  name: string;
  dexNumber: number;
  imageUrl: string;
  types: string[];
  abilities: string[];
  generation: number;
  moves: { id: number; name: string; type: string }[];
}
