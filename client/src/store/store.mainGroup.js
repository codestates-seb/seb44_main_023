import create from "zustand";

const useMainGroupStore = create((set) => ({
  mainGroup: {
    todoGroup: {
      key: "",
      label: "",
    },
    ledgerGroup: {
      key: "",
      label: "",
    },
  },

  setMainGroup: async () => {
    try {
      const defaultMainGroup = localStorage.getItem("planfinity-group");
      if (defaultMainGroup) {
        set({ mainGroup: JSON.parse(defaultMainGroup) });
      }
    } catch (err) {
      console.log(err);
    }
  },

  updateMainGroup: async (data) => {
    try {
      set(({ mainGroup }) => {
        let newGroup = {
          ...mainGroup,
          [data.id]: JSON.parse(data.value),
        };
        localStorage.setItem("planfinity-group", JSON.stringify(newGroup));

        return {
          mainGroup: {
            ...newGroup,
          },
        };
      });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useMainGroupStore;
