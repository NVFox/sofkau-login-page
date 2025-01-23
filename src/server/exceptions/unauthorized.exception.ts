export default class UnathorizedException extends Error {
    public constructor(
        public message = "You are not authorized to access this resource"
    ) {
        super(message);
    }
}