using PropertyAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register IPropertyService with configuration
builder.Services.AddScoped<IPropertyService, PropertyService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactAppOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // React app running on port 3000
               .AllowAnyMethod() // Allows GET, POST, PUT, DELETE, etc.  Be specific if possible.
               .AllowAnyHeader(); // Allows any header. Be specific if possible.
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowReactAppOrigin");

app.MapControllers();

app.Run();
