export interface userLogin {
    role: string,
    email: string,
    pwd: string
}

export const adminInfo: userLogin = {
    role: 'admin',
    email: 'admin@example.com',
    pwd: 'password'
}

export const userInfo: userLogin = {
    role: 'user',
    email: 'john@example.com',
    pwd: 'password'
}