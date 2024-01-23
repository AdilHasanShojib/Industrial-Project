﻿using SocialAPI.THelpers;
using System.Text.Json;

namespace SocialAPI.TExtensions
{
    public static class HttpExtension
    {
        public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header)
        {
            var jsonOption = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(header, jsonOption));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
