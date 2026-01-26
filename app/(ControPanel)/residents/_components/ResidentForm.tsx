"use client";

import { useForm } from "react-hook-form";

const ResidentForm = () => {
  const form = useForm();
  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const isSubmitted = form.formState.isSubmitted;
  return <div>ResidentForm</div>;
};

export default ResidentForm;
