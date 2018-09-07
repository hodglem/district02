import { Serializable } from './serializable';
import { MeetingLocation } from './meeting-location';
import { MeetingOccur } from './meeting-occur';
import { Options } from './options';


export class Meetings implements Serializable<Meetings> {
    id: number;
    meetingLocation: MeetingLocation;
    meetingOccur: MeetingOccur;
    name: string;
    optionses: Options[];

    public deserialize(input: any) {
        this.meetingLocation = new MeetingLocation().deserialize(input.meetingLocation);
        this.optionses = [];

        if (input.options !== undefined) {
            input.optionses.array.forEach(element => {
                this.optionses.push(new Options().deserialize(element));
            });
        }


        return this;
    }

}
