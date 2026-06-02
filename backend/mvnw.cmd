@echo off
setlocal

set "MAVEN_VERSION=3.9.6"
set "MAVEN_URL=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/%MAVEN_VERSION%/apache-maven-%MAVEN_VERSION%-bin.zip"
set "WRAPPER_DIR=%~dp0.mvn\wrapper\dists"
set "MAVEN_HOME=%WRAPPER_DIR%\apache-maven-%MAVEN_VERSION%"
set "LOCAL_REPO=%~dp0.mvn\repository"

if not exist "%MAVEN_HOME%\bin\mvn.cmd" (
    echo Downloading Maven %MAVEN_VERSION%...
    if not exist "%WRAPPER_DIR%" mkdir "%WRAPPER_DIR%"
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%MAVEN_URL%' -OutFile '%WRAPPER_DIR%\maven.zip'"
    echo Extracting Maven %MAVEN_VERSION%...
    powershell -Command "Expand-Archive -Path '%WRAPPER_DIR%\maven.zip' -DestinationPath '%WRAPPER_DIR%' -Force"
    del "%WRAPPER_DIR%\maven.zip"
)

"%MAVEN_HOME%\bin\mvn.cmd" -Dmaven.repo.local="%LOCAL_REPO%" %*
