import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export interface BtnSource {
  id: string;
  itemName: string;
  itemRawCode: string;
}
export interface Sources {
  btnList: Array<BtnSource>;
  panelList: Array<BtnSource>;
  tableList: Array<BtnSource>;
}
export interface SourceList {
  [key: string]: Sources;
}

export const useUserStore = defineStore("user", () => {
  const token = useStorage("token", "");
  const sourceList = ref<SourceList>({});

  function setToken(val: string) {
    token.value = val;
  }

  function setSourceList(val: SourceList) {
    sourceList.value = val;
  }

  return { token, setToken, sourceList, setSourceList };
});
