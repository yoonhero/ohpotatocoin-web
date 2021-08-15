
export function GetWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const DB_Address = process.env.NODE_ENV === "production" ? "https://ohpotatocoin.herokuapp.com" : "http://localhost:4000"
