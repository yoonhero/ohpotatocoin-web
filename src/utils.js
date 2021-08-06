
export function GetWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const DB_Address = "http://ec2-13-125-8-152.ap-northeast-2.compute.amazonaws.com:4000"
