import { EventModel } from "@/models/event-model";
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

export { getAllEvents, getEventById };
