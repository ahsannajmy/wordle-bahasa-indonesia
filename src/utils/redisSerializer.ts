import { Words } from "@/interface/models";

export function serializedWords(w: Words): Record<string, string> {
  return {
    arti: w.arti,
    type: w.type.toString(),
    word: w.word,
    _id: w._id.toString(),
  };
}

export function deserializedWords(hash: Record<string, string>): Words {
  return {
    arti: hash.arti,
    type: parseInt(hash.type),
    word: hash.word,
    _id: parseInt(hash._id),
  };
}
