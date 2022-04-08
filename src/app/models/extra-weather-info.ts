export class ExtraWeatherInfo {
    constructor(
        public airQuality: number,
        public uv: number,
        public temp: number,
        public precipitation: number,
        public willItSnow: number
    ) { }
}
