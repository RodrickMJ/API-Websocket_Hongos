export default interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    rol: 'Administrador' | 'Asistente'
    passwordResetCode?: string,
    passwordResetExpire?: Date
}