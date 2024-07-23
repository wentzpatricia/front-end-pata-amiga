import { UserInterface } from "../../../auth/register/_models/user.interface";

export interface EventInterface {
    uid?: string;
    date_at: Date;
    local: string;
    type: string;
    user?: UserInterface;
}