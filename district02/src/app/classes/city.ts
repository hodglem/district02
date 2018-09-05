import { Serializable } from './serializable';
import { MeetingLocation } from './meeting-location';

export class City implements Serializable<City> {
    cityId: number;
    name: string;
    meetingLocations: MeetingLocation[];

    deserialize(input: any): City {
        this.cityId = input.cityId;
        this.name = input.name;

        if (input.meetingLocations !== undefined) {
            this.meetingLocations = [];

            input.meetingLocations.forEach(value =>
                this.meetingLocations.push(new MeetingLocation().deserialize(value))
            );
        }

        return this;
    }

}
