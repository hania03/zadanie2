# Wybieranie obrazu bazowego opartego na Ubuntu
FROM ubuntu:latest

# Dodanie Docker Scout do skanowania CVE
LABEL com.docker.scout.cve='true'

# Aktualizacja listy pakietów
RUN apt-get update

# Aktualizacja istniejących pakietów
RUN apt-get upgrade -y

# Instalacja pakietów
RUN apt-get install -y --no-install-recommends \
        openssl \
        expat \
        sudo \
        gnupg \
        git \
        openssh-client \
        libsasl2-2

# Usuwanie niepotrzebnych plików
RUN rm -rf /var/lib/apt/lists/*

# Tworzenie użytkownika i katalogu
RUN useradd -m static
USER static
WORKDIR /home/static

# Kopiowanie plików do katalogu użytkownika
COPY . /home/static

# Uruchomienie serwera
CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
