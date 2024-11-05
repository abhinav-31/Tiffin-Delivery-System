package com.tiffin;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TiffinDeliveryAndManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(TiffinDeliveryAndManagementSystemApplication.class, args);

		

	}

    // equivalent to <bean id ..../> in xml file
    @Bean
    ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration()
				.setMatchingStrategy(MatchingStrategies.STRICT)
				.setPropertyCondition(Conditions.isNotNull());
		return modelMapper;
	}

}
