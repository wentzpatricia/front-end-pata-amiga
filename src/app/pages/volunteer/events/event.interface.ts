import { Timestamp } from "firebase/firestore";
import { UserInterface } from "../../../auth/register/_models/user.interface";

export interface EventInterface {
    uid?: string | undefined;
    date_at: Date | Timestamp;
    local: string;
    type: string;
    user?: UserInterface | undefined;
}