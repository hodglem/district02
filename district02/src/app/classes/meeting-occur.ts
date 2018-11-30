import { Serializable } from './serializable';
import { Meetings } from './meeting';

export class MeetingOccur implements Serializable<MeetingOccur> {
    id: number;
    day: number;
    startTime: Date;
    endTime: Date;
    meetingses: Meetings[];


    deserialize(input: any): MeetingOccur {
        this.id = input.id;
        this.day = input.day;
        this.startTime = new Date(input.startTime);
        this.endTime = new Date(input.endTime);

        if (input.meetingses !== undefined) {
            this.meetingses = [];
            input.meetingses.array.forEach(element => {
                this.meetingses.push(new Meetings().deserialize(element));
            });
        }

        return this;
    }

}
