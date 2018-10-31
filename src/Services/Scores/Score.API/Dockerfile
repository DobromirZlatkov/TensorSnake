FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY ["src/Services/Scores/Score.API/Score.API.csproj", "src/Services/Scores/Score.API/"]
COPY ["src/BuildingBlocks/WebHost/WebHost.Customization/WebHost.Customization.csproj", "src/BuildingBlocks/WebHost/WebHost.Customization/"]
COPY ["src/Services/Scores/Data/Score.Data/Score.Data.csproj", "src/Services/Scores/Data/Score.Data/"]
COPY ["src/Services/Scores/Data/Score.Data.Common/Score.Data.Common.csproj", "src/Services/Scores/Data/Score.Data.Common/"]
COPY ["src/Services/Scores/Data/Score.Data.Models/Score.Data.Models.csproj", "src/Services/Scores/Data/Score.Data.Models/"]
COPY ["src/Services/Scores/Services/Score.Services.Data/Score.Services.Data.csproj", "src/Services/Scores/Services/Score.Services.Data/"]
RUN dotnet restore "src/Services/Scores/Score.API/Score.API.csproj"
COPY . .
WORKDIR "/src/src/Services/Scores/Score.API"
RUN dotnet build "Score.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Score.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .

CMD ASPNETCORE_URLS=http://*:$PORT dotnet Score.API.dll