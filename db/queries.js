import { EventModel } from "@/models/event-model";
import { replaceMongoIdInArray } from "@/utils/replace-mongo-id";

async function getAllEvents() {
  const allEvents = await EventModel.find().lean();
  return replaceMongoIdInArray(allEvents);
}

export { getAllEvents };
