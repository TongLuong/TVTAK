# first stage
FROM ubuntu:22.04 as builder
RUN apt-get update
WORKDIR /docker

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline
COPY src ./src

RUN ./mvnw clean install

# second stage
FROM ubuntu:22.04
WORKDIR /docker
EXPOSE 8080
COPY --from=builder /docker/target/*.jar /docker/*.jar
ENTRYPOINT [&amp;quot;java&amp;quot;, &amp;quot;-jar&amp;quot;, &amp;quot;/docker/*.jar&amp;quot;]