import { invoke } from "@tauri-apps/api/primitives";

export function checkDb() {
  return invoke<200 | 400>("check_db");
}

export function getCompany(id: number | null) {
  return invoke<Company | null>("get_company", { id });
}

export function createCompany(data: CreateCompanyData) {
  return invoke<number>("create_company", { data });
}

export function migrateAndPopulate() {
  return invoke("migrate_and_populate");
}

export type CreateCompanyData = {
  name: string;
  cin: string;
  vatId: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
};

export type Company = {
  id: number;
  name: string;
  cin: string | null;
  vatId: string | null;
  street: string;
  city: string;
  postalCode: string;
  phoneNumber: string | null;
  email: string | null;
};
