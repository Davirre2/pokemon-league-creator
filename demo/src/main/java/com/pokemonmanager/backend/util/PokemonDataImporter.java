package com.pokemonmanager.backend.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pokemonmanager.backend.domain.Move;
import com.pokemonmanager.backend.domain.Pokemon;
import com.pokemonmanager.backend.util.repositories.MoveRepository;
import com.pokemonmanager.backend.util.repositories.PokemonRepository;
import com.pokemonmanager.backend.util.wrappers.PokemonJsonWrapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.*;

@Component
@RequiredArgsConstructor
public class PokemonDataImporter implements CommandLineRunner {

    private final PokemonRepository pokemonRepository;
    private final MoveRepository moveRepository;

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream inputStream = new ClassPathResource("pokemons.json").getInputStream();

        PokemonJsonWrapper wrapper = mapper.readValue(inputStream, PokemonJsonWrapper.class);
        List<RawPokemon> rawPokemons = wrapper.getPokemons();

        for (RawPokemon raw : rawPokemons) {

            // Guarda moviments (si no existeixen)
            Set<Move> moveSet = new HashSet<>();
            for (RawMove m : raw.getMoviments()) {
                Move move = moveRepository.findByName(m.getNom())
                        .orElseGet(() -> moveRepository.save(Move.builder()
                                .name(m.getNom())
                                .type(m.getTipus())
                                .build()));
                moveSet.add(move);
            }

            // Habilitats (noms)
            List<String> abilityNames = raw.getHabilitats().stream()
                    .map(RawAbility::getNom)
                    .toList();

            // Guarda el Pokémon
            Pokemon pokemon = Pokemon.builder()
                    .id(raw.getId())
                    .name(raw.getNom())
                    .dexNumber(raw.getId())
                    .imageUrl(raw.getUrl_imatge())
                    .types(raw.getTipus())
                    .abilities(abilityNames)
                    .generation(raw.getGeneracio())
                    .moves(moveSet)
                    .build();

            pokemonRepository.save(pokemon);
        }

        System.out.println("Dades de Pokémon importades correctament.");
    }

    @Data
    public static class RawPokemon {
        private Integer id;
        private String nom;
        private List<String> tipus;
        private String url_imatge;
        private List<RawAbility> habilitats;
        private List<RawMove> moviments;
        private Integer generacio;
    }

    @Data
    public static class RawAbility {
        private String nom;
        private boolean oculta;
    }

    @Data
    public static class RawMove {
        private String nom;
        private String tipus;
    }
}
