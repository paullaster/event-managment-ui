export default {
  DELEGATES: "delegates",
  GET_DELEGATE: (params) => `delegates/show?${getParams(params)}`,
  UPDATE_DELEGATE: "delegates/update",
  DELETE_DELEGATE: "delegates/delete",
  VERIFY_FINGERPRINT: "biometric/verify",
  REGISTER_FINGERPRINT: "biometric/register",
  MANUAL_CHECKIN: "delegates/manualCheckin",
  SYNC_ATTENDANCE: "delegates/syncAttendance",
  getReport: ({ no, entity }) => `/delegates/reports/${entity}?eventNo=${no}`,
  editAttendeePay: "delegates/editAttendeePay",
  addAttendeePay: "delegates/addAttendeePay",
  syncDelegates: "delegates/syncDelegates",
};

function getParams(params) {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");
}
