export default {
  terms: "company/terms",
  requirements: "application/requirements",
  login: `auth/login`,
  register: `auth/register`,
  verify: `auth/verify`,
  passwordReset: `auth/password-reset`,
  password: `auth/password`,
  logout: `auth/logout`,
  user: `auth/user`,
  activate: `profile/activation/request`,
  searchMember: (MemberNo) => `profile/search/member?MemberNo=${MemberNo}`,
};
