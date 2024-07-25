import { UserTypeEnum } from "../../../core/_utils/UserType.enum";

export interface UserInterface {
    uid: string;
    email?: string;
    userType?: UserTypeEnum;
    events?: [];
}