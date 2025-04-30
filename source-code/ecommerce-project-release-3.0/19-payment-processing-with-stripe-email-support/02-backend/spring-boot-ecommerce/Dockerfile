## Use an official OpenJDK 11 image
#FROM openjdk:11-jdk-slim as build
#
## Set the working directory inside the container
#WORKDIR /app
#
## Copy the pom.xml and mvnw files first to leverage Docker cache
#COPY pom.xml mvnw ./
#COPY .mvn .mvn
#
## Fix line endings for mvnw and make it executable
#RUN apt-get update && apt-get install -y dos2unix && \
#    dos2unix mvnw && \
#    chmod +x mvnw
#
## Download dependencies offline (if needed)
#RUN ./mvnw dependency:go-offline -B
#
## Copy the rest of the application code
#COPY src ./src
#
## Build the Spring Boot application
#RUN ./mvnw clean package -DskipTests
#
## Create a new stage for the final runtime image
#FROM openjdk:11-jre-slim
#
## Set the working directory inside the container
#WORKDIR /app
#
## Copy the built .jar file from the previous stage
#COPY --from=build /app/target/spring-boot-ecommerce-0.0.1-SNAPSHOT.jar /app/app.jar
#
## Expose the port the app runs on
#EXPOSE 8080
#
## Set default environment variables (these can be overridden when running the container)
#ENV DB_URL=jdbc:mysql://10.88.0.2:3306/full-stack-ecommerce?useSSL=false&useUnicode=yes&characterEncoding=UTF-8&allowPublicKeyRetrieval=true&serverTimezone=UTC
#ENV DB_USERNAME=ecommerceapp
#ENV DB_PASSWORD=ecommerceapp
##ENV SERVER_PORT=8443
#
## Command to run the application
#ENTRYPOINT ["java", "-jar", "app.jar"]


###########################################################
############## - With layertools - ########################
###########################################################

#Command to build
#podman build -t spring-boot-ecommerce:latest .

# ---- Stage 1: Build the application ----
FROM openjdk:11-jdk-slim as build

WORKDIR /app

# Copy Maven files first to optimize Docker cache
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN apt-get update && apt-get install -y dos2unix && \
    dos2unix mvnw && chmod +x mvnw

RUN ./mvnw dependency:go-offline -B

# Copy the actual source code
COPY src ./src

# Build the Spring Boot application JAR with layers
RUN ./mvnw clean package -DskipTests -Pproduction

# Extract layers using layertools
RUN java -Djarmode=layertools -jar target/*.jar extract

# ---- Stage 2: Runtime image with layered JAR ----
FROM openjdk:11-jre-slim

WORKDIR /app

# Copy each layer from the build stage
#Dependencies, snapshot code, and application code are layered separately for faster rebuilds
COPY --from=build /app/dependencies/ ./
COPY --from=build /app/spring-boot-loader/ ./
COPY --from=build /app/snapshot-dependencies/ ./
COPY --from=build /app/application/ ./

EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "org.springframework.boot.loader.JarLauncher"]
