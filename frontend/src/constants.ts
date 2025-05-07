export const AVAILABLE_TYPES: string[] = [
    'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison',
    'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];
  
  export const AVAILABLE_GYM_NUMBERS: number[] = Array.from({ length: 18 }, (_, i) => i + 1);

  export const typeIconMap: { [key: string]: string } = {
      bug: '/assets/icons/bug.svg',
      dark: '/assets/icons/dark.svg',
      dragon: '/assets/icons/dragon.svg',
      electric: '/assets/icons/electric.svg',
      fire: '/assets/icons/fire.svg',
      fairy: '/assets/icons/fairy.svg',
      fighting: '/assets/icons/fighting.svg',
      flying: '/assets/icons/flying.svg',
      ghost: '/assets/icons/ghost.svg',
      grass: '/assets/icons/grass.svg',
      ground: '/assets/icons/ground.svg',
      ice: '/assets/icons/ice.svg',
      normal: '/assets/icons/normal.svg',
      poison: '/assets/icons/poison.svg',
      psychic: '/assets/icons/psychic.svg',
      rock: '/assets/icons/rock.svg',
      steel: '/assets/icons/steel.svg',
      water: '/assets/icons/water.svg',
    };