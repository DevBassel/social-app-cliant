import { useContext } from "react";
import { ActiveChateContext } from "../../context/activeChateContext";

function useActiveChate() {
  const activeChate = useContext(ActiveChateContext);
  return { ...activeChate };
}

export default useActiveChate;
