import AsyncStorage from "@react-native-community/async-storage";


export const saveData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e)
  }
};

export const getData = async (key) => {
  try {
        return AsyncStorage.getItem(key)
    } catch(e) {
    console.log(e)
  }
};

export const remove = async (key) => {
    try {
        await AsyncStorage.removeItem(key) 
    } catch (e) {
        console.log(e)
    }
};
