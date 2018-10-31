namespace TensorSnake.Services.Identity.API.Configuration
{
    using IdentityServer4;
    using IdentityServer4.Models;
    using System.Collections.Generic;

    public class Config
    {
        /// <summary>
        /// Defines apis in the system
        /// </summary>
        /// <returns>List of api resources</returns>
        public static IEnumerable<ApiResource> GetApis()
        {
            return new List<ApiResource>
            {
                new ApiResource("score", "Scores API"),
            };
        }

        /// <summary>
        /// http://docs.identityserver.io/en/release/configuration/resources.html
        /// </summary>
        /// <returns>List of identity resources</returns>
        public static IEnumerable<IdentityResource> GetResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        /// <summary>
        /// Client want to access resources (aka scopes)
        /// </summary>
        /// <param name="clientsUrl"></param>
        /// <returns></returns>
        public static IEnumerable<Client> GetClients(Dictionary<string, string> clientsUrl)
        {
            var test = GrantTypes.ResourceOwnerPassword;

            return new List<Client>
            {
                new Client
                {
                    ClientId = "spa",
                    ClientName = "Spa Client",
                    ClientSecrets = new List<Secret>
                    {
                        new Secret("secret".Sha256())
                    },
                    ClientUri = $"{clientsUrl["Spa"]}",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowOfflineAccess = true,
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        "score"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                         $"{clientsUrl["Spa"]}",
                         "http://localhost:3000"
                    }
                },
                new Client
                {
                    ClientId = "scoresswaggerui",
                    ClientName = "Scores Swagger UI",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris = { $"{clientsUrl["ScoreApi"]}/swagger/oauth2-redirect.html" },
                    PostLogoutRedirectUris = { $"{clientsUrl["ScoreApi"]}/swagger/" },

                    AllowedScopes =
                    {
                        "score"
                    }
                },
            };
        }
    }
}
