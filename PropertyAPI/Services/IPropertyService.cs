using PropertyAPI.Models;

namespace PropertyAPI.Services
{
    public interface IPropertyService
    {
        Task<List<Property>> GetPropertiesAsync();
    }

}
