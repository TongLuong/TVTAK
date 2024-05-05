import axiosInst from "../axios/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
const signIn = async (account, pass) => {
  return await axiosInst
    .get(`/api/user/signin?account=${account}&password=${pass}`)
    .catch((e) => console.log(e));
};
const signUp = async (body) => {
  return await axiosInst.post("/api/user/signup", body);
};

const createSchedule = async (user_id, device_id, schedule) => {
  console.log(user_id, device_id, schedule);
  return await axiosInst.post(
    `/api/schedule/create-schedule?user_id=${user_id}&device_id=${device_id}`,
    schedule
  );
};
const getAllSchedule = async (user_id) => {
  return await axiosInst.get(
    `/api/schedule/get-all-schedules?user_id=${user_id}`
  );
};
const deleteSchedule = async (user_id, schedule_id) => {
  return await axiosInst.delete(
    `/api/schedule/delete-schedule?user_id=${user_id}&schedule_id=${schedule_id}`
  );
};
const updateSchedule = async (user_id, schedule_id, schedule) => {
  return await axiosInst.post(
    `/api/schedule/edit-schedule?user_id=${user_id}&schedule_id=${schedule_id}`,
    schedule
  );
};
const createNewNote = async (user_id, note) => {
  return await axiosInst.post(
    `/api/note/create-new-note?user_id=${user_id}`,
    note
  );
};
const deleteNote = async (user_id, note_id) => {
  return await axiosInst.delete(
    `/api/note/delete-note?user_id=${user_id}&note_id=${note_id}`
  )
  .catch((e) => console.log(e));
};
const getAllNote = async (user_id) => {
  return await axiosInst
    .get(`/api/note/get-all-notes?user_id=${user_id}`)
    .catch((e) => console.log(e));
};
const editNote = async (user_id, note_id, note) => {
  return await axiosInst.post(
    `/api/note/edit-note?user_id=${user_id}&note_id=${note_id}`,
    note
  )
  .catch((e) => console.log(e));
};
const createNotification = async (user_id, notification) => {
  return await axiosInst
    .post(
      `/api/notification/create-notification?user_id=${user_id}`,
      notification
    )
    .catch((e) => console.log(e));
};
const getAllNotification = async (user_id) => {
  return await axiosInst.get(
    `/api/notification/get-all-notifications?user_id=${user_id}`
  )
  .catch(e => console.log(e));
};
const deleteNotification = async (user_id, notification_id) => {
  return await axiosInst.delete(
    `/api/notification/delete-notification?user_id=${user_id}&notification_id=${notification_id}`
  )
  .catch(e => console.log(e));
};

const addDevice = async (user_id, device) => {
  return await axiosInst.post(
    `api/device/add-device?user_id=${user_id}`,
    device
  );
};
const getAllDevice = async (user_id) => {
  return await axiosInst.get(`/api/device/get-all-devices?user_id=${user_id}`)
                        .catch(e => console.log(e));
};
const deleteDevice = async (user_id, device_id) => {
  return await axiosInst.delete(
    `api/device/delete-device?user_id=${user_id}&device_id=${device_id}`
  )
  .catch((e) => console.log(e));
};
const toggleDevice = async (user_id, device_id, status) => {
  return await axiosInst.post(
    `api/device/toggle-device?user_id=${user_id}&device_id=${device_id}&status=${status}`
  )
  .catch((e) => console.log(e));
};

const getRecord = async (device_name) => {
  console.log(device_name);
  return await axiosInst.get(`api/record/get-data?feed_id=${device_name}`);
};
const getRecordLast = async (device_name) => {
  return await axiosInst.get(`api/record/get-data-last?feed_id=${device_name}`);
};

const getDataByMonth = async (device_name, month, year) => {
  return await axiosInst.get(
    `api/record/get-data-by?feed_id=${device_name}&month=${month}&year=${year}`
  );
};
const getDeviceByScheduleId = async (schedule_id) => {
  return await axiosInst.get(
    `api/device/get-device-by-schedule?schedule_id=${schedule_id}`
  );
};
const getUserFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem("User");
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  } catch (error) {
    console.log(error);
  }
};
const setUserToStorage = async (user) => {
  const userDataString = JSON.stringify(user);
  await AsyncStorage.setItem("User", userDataString);
};
export {
  signIn,
  signUp,
  createSchedule,
  getAllSchedule,
  deleteSchedule,
  updateSchedule,
  createNewNote,
  deleteNote,
  getAllNote,
  editNote,
  createNotification,
  getAllNotification,
  deleteNotification,
  addDevice,
  getAllDevice,
  deleteDevice,
  toggleDevice,
  getRecord,
  getRecordLast,
  getDataByMonth,
  getDeviceByScheduleId,
  getUserFromStorage,
  setUserToStorage,
};
