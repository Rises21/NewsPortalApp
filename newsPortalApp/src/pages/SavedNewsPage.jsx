import { useOutletContext } from "react-router-dom";

const SavedNewsPage = () => {
  const { userAuth, cbAuth } = useOutletContext();
  console.log(userAuth);
  return (
    <div>
      <div onClick={cbAuth}>{userAuth}</div>
    </div>
  );
};

export default SavedNewsPage;
