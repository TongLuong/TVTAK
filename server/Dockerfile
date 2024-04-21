# first stage
FROM eclipse-temurin:21 as builder

COPY mvnw pom.xml ./

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
RUN ./mvnw clean install

# second stage
FROM eclipse-temurin:21
EXPOSE 8080
COPY --from=builder /target/*.jar /*.jar
ENTRYPOINT [&amp;quot;java&amp;quot;, &amp;quot;-jar&amp;quot;, &amp;quot;/docker/*.jar&amp;quot;]