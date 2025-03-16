export default interface UserResponse {
    id: string;
    name: string;
    email: string;
    token: string;
    rol: 'Administrador' | 'Asistente'
}