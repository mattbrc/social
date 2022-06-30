import React from "react"
import '../App.css'
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  
  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
      <>
        <label className="checkbox">
          <input {...field} {...props} type="checkbox" />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  
  // Styled components ....
  const StyledSelect = styled.select`
    color: var(--blue);
  `;
  
  const StyledErrorMessage = styled.div`
    font-size: 12px;
    color: var(--red-600);
    width: 400px;
    margin-top: 0.25rem;
    &:before {
      content: "❌ ";
      font-size: 10px;
    }
    @media (prefers-color-scheme: dark) {
      color: var(--red-300);
    }
  `;
  
  const StyledLabel = styled.label`
    margin-top: 1rem;
  `;
  
  const MySelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        <StyledSelect {...field} {...props} />
        {meta.touched && meta.error ? (
          <StyledErrorMessage>{meta.error}</StyledErrorMessage>
        ) : null}
      </>
    );
  };
  
  // And now we can use these
  const SubmitWorkoutForm = () => {
    return (
      <>
        <h1>Share a workout!</h1>
        <Formik
          initialValues={{
            workoutDetails: "",
            workoutType: "" // added for our select
          }}
          validationSchema={Yup.object({
            workoutDetails: Yup.string()
              .max(140, "Must be 140 characters or less")
              .required("Required"),
            workoutType: Yup.string()
              // specify the set of valid values for job type
              // @see http://bit.ly/yup-mixed-oneOf
              .oneOf(
                ["Run", "Cycling", "Swim", "Weightlifting", "Other"],
                "Invalid Workout Type"
              )
              .required("Required")
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 500));
            setSubmitting(false);
          }}
        >
          <Form>
            <MySelect label="Workout Type" name="workoutType">
              <option value="">Select a workout type</option>
              <option value="Run">Run</option>
              <option value="Cycling">Cycling</option>
              <option value="Swim">Swim</option>
              <option value="Weightlifting">Weightlifting</option>
              <option value="Other">Other</option>
            </MySelect>
            <MyTextInput
              label="Workout Details"
              name="workoutDetails"
              type="text"
              placeholder="Share your workout details!"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </>
    );
  };
  

function WorkoutForm() {

    return (
        <SubmitWorkoutForm />
    );
}

export default WorkoutForm