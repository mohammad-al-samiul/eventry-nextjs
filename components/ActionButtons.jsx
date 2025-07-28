"use client";
import { addInterestedEvent } from "@/actions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

export default function ActionButtons({
  eventId,
  interested_ids,
  going_ids,
  fromDetails,
}) {
  const [isPending, setTrasition] = useTransition();
  const { auth } = useAuth();

  const isInterested = interested_ids?.find((id) => id === auth?.id);
  const isGoing = going_ids.find((id) => id === auth?.id);
  const [interested, setInterested] = useState(isInterested);
  const [going, setGoing] = useState(isGoing);

  const router = useRouter();

  const toggleInterest = async () => {
    if (auth) {
      await addInterestedEvent(eventId, auth?.id);
      setInterested(!interested);
    } else {
      router.push("/login");
    }
  };

  const markGoing = () => {
    if (auth) {
      router.push(`/payment/${eventId}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && "flex-1"}`}>
      <button
        onClick={() => setTrasition(() => toggleInterest())}
        className={`w-full ${
          interested && "bg-indigo-600 hover:bg-indigo-800"
        } `}
      >
        Interested
      </button>

      <button
        onClick={markGoing}
        disabled={auth && going}
        className=" text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1"
      >
        Going
      </button>
    </div>
  );
}
