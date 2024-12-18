import { t } from "i18next";
import { FormFieldData } from "../../../../const/form";

export const fieldsData: FormFieldData[] = [
  {
    name: "fax",
    label: t("addContact.step3.fax"),
    type: "text",
  },
  {
    name: "notes",
    label: t("addContact.step3.notes"),
    type: "textarea",
  },
  {
    name: "website",
    label: t("addContact.step3.website"),
    type: "url",
  },
  {
    name: "workPhone",
    label: t("addContact.step3.workPhone"),
    type: "tel",
  },
];
