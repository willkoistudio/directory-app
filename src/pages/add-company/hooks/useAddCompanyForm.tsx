import { z } from "zod";
import { AddCompanyFirstStep } from "../../../components/features/add-company-steps/first-step/AddCompanyFirstStep";
import { AddCompanySecondStep } from "../../../components/features/add-company-steps/second-step/AddCompanySecondStep";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStep } from "../../../models/form";
import styles from "../AddCompany.module.scss";
import { AddCompanyThirdStep } from "../../../components/features/add-company-steps/third-step/AddCompanyThirdStep";

export interface AddCompanyFormSchema {
  logo: string;
  logoFile?: File;
  name: string;
  phone: string;
  fax?: string;
  website?: string;
  notes?: string;
  area: string;
  address: {
    street: string;
    cityId: string;
    postalCode: string;
    stateId: string;
    countryId: string;
  };
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo en octets
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/webp"]; // Formats pris en charge

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Please upload a file smaller than 10 Mo.",
  })
  .refine((file) => SUPPORTED_FORMATS.includes(file.type), {
    message:
      "Please upload a valid image with the following formats : .jpg, .jpeg, .png, .webp.",
  });

export function useAddCompanyForm() {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    logo: z.string().min(1),
    logoFile: fileSchema.optional(),
    phone: z.string().min(1),
    fax: z.string().optional(),
    website: z.string().optional(),
    notes: z.string().optional(),
    area: z.string().min(1),
    address: z.object({
      street: z.string().min(1),
      cityId: z.string().min(1),
      postalCode: z.string().min(1),
      stateId: z.string().min(1),
      countryId: z.string().min(1),
    }),
  });

  const form: UseFormReturn<z.infer<typeof formSchema>> = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logo: "",
      phone: "",
      fax: "",
      website: "",
      notes: "",
      area: "",
      address: {
        street: "",
        cityId: "",
        postalCode: "",
        stateId: "",
        countryId: "",
      },
    },
  });

  const dispatchCurrentStep = (
    currentStep: number,
    {
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
        return <AddCompanyFirstStep {...form} />;
      case 2:
        return (
          <AddCompanySecondStep
            {...form}
            cities={cities}
            countries={countries}
            states={states}
            selectCountry={selectCountry}
            getCities={getCities}
            loadingLocations={loadingLocations}
          />
        );
      case 3:
        return (
          <AddCompanyThirdStep
            {...form}
            onSubmit={onSubmit}
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
