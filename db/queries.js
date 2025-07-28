import { EventModel } from "@/models/event-model";
import { UserModel } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/replace-mongo-id";
import mongoose, { mongo, Mongoose } from "mongoose";

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

  return replaceMongoIdInObject(user);
}

async function updateInterest(eventId, authId) {
  const foundEvent = await EventModel.findById(eventId);

  if (foundEvent) {
    const foundUsers = foundEvent.interested_ids.find(
      (id) => id.toString() === authId
    );
    if (foundUsers) {
      foundEvent.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      foundEvent.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
    await foundEvent.save();
  }
}

async function updateGoing(eventId, authId) {
  const event = await EventModel.findById(eventId);
  if (event) {
    event.going_ids.push(new mongoose.Types.ObjectId(authId));
  }
  event.save();
}

export {
  getAllEvents,
  getEventById,
  createUser,
  findUserByCredentials,
  updateInterest,
  updateGoing,
};
