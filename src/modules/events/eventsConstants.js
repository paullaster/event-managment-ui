export default {
  EVENTS: "events/setup/events",
  SAVE_EVENT: "events",
  SHOW_EVENT: (no) => `events/show?no=${no}`,
  UPDATE_EVENT: "events/update",
  DELETE_EVENT: "events/destroy",
  DELETE_PACKAGE: "events/deletePackage",
  eventPackages: "events/setup/packages",
  SEND_FOR_APPROVAL: "events/sendForApproval",
  CANCEL_APPROVAL: "events/cancelApproval",
  REOPEN_DOCUMENT: "events/reopenDocument",
  ACTIVATE_EVENT: "events/activateEvent",
  END_EVENT: "events/endEvent",
  DELETE_ATTACHMENT: "events/deleteAttachment",

};
