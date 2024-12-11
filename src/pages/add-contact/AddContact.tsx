import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import styles from "./AddContact.module.scss";
import { AddContactFirstStep } from "../../features/add-contact-steps/AddContactFirstStep";
import { AddContactSecondStep } from "../../features/add-contact-steps/AddContactSecondStep";
import { AddContactThirdStep } from "../../features/add-contact-steps/AddContactThirdStep";
import { AddContactFourthStep } from "../../features/add-contact-steps/AddContactFourthStep";
import { AddContactFifthStep } from "../../features/add-contact-steps/AddContactFifthStep";
import { Check } from "lucide-react";
import { ROUTE_NAMES } from "../../helpers/const/routes";
import { Form } from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface AddContactStep {
  name: string;
  stepNumber: number;
  isCompleted: boolean;
}

const addContactSteps: AddContactStep[] = [
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

const AddContact: React.FC = () => {
  const { setPageName } = usePageName();
  const [currentStep, setCurrentStep] = React.useState(1);

  const stepsIconColor = (step: AddContactStep) => {
    if (step.isCompleted) {
      return `${styles["step-completed"]} bg-green border-green `;
    } else if (step.stepNumber === currentStep) {
      return "bg-red border-red";
    } else {
      return "";
    }
  };

  const dispatchCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <AddContactFirstStep />;
      case 2:
        return <AddContactSecondStep />;
      case 3:
        return <AddContactThirdStep />;
      case 4:
        return <AddContactFourthStep />;
      case 5:
        return <AddContactFifthStep />;
      default:
        return;
    }
  };

  useEffect(() => {
    setPageName(ROUTE_NAMES.ADD_CONTACT); // Mettre à jour le nom de la page
  }, []);

  const formSchema = z.object({
    name: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold mb-4">New contact</h1>
        <p>Please fill in the form to create a new contact</p>
      </div>
      <nav className="flex border border-white/10 rounded-lg px-6 py-4">
        {addContactSteps.map((step) => (
          <div
            className="add-contact-steps-navigation flex gap-2 items-center cursor-pointer"
            key={step.stepNumber}
            onClick={() => setCurrentStep(step.stepNumber)}
          >
            <div className="add-contact-steps-navigation-icon">
              <Badge className={`${stepsIconColor(step)} py-1 `}>
                {step.isCompleted ? <Check size={14} /> : step.stepNumber}
              </Badge>
            </div>
            <span className="whitespace-nowrap">{step.name}</span>
            {step.stepNumber !== 5 && (
              <span className={styles["add-contact-steps-navigation-line"]} />
            )}
          </div>
        ))}
        <div className="flex gap-2 ml-auto">
          <Button
            variant={"outline"}
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Back
          </Button>
          <Button
            className="bg-red"
            disabled={currentStep === 5}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </Button>
        </div>
      </nav>
      <Form {...form}>{dispatchCurrentStep()}</Form>
    </div>
  );
};

export { AddContact };
