import { city_data } from './area.data';

export const getProvinces = () => {
    const provinces = [];
    // tslint:disable-next-line:forin
    for (const province in city_data) {
        provinces.push(province);
    }
    return provinces;
};

export const getCitiesByProvince = (province: string) => {
    console.log(province);
    if (!province || !city_data[province]) {
        return [];
    }
    const cities = [];
    const val = city_data[province];
    // tslint:disable-next-line:forin
    for (const city in val) {
        cities.push(city);
    }
    return cities;
};

export const getAreaByCity = (province: string, city: string) => {
    if (!province || !city || !city_data[province] || !city_data[province][city]) {
        return [];
    }
    return city_data[province][city];
};
