export function getUser() {
    return sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
}