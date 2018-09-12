import { Serializable } from './serializable';
import { City } from './city';
import { Meetings } from './meeting';


export class MeetingLocation implements Serializable<MeetingLocation> {
    id: number;
    city: City;
    name: string;
    address: string;
    lat: number;
    lon: number;
    meetingses: Meetings[];

    deserialize(input: any): MeetingLocation {
        this.id = input.id;
        this.city = new City().deserialize(input.city);
        this.name = input.name;
        this.lat = input.lat;
        this.lon = input.lon;
        this.address = input.address;

        if (input.meetingses !== undefined) {
            input.meetingses.array.forEach(element => {
                this.meetingses.push(new Meetings().deserialize(element));
            });
        }

        return this;
    }

}
