import create from "zustand";

const store = (set) => ({
  errorMessage: "",
  setErrorMessage: (message) =>
    set(() => ({ errorMessage: message })),
});

export const useValidationStore = create()(
  import.meta.DEV ? devtools(store) : store
);
