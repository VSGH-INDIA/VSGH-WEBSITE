import { draftMode } from "next/headers";

export async function isPreviewSession(): Promise<boolean> {
  const draft = await draftMode();
  return draft.isEnabled;
}
