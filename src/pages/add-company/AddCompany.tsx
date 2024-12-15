import React, { useEffect, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../const/routes";
import styles from "../add-contact/AddContact.module.scss";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "../../components/ui/badge";
import { Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import { AddCompanyFirstStep } from "../../components/features/add-company-steps/AddCompanyFirstStep";
import { AddCompanySecondStep } from "../../components/features/add-company-steps/AddCompanySecondStep";
import { FormStep } from "../../models/form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const addCompanySteps: FormStep[] = [
  {
    name: "Logo",
    stepNumber: 1,
    isCompleted: false,
  },
  {
    name: "Company infos",
    stepNumber: 2,
    isCompleted: false,
  },
];

const AddCompany: React.FC = () => {
  const { setPageName } = usePageName();
  const [currentStep, setCurrentStep] = React.useState(1);

  const [loading, setLoading] = useState(false);

  const stepsIconColor = (step: FormStep) => {
    if (step.isCompleted) {
      return `${styles["step-completed"]} bg-green border-green `;
    } else if (step.stepNumber === currentStep) {
      return "bg-red border-red";
    } else {
      return "";
    }
  };

  const dispatchCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return <AddCompanyFirstStep />;
      case 2:
        return <AddCompanySecondStep />;
      default:
        return;
    }
  };
  const formSchema = z.object({
    name: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    setPageName(ROUTE_NAMES.ADD_COMPANY); // Mettre à jour le nom de la page
  }, []);

  return (
    <>
      <nav className="mt-12 flex border border-white/10 rounded-lg px-6 py-4">
        {addCompanySteps.map((step) => (
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
            {step.stepNumber !== 2 && (
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
            disabled={currentStep === 2}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </Button>
        </div>
      </nav>
      <Form {...form}>{dispatchCurrentStepContent()}</Form>
    </>
  );
};

export { AddCompany };
