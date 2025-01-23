export default class StorageService {
    public retrieve<T>(key: string): T {
        return JSON.parse(localStorage.getItem(key) || "");
    }

    public store<T>(key: string, data: T) {
        localStorage.setItem(key, JSON.stringify(data))
    }
}