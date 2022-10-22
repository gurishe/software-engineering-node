/**
 * @file The implementation of a Location which is just a latitude and longitude representing
 * a User's home or chosen location.
 */

/**
 * A class representing a User's location which holds the latitude and longitude of the location.
 * @property {number} latitude The latitude degree of the location
 * @property {number} longitude The longitude degree of the location
 */
export default class Location {
    public latitude: number = 0.0;
    public longitude: number = 0.0;
};
