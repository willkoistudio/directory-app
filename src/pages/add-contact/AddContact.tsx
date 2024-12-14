import React, { useEffect } from "react";
import { usePageName } from "../../context/PageNameContext";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import styles from "./AddContact.module.scss";
import { Check } from "lucide-react";
import { ROUTE_NAMES } from "../../helpers/const/routes";
import { Form } from "../../components/ui/form";
import { useAddContactForm } from "./hooks/useAddContactForm";
import { useParams } from "react-router-dom";

const AddContact: React.FC = () => {
  const { setPageName } = usePageName();
  useEffect(() => {
    setPageName(ROUTE_NAMES.ADD_CONTACT); // Mettre à jour le nom de la page
  }, []);

  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = React.useState(1);
  const { dispatchCurrentStep, form, addContactSteps, stepsIconColor } =
    useAddContactForm();

  return (
    <div>
      <nav className="flex border border-white/10 rounded-lg px-6 py-4 mt-12">
        {addContactSteps.map((step) => (
          <div
            className="add-contact-steps-navigation flex gap-2 items-center cursor-pointer"
            key={step.stepNumber}
            onClick={() => setCurrentStep(step.stepNumber)}
          >
            <div className="add-contact-steps-navigation-icon">
              <Badge className={`${stepsIconColor(step, currentStep)} py-1 `}>
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
      <Form {...form}>{dispatchCurrentStep(currentStep)}</Form>
    </div>
  );
};

export { AddContact };
