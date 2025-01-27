import { z } from "zod";
import { AddContactFifthStep } from "../../../components/features/add-contact-steps/fifth-step/AddContactFifthStep";
import { AddContactFirstStep } from "../../../components/features/add-contact-steps/first-step/AddContactFirstStep";
import { AddContactFourthStep } from "../../../components/features/add-contact-steps/fourth-step/AddContactFourthStep";
import { AddContactSecondStep } from "../../../components/features/add-contact-steps/second-step/AddContactSecondStep";
import { AddContactThirdStep } from "../../../components/features/add-contact-steps/third-step/AddContactThirdStep";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStep } from "../../../models/form";
import styles from "../AddContact.module.scss";
import { t } from "i18next";

export interface AddContactFormSchema {
  name: string;
  avatar: string;
  avatarFile?: File;
  companyId: string;
  function: string;
  email: string;
  phone: string;
  workPhone?: string;
  fax?: string;
  website?: string;
  notes?: string;
  address: {
    street: string;
    cityId: string;
    postalCode: string;
    stateId: string;
    countryId: string;
  };
  keywords: string[];
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo en octets
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"]; // Formats pris en charge

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Please upload a file smaller than 10 Mo.",
  })
  .refine((file) => SUPPORTED_FORMATS.includes(file.type), {
    message: t("addContact.formErrorAvatar"),
  });

export function useAddContactForm() {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    avatar: z.string().min(1),
    avatarFile: fileSchema.optional(),
    companyId: z.string().min(1),
    function: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    workPhone: z.string().optional(),
    fax: z.string().optional(),
    website: z.string().optional(),
    notes: z.string().optional(),
    address: z.object({
      street: z.string().min(1),
      cityId: z.string().min(1),
      postalCode: z.string().min(1),
      stateId: z.string().min(1),
      countryId: z.string().min(1),
    }),
    keywords: z.array(z.string()).min(1),
  });

  const form: UseFormReturn<z.infer<typeof formSchema>> = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      avatar: "",
      companyId: "",
      function: "",
      email: "",
      phone: "",
      workPhone: "",
      fax: "",
      website: "",
      notes: "",
      address: {
        street: "",
        cityId: "",
        postalCode: "",
        stateId: "",
        countryId: "",
      },
      keywords: [],
    },
  });

  const dispatchCurrentStep = (
    currentStep: number,
    {
      companies,
      cities,
      countries,
      states,
      selectCountry,
      getCities,
      loadingLocations,
      onSubmit,
    }: any
  ) => {
    switch (currentStep) {
      case 1:
        return <AddContactFirstStep {...form} />;
      case 2:
        return (
          <AddContactSecondStep
            {...form}
            companies={companies}
            cities={cities}
            countries={countries}
            states={states}
            selectCountry={selectCountry}
            getCities={getCities}
            loadingLocations={loadingLocations}
          />
        );
      case 3:
        return <AddContactThirdStep {...form} />;
      case 4:
        return <AddContactFourthStep {...form} />;
      case 5:
        return (
          <AddContactFifthStep
            {...form}
            onSubmit={onSubmit}
            companies={companies}
            countries={countries}
            states={states}
            cities={cities}
          />
        );
      default:
        return;
    }
  };

  const stepsIconColor = (step: FormStep, currentStep: number) => {
    if (step.isCompleted) {
      return `${styles["step-completed"]} bg-green border-green `;
    } else if (step.stepNumber === currentStep) {
      return "bg-red border-red";
    } else {
      return "bg-gray/20 border-gray/20";
    }
  };

  return {
    dispatchCurrentStep,
    stepsIconColor,
    form,
  };
}
