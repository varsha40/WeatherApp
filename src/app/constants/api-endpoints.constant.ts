const BASE_URL =  "http://localhost:8083/location";
export const API_ENDPOINTS = {
    GET_WEATHER_INFO_FOR_LOCATION : (location : string) => `${BASE_URL}/${location}`,
    SAVE_LOCATION : (locationName : string) => `${BASE_URL}/${locationName}`,
    DELETE_LOCATION:(location : string) => `${BASE_URL}/${location}`,
    GET_LOCATION_INFO:(locationName : string) => `${BASE_URL}/all-info/${locationName}`,
    UPDATE_LOCATION_ORDER : `${BASE_URL}/location-order`,
    GET_ALL_LOCATIONS:  `${BASE_URL}/all`
};