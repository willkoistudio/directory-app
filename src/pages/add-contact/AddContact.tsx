import React, { useEffect, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import { useCountryStateCity } from "../../context/CountryStateCityContext";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import styles from "./AddContact.module.scss";
import { Check } from "lucide-react";
import { ROUTE_NAMES } from "../../helpers/const/routes";
import { Form } from "../../components/ui/form";
import { useAddContactForm } from "./hooks/useAddContactForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getCompanies } from "../../store/companySlice";
import { getContactDetail } from "../../store/contactSlice";

const AddContact: React.FC = () => {
  const { setPageName } = usePageName();
  const {
    fetchCountries,
    getCities,
    getStates,
    selectCountry,
    countries,
    states,
    cities,
    loadingLocations,
  } = useCountryStateCity();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);

  const dispatch = useDispatch();

  const { contactDetail } = useSelector((state: RootState) => state.contact);
  const { companies } = useSelector((state: RootState) => state.company);
  const {
    dispatchCurrentStep,
    form,
    addContactSteps,
    stepsIconColor,
    onSubmit,
  } = useAddContactForm();

  const fetchRessources = async () => {
    setLoading(true);
    try {
      await fetchCountries();
      await dispatch(getCompanies() as any);
      if (id) {
        await dispatch(getContactDetail(id) as any);
        if (contactDetail) {
          form.setValue("name", contactDetail.name);
          form.setValue("avatar", contactDetail.avatar);
          form.setValue("companyId", contactDetail.company.id);
          form.setValue("function", contactDetail.function);
          form.setValue("email", contactDetail.email);
          form.setValue("phone", contactDetail.phone);
          form.setValue("workPhone", contactDetail.workPhone ?? "");
          form.setValue("fax", contactDetail.fax ?? "");
          form.setValue("website", contactDetail.website ?? "");
          form.setValue("notes", contactDetail.notes ?? "");
          form.setValue("address.street", contactDetail.address.street);
          form.setValue("address.cityId", contactDetail.address.city);
          form.setValue("address.postalCode", contactDetail.address.postalCode);
          form.setValue("address.stateId", contactDetail.address.state);
          form.setValue("address.countryId", contactDetail.address.country);
          form.setValue("keywords", contactDetail.keywords);
        }
      }
    } catch (error) {
      console.error("Error fetching ressources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageName(ROUTE_NAMES.ADD_CONTACT);
    fetchRessources();
  }, []);

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {dispatchCurrentStep(currentStep, {
            companies,
            states,
            cities,
            countries,
            selectCountry,
            getStates,
            getCities,
            loadingLocations,
          })}
        </form>
      </Form>
    </div>
  );
};

export { AddContact };
