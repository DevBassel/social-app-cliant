import { Outlet } from "react-router-dom";
import { SideBar } from "../components/ui/SideBar";
import { CallEvents } from "../types/socket/call-events.enum";
import { useEffect, useState } from "react";
import useSocket from "../hooks/common/useSocket";
import { HaveCall } from "../types/HaveCall.interface";
import CallOffer from "../components/models/CallOffer";
export default function AuthLayout() {
  const { socket, peer } = useSocket();
  const [call, setCall] = useState<HaveCall>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    socket.on(CallEvents.CALL_OFFER, (data) => {
      console.log(data);
      setCall(data.payload);
      setOpen(true);
    });

    return () => {
      socket.off(CallEvents.CALL_OFFER);
    };
  }, [peer, socket]);
  console.log(call);
  return (
    <div className="flex h-screen">
      {call && (
        <CallOffer isopen={open} data={call} close={() => setOpen(false)} />
      )}
      <SideBar />
      <Outlet />
    </div>
  );
}
