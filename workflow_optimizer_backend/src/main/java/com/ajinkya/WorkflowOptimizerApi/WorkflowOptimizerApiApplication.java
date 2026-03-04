package com.ajinkya.WorkflowOptimizerApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class WorkflowOptimizerApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorkflowOptimizerApiApplication.class, args);
	}

}
