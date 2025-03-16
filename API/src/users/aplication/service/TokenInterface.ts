export default interface TokenInterface {
    generateToken(id: string): string;
    validateToken(id: string): boolean;
    getPayload(token: string): string | null;
}