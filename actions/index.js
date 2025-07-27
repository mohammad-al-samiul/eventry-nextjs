"use server";

const { createUser, findUserByCredentials } = require("@/db/queries");
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
    if (userFound) {
      redirect("/");
    }
  } catch (err) {
    throw err;
  }
}

export { registerUser, loginUser };
