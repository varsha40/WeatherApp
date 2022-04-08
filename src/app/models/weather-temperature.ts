export class WeatherTemperature {
    constructor(
        public locationId: number,
        public locationName: string,
        public minTemp: number,
        public maxTemp: number,
        public text: string,
        public icon: string
    ) { }
}
