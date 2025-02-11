using Microsoft.AspNetCore.Mvc;
using PropertyAPI.Services;

namespace PropertyAPI.Controllers
{
    [ApiController]
    [Route("api/properties")]
    public class PropertiesController : ControllerBase
    {
       
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProperties()
        {
            try
            {
                var properties = await _propertyService.GetPropertiesAsync();
                return Ok(properties);
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving data", error = ex.Message });
            }
        }
    }
}
