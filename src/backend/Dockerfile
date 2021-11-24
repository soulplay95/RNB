FROM openjdk:11 AS builder
WORKDIR /backend
COPY . .
RUN chmod +x ./gradlew

RUN rm -rf src/test
RUN ./gradlew clean build

FROM adoptopenjdk:11-jdk
COPY --from=builder ./backend/build/libs/*.jar ./

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./backend-0.0.1-SNAPSHOT.jar"]

# FROM openjdk:11
# ARG JAR_FILE=build/libs/*.jar
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java", "-jar", "/app.jar"]