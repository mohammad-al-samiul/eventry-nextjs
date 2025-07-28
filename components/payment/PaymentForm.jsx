"use client";
import { markGoingEvent } from "@/actions";
import { useAuth } from "@/hooks/useAuth";

export default function PaymentForm({ eventId }) {
  const { auth } = useAuth();

  async function handleSubmit(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const card = formData.get("card");
    const expiry = formData.get("expiry");
    const cvv = formData.get("cvv");
    const formInfo = { name, email, card, expiry, cvv };

    await markGoingEvent(eventId, auth);
  }
  return (
    <form action={handleSubmit}>
      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          name="name"
          type="text"
          id="name"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          name="email"
          type="email"
          id="email"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">
          Card Number
        </label>
        <input
          name="card"
          type="text"
          id="card"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">
          Expiry Date
        </label>
        <input
          name="expiry"
          type="text"
          id="expiry"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          name="cvv"
          type="text"
          id="cvv"
          className="w-full bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full my-8 bg-indigo-600 hover:bg-indigo-800 py-2 rounded-md"
      >
        Pay Now
      </button>
    </form>
  );
}
