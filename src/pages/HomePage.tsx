import IsAuth from "../utils/IsAuth";

function HomePageComp() {
  return <div></div>;
}

export const HomePage = IsAuth(HomePageComp);
