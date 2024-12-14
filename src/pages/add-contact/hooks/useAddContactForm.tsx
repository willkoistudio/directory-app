import { z } from "zod";
import { AddContactFifthStep } from "../../../components/features/add-contact-steps/AddContactFifthStep";
import { AddContactFirstStep } from "../../../components/features/add-contact-steps/AddContactFirstStep";
import { AddContactFourthStep } from "../../../components/features/add-contact-steps/AddContactFourthStep";
import { AddContactSecondStep } from "../../../components/features/add-contact-steps/AddContactSecondStep";
import { AddContactThirdStep } from "../../../components/features/add-contact-steps/AddContactThirdStep";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStep } from "../../../models/form";
import styles from "../AddContact.module.scss";

export interface AddContactFormSchema {
  name: string;
  avatar: string;
  avatarFile?: File;
  company: string;
  function: string;
  email: string;
  phone: string;
  workPhone: string;
  fax: string;
  website: string;
  notes: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
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
    message:
      "Please upload a valid image with the following formats : .jpg, .jpeg, .png, .webp.",
  });

export function useAddContactForm() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    avatar: z.string().min(1),
    avatarFile: fileSchema.optional(),
    company: z.string().min(1),
    function: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    workPhone: z.string(),
    fax: z.string(),
    website: z.string(),
    notes: z.string(),
    address: z.object({
      street: z.string().min(1),
      city: z.string().min(1),
      postalCode: z.string().min(1),
      state: z.string().min(1),
      country: z.string().min(1),
    }),
    keywords: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      avatar: "",
      company: "",
      function: "",
      email: "",
      phone: "",
      workPhone: "",
      fax: "",
      website: "",
      notes: "",
      address: {
        street: "",
        city: "",
        postalCode: "",
        state: "",
        country: "",
      },
      keywords: [],
    },
  });

  const addContactSteps: FormStep[] = [
    {
      name: "Photo",
      stepNumber: 1,
      isCompleted: false,
    },

    {
      name: "Primary infos",
      stepNumber: 2,
      isCompleted: false,
    },
    {
      name: "Secondary infos",
      stepNumber: 3,
      isCompleted: false,
    },
    {
      name: "Keywords",
      stepNumber: 4,
      isCompleted: false,
    },
    {
      name: "Summary",
      stepNumber: 5,
      isCompleted: false,
    },
  ];

  const dispatchCurrentStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <AddContactFirstStep {...form} />;
      case 2:
        return <AddContactSecondStep {...form} />;
      case 3:
        return <AddContactThirdStep {...form} />;
      case 4:
        return <AddContactFourthStep {...form} />;
      case 5:
        return <AddContactFifthStep {...form} />;
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
      return "";
    }
  };

  return {
    dispatchCurrentStep,
    onSubmit,
    stepsIconColor,
    form,
    addContactSteps,
  };
}
