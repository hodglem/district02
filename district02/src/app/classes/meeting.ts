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
        this.id = input.id;
        this.name = input.name;
        this.meetingOccur = new MeetingOccur().deserialize(input.meetingOccur);

        if (input.optionses !== undefined) {
            input.optionses.forEach(element => {
                this.optionses.push(new Options().deserialize(element));
            });
        }


        return this;
    }

}
