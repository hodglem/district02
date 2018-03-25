

export class MeetingModel {
    city: string;
    day: string;
    time: string;
    meetingName: string;
    location: string;
    address: string;
    type: string;
    latitiude : number;
    longitude : number;
    


    public deserialize(meetingEntry: string) {

        const values: string[] = meetingEntry.split(',', 7);

        this.city = values[0];
        this.day = values[1];
        this.time = values[2];
        this.meetingName = values[3];
        this.location = values[4];
        this.address = values[5];
        this.type = values[6];
    }

}