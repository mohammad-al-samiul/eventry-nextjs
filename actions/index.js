"use server";

import EmailTemplate from "@/components/payment/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const {
  createUser,
  findUserByCredentials,
  updateInterest,
  updateGoing,
  getEventById,
} = require("@/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  await createUser(user);
  redirect("/login");
}

async function loginUser(formData) {
  try {
    let credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const userFound = await findUserByCredentials(credential);
    return userFound;
  } catch (err) {
    throw err;
  }
}

async function addInterestedEvent(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
  } catch (err) {
    throw err;
  }
  revalidatePath("/");
}

async function markGoingEvent(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (err) {
    throw err;
  }
  revalidatePath("/");
  redirect("/");
}

async function sendEmail(eventId, user) {
  try {
    const event = await getEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
    const sent = await resend.emails.send({
      from: "info@samiul.programmer.com",
      to: user?.email,
      subject: "Successfully Registered for the event!",
      react: EmailTemplate({ message }),
    });
    console.log({ sent });
  } catch (error) {
    throw error;
  }
}

export {
  registerUser,
  loginUser,
  addInterestedEvent,
  markGoingEvent,
  sendEmail,
};
