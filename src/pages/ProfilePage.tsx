import IsAuth from "../utils/IsAuth";

function Profile() {
  return <div>ProfilePage</div>;
}

export const ProfilePage = IsAuth(Profile);
