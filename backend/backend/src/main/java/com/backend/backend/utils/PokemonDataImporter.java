package com.backend.backend.utils;

import com.backend.backend.domain.Move;
import com.backend.backend.domain.Pokemon;
import com.backend.backend.utils.MoveRepository;
import com.backend.backend.utils.PokemonRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.*;

@Component
@RequiredArgsConstructor
public class PokemonDataImporter {

    private final PokemonRepository pokemonRepository;
    private final MoveRepository moveRepository;

    public void importData(String... args) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(new File("src/main/resources/pokemons.json"));

        JsonNode pokemons = root.get("pokemons");
        for (JsonNode node : pokemons) {
            Pokemon pokemon = new Pokemon();
            pokemon.setId(node.get("id").asInt());
            pokemon.setName(node.get("nom").asText());
            pokemon.setDexNumber(node.get("id").asInt()); // si vols, pots separar-ho
            pokemon.setImageUrl(node.get("url_imatge").asText());
            pokemon.setGeneration(node.get("generacio").asInt());

            // Tipus
            List<String> tipusList = new ArrayList<>();
            for (JsonNode tipus : node.get("tipus")) {
                tipusList.add(tipus.asText());
            }
            pokemon.setTypes(tipusList);

            // Habilitats
            List<String> habilitatsList = new ArrayList<>();
            for (JsonNode habilitat : node.get("habilitats")) {
                habilitatsList.add(habilitat.get("nom").asText());
            }
            pokemon.setAbilities(habilitatsList);

            // Moviments
            Set<Move> moveSet = new HashSet<>();
            for (JsonNode moviment : node.get("moviments")) {
                String moveName = moviment.get("nom").asText();
                String moveType = moviment.get("tipus").asText();

                // Si ja existeix, l'agafem
                Move move = moveRepository.findByName(moveName).orElseGet(() -> {
                    Move newMove = new Move();
                    newMove.setName(moveName);
                    newMove.setType(moveType);
                    return moveRepository.save(newMove);
                });

                moveSet.add(move);
            }
            pokemon.setMoves(moveSet);

            // Guardem el Pokémon
            pokemonRepository.save(pokemon);
        }

        System.out.println("Importació completada.");
    }
}
