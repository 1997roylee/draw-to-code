import { create } from "zustand";

import { rawPicture2Html } from "@/utils/openai";

export type OpenAIState = {
  preview: string | null;
  isLoading: boolean;
};

export type OpenAIActions = {
  predict: (prompt: string, base64: string) => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
};

export type OpenAIStore = OpenAIState & OpenAIActions;

export const useOpenAIStore = create<OpenAIStore>((set, get) => ({
  preview: null,
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {
    set(() => ({
      isLoading,
    }));
  },
  predict: async (prompt: string, base64: string) => {
    get().setIsLoading(true);
    const result = await rawPicture2Html(prompt, base64);

    if (result.ok) {
      set(() => ({
        preview: result.data,
        isLoading: false,
      }));
    } else
      set(() => ({
        isLoading: false,
      }));
  },
}));

export default useOpenAIStore;
