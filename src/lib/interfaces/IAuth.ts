export interface IRegister{
    name: string,
    email: string,
    password: string
    rePassword: string,
    phone: string
}

export interface ILogin{
    email: string,
    password: string
}   