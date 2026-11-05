export type StaffCredential = {
  name: string;
  email: string;
  password: string;
  role: string;
  roleLabelEn: string;
  roleLabelFr: string;
};

export const STAFF_CREDENTIALS: StaffCredential[] = [
  {
    name: "Hervé Memba",
    email: "hervememba2@gmail.com",
    password: "Herve#Gloprofas2026",
    role: "super-administrator",
    roleLabelEn: "Super Administrator",
    roleLabelFr: "Super administrateur",
  },
  {
    name: "Ngwam",
    email: "ngwam2002@yahoo.com",
    password: "Ngwam#Gloprofas2026",
    role: "super-administrator",
    roleLabelEn: "Super Administrator",
    roleLabelFr: "Super administrateur",
  },
];
