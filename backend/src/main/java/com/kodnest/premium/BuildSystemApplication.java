package com.kodnest.premium;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BuildSystemApplication {

    public static void main(String[] args) {
        System.out.println("Starting KodNest Premium Build System Backend...");
        SpringApplication.run(BuildSystemApplication.class, args);
    }
}
