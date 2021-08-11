
export function GetWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const DB_Address = "https://ohpotatocoin.herokuapp.com"
