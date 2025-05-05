package com.pokemonmanager.backend;

import com.pokemonmanager.backend.util.PokemonDataImporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.pokemonmanager.backend.util.repositories")
@SpringBootApplication
public class Application implements CommandLineRunner {

	@Autowired
	private PokemonDataImporter pokemonDataImporter;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception{
		pokemonDataImporter.run();
	}
}
