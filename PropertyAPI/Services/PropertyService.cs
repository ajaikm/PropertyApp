using Azure.Storage.Blobs;
using PropertyAPI.Models;
using System.Text.Json;

namespace PropertyAPI.Services
{
    public class PropertyService : IPropertyService
    {       
        private readonly string _blobUrl;
        private readonly string _sasToken;

        public PropertyService(IConfiguration configuration)
        {
            _blobUrl = configuration["AzureBlobStorage:BlobUrl"] ?? throw new ArgumentNullException("BlobUrl not configured");
            _sasToken = configuration["AzureBlobStorage:SasToken"] ?? throw new ArgumentNullException("SasToken not configured");
        }
        public async Task<List<Property>> GetPropertiesAsync()
        {
            try
            {
                var blobClient = new BlobClient(new Uri($"{_blobUrl}{_sasToken}"));
                var response = await blobClient.DownloadContentAsync();
                var json = response.Value.Content.ToString();

                return JsonSerializer.Deserialize<List<Property>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? new List<Property>();
            }
            catch (Exception ex)
            {
                // Log error (use ILogger in real projects)
                throw new ApplicationException("Error fetching properties from Blob Storage", ex);
            }
        }
    }
}
