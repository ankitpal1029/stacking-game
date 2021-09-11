export interface UserStatus{
    auth: Boolean;
    message: String;
    user: UserType;
}

export interface UserType{
    email: String;
    highscore: Number;
    name: String;
    password: String;
    _id: String;
}
