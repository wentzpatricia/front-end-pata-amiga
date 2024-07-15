import { EventTypeEnum } from "../../../core/_utils/EventTypeEnum.enum";

export interface EventInterface {
    date_at: Date;
    address: string;
    eventType?: EventTypeEnum;
}