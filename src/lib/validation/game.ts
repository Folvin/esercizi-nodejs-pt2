import {Static, Type} from "@sinclair/typebox";

export const gameSchema = Type.Object(
  {
    game: Type.String(),
    releaseYear: Type.Integer(),
  },
  {additionalProperties: false}
);

export type GameData = Static<typeof gameSchema>;
