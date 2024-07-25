import { UserTypeEnum } from "../../../core/_utils/UserType.enum";

export interface UserInterface {
    email?: string;
    userType?: UserTypeEnum;
    events?: [];
}