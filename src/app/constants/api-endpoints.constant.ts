const BASE_URL1 = "http://localhost:8082";
const BASE_URL2 =  "http://localhost:8083/location";
export const API_ENDPOINTS = {
    // GET_WEATHER_INFO_FOR_LOCATION : (location : string) => `${BASE_URL1}/weatherInfo/${location}`,
    GET_WEATHER_INFO_FOR_LOCATION : (location : string) => `${BASE_URL2}/${location}`,
    SAVE_LOCATION : (locationName : string) => `${BASE_URL2}/${locationName}`,
    DELETE_LOCATION:(locationId : number) => `${BASE_URL2}/${locationId}`,
    GET_LOCATION_INFO:(locationName : string) => `${BASE_URL2}/all-info/${locationName}`
};