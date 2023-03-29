import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { DropdownGridSingleSelect } from "../../../components";
import classes from "./Component.module.scss";
import { Form } from "react-bootstrap";
import RightSection from "./RightSection/RightSection";
import {
  AnnualIncomeProfile,
  EducationTypeAndVal,
  Occupation,
  ReadyToSettleAbroad,
  ResidentialStatus,
} from "../../../types/enums";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../ducks/auth/selectors";
import { step2 } from "../../../ducks/regiserUser/step2/actions";
import { selectStep2Success } from "../../../ducks/regiserUser/step2/selectors";
import axios from "axios";
import CountrySingle from "../../../components/InputField/CountryStateSingle/CountrySingle";
import StateSingle from "../../../components/InputField/CountryStateSingle/StateSingle";
import CitySingle from "../../../components/InputField/CountryStateSingle/CitySingle";

interface ProfileDetailsProps {
  nextPage: (a: number) => void;
}
interface Data {
  id?: string;
  val: string;
}

const CareerDetails: React.FC<ProfileDetailsProps> = ({ nextPage }: any) => {
  const dispatch = useDispatch();
  const stepTwoDefaultValues = useSelector(selectStep2Success);
  const jsonData = stepTwoDefaultValues?.jsonResponse;
  const isReduxEmpty =
    jsonData && Object.values(jsonData).every((value) => !value);
  const userId = useSelector(getUserId);
  useEffect(() => {
    dispatch(step2({ actionType: "v", userId: userId }));
  }, [dispatch, userId]);
  const [selectedCountry, setSelectedCountry] = useState<number>(
    jsonData?.country || 0
  );
  const [selectedState, setSelectedState] = useState<number>(
    jsonData?.state || 0
  );
  const [selectedCity, setSelectedCity] = useState<number>(jsonData?.city || 0);
  const [residentialStatus, setResidentialStatus] = useState<Data>({
    id: String(jsonData?.residentialstatus),
    val: "",
  });
  const [settleAboard, setSettleAbroad] = useState<Data>({
    id: String(jsonData?.readytosettleabroad),
    val: "",
  });
  const [education, setEducation] = useState<Data>({
    id: String(jsonData?.education),
    val: "",
  });
  const [occupation, setOccupation] = useState<Data>({
    id: String(jsonData?.occupation),
    val: "",
  });
  const [annualIncome, setannualIncome] = useState<Data>({
    id: String(jsonData?.annual_income),
    val: "",
  });
  const formik = useFormik({
    initialValues: {
      userId: userId,
      country: jsonData?.country,
      state: jsonData?.state,
      city: jsonData?.city,
      residentialStatus: String(jsonData?.residentialstatus),
      readyToSettleAbroad: String(jsonData?.readytosettleabroad),
      education: String(jsonData?.education),
      college: jsonData?.College,
      occupation: String(jsonData?.occupation),
      annualIncome: String(jsonData?.annual_income),
    },
    onSubmit: async (values) => {
      let response;
      if (isReduxEmpty) {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step2`,
          { ...values, actionType: "c" }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/registerUser/step2`,
          { ...values, actionType: "u" }
        );
      }
      response.data.output > 0 && nextPage(2);
    },
  });

  // when Render page go on the top of the page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    formik.values.country = selectedCountry;
    formik.values.state = selectedState;
    formik.values.city = selectedCity;
    formik.values.residentialStatus = residentialStatus.id || "";
    formik.values.readyToSettleAbroad = settleAboard.id || "";
    formik.values.education = education.id || "";
    formik.values.occupation = occupation.id || "";
    formik.values.annualIncome = annualIncome.id || "";
  }, [
    annualIncome.id,
    education.id,
    formik.values,
    jsonData?.College,
    occupation.id,
    residentialStatus.id,
    selectedCity,
    selectedCountry,
    selectedState,
    settleAboard.id,
  ]);

  const getSelectedCountry = (id: number) => {
    setSelectedCountry(id);
  };
  const getSelectedState = (id: number) => {
    setSelectedState(id);
  };
  const getSelectedCity = (id: number) => {
    setSelectedCity(id);
  };

  return (
    <div className={classes.profile_Container}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} md={5}>
            <h1>Great! You are about to complete your profile.</h1>
            <small>mandatory</small>
            <Form className={classes.formEdit} onSubmit={formik.handleSubmit}>
              <CountrySingle
                title="Country"
                setSelectedCountry={getSelectedCountry}
                defaultValueCountry={jsonData?.country}
              />
              <StateSingle
                title="State"
                setSelectedState={getSelectedState}
                defaultValueCountry={selectedCountry}
                defaultValueState={jsonData?.state}
              />
              <CitySingle
                title="City"
                defaultValueCountry={selectedCountry}
                defaultValueState={selectedState}
                defaultValueCity={jsonData?.city}
                setSelectedCity={getSelectedCity}
              />
              <DropdownGridSingleSelect
                selectedDataFn={setResidentialStatus}
                title="Residential Status"
                data={ResidentialStatus}
                nameid="residentialStatus"
                defaultValue={String(jsonData?.residentialstatus)}
              />
              <DropdownGridSingleSelect
                selectedDataFn={setSettleAbroad}
                title="Ready to settle abroad"
                data={ReadyToSettleAbroad}
                nameid="readyToSettleAbroad"
                defaultValue={String(jsonData?.readytosettleabroad)}
              />
              <DropdownGridSingleSelect
                selectedDataFn={setEducation}
                title="Highest Degree"
                data={EducationTypeAndVal}
                nameid="education"
                defaultValue={String(jsonData?.education)}
              />
              <div className={classes.singleBox}>
                <Form.Label>College Name</Form.Label>
                <div className={classes.inputBox}>
                  <li className={classes.blankInput}>
                    <Form.Control
                      type="text"
                      name="college"
                      placeholder={
                        jsonData?.College
                          ? String(jsonData?.College)
                          : "Enter College Name"
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </li>
                </div>
              </div>
              <DropdownGridSingleSelect
                selectedDataFn={setOccupation}
                title="Employed In"
                data={Occupation}
                nameid="occupation"
                defaultValue={String(jsonData?.occupation)}
              />
              <DropdownGridSingleSelect
                selectedDataFn={setannualIncome}
                title="Annual Income"
                data={AnnualIncomeProfile}
                nameid="annualIncome"
                defaultValue={String(jsonData?.annual_income)}
              />
              <hr />
              <h5 className="text-center p-3">
                Here is your chance to make your profile stand out!
              </h5>
              <Button
                variant="danger"
                type="submit"
                className={`${classes.Form_btn} mt-2 w-50 mx-auto`}
              >
                Next
              </Button>
              <Button
                variant="danger"
                onClick={() => nextPage(0)}
                className={`${classes.Form_btnPrev} mt-2 w-50 mx-auto`}
              >
                Previous
              </Button>
            </Form>
          </Col>
          <RightSection />
        </Row>
      </Container>
    </div>
  );
};

export default CareerDetails;
