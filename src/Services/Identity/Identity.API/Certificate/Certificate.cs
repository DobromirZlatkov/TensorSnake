﻿namespace TensorSnake.Services.Identity.API.Certificates
{
    using System.IO;
    using System.Reflection;
    using System.Security.Cryptography.X509Certificates;

    static class Certificate
    {
        public static X509Certificate2 Get()
        {
            var assembly = typeof(Certificate).GetTypeInfo().Assembly;
            var names = assembly.GetManifestResourceNames();

            string[] result = assembly.GetManifestResourceNames();
            using (var stream = assembly.GetManifestResourceStream("TensorSnake.Services.Identity.API.Certificate.idsrv3test.pfx"))
            {
                return new X509Certificate2(ReadStream(stream), "idsrv3test");
            }
        }

        public static byte[] ReadStream(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
    }
}
