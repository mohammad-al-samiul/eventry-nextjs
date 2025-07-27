import { EventModel } from "@/models/event-model";
import { UserModel } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/replace-mongo-id";

async function getAllEvents() {
  const allEvents = await EventModel.find().lean();
  return replaceMongoIdInArray(allEvents);
}

async function getEventById(eventId) {
  const event = await EventModel.findById(eventId).lean();
  return replaceMongoIdInObject(event);
}

async function createUser(user) {
  const createdUser = await UserModel.create(user);
  return createdUser;
}

async function findUserByCredentials(credential) {
  const user = await UserModel.findOne(credential).lean();
  return user;
}

export { getAllEvents, getEventById, createUser, findUserByCredentials };
