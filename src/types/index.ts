export enum Route {
    SIGN_IN = "/sign-in",
    SIGN_UP = "/sign-up",
}

export interface SignInDto {
    email: string;
    password: string;
}

export interface SignUpDto extends SignInDto {
    first_name: string;
    last_name: string;
}
