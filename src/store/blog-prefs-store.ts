import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/** Formats in which to view the blog. */
export type BlogFormat =
  | "full" // Full, with images in a grid format, descriptions.
  | "simplified"; // Tabloid format, small images, short descriptions.

interface BlogPreferenceState {
  preferredFormat: BlogFormat;
  setPreferredFormat: (newFormat: BlogFormat) => void;
}

export const useBlogPreferenceStore = create<BlogPreferenceState>()(
  persist(
    (set) => ({
      preferredFormat: "full",
      setPreferredFormat: (newFormat: BlogFormat) => {
        set(() => ({ preferredFormat: newFormat }));
      },
    }),
    {
      name: "blog-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
