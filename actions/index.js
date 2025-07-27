"use server";

import { revalidatePath } from "next/cache";

const {
  createUser,
  findUserByCredentials,
  updateInterest,
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

export { registerUser, loginUser, addInterestedEvent };
