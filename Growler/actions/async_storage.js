import AsyncStorage from "@react-native-community/async-storage";


export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("Didn't save data");
  }
};

export const getData = async (key) => {
  try {
      return await AsyncStorage.getItem(key);
    } catch(e) {
    console.log("Didn't get data");
  }
};

export const remove = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log("Didn't remove data");
    }
};
