export class HeaderWeatherInfo {
    constructor(
        public locationName: string,
        public currentWeatherstatus: string,
        public temperature: number,
        public tempfeelslike: number,
        public day: string

    ) { }
}
