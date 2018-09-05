import { Serializable } from './serializable';
import { Meetings } from './meeting';

export class Options implements Serializable<Options> {
    id: number;
    meetingOption: string;
    meetingses: Meetings[];

    deserialize(input: any): Options {
        this.id = input.id;
        this.meetingOption = input.meetingOption;

        if (input.meetingses !== undefined) {
            this.meetingses = [];

            input.meetingses.array.forEach(element => {
                this.meetingses.push(new Meetings().deserialize(input.meetingses));
            });
        }

        return this;
    }

}
