# first stage
FROM eclipse-temurin:17-jdk as builder

COPY .mvn/ .mvn
COPY mvnw pom.xml ./

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

COPY ./src ./src
# RUN ./mvnw spring-boot:run

RUN ./mvnw clean install

# second stage
FROM eclipse-temurin:17-jdk
EXPOSE 8080
COPY --from=builder /target/*.jar /*.jar
ENTRYPOINT ["java","-jar", "/*.jar"]