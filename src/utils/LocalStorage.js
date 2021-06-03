export const GetDataFromStorage = key => {
  try {
    const _data = localStorage.getItem(key);
    return _data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const SetDataToStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const ClearStorage = () => {
  localStorage.clear();
};
