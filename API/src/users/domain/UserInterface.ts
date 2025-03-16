export default interface UserInterface{
    id: string,
    name: string,
    email: string,
    password: string,
    rol: 'Administrador' | 'Asistente',
    passwordResetCode?: string,
    passwordResetExpires?: Date
}