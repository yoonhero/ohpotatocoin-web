
export function GetWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const DB_Address = "http://ec2-3-35-101-66.ap-northeast-2.compute.amazonaws.com:4000"
