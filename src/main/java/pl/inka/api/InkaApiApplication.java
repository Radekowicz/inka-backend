package pl.inka.api;

import static java.util.Optional.ofNullable;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InkaApiApplication {

	public static void main(String[] args) {
		setDefaultActiveSpringProfile();
		SpringApplication.run(InkaApiApplication.class, args);
	}

	private static void setDefaultActiveSpringProfile() {
		String activeProfile =
				ofNullable(System.getenv("SPRING_PROFILES_ACTIVE"))
						.orElseGet(() -> System.getProperty("spring.profiles.active"));

		if (activeProfile == null) {
			activeProfile = "dev";
			System.setProperty("spring.profiles.active", activeProfile);
		}
	}

}
