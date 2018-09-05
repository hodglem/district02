import { Serializable } from './serializable';
import { MeetingLocation } from './meeting-location';
import { MeetingOccur } from './meeting-occur';


export class Meetings implements Serializable<Meetings> {
    id: number;
    meetingLocation: MeetingLocation;
    meetingOccur: MeetingOccur;
    name: string;


    public deserialize(input: any) {
        this.meetingLocation = new MeetingLocation().deserialize(input.meetingLocation);
        return this;
    }

}
