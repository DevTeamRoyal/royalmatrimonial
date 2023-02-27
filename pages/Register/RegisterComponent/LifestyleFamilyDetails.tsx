import { Container, Row, Col } from "react-bootstrap";
import CustomButton from "../../../components/Button/CustomButton";
import classes from "./Component.module.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import RightSection from "./RightSection/RightSection";

const LifestyleFamilyDetails: React.FC = () => {
  return (
    <div className={classes.profile_Container}>
      <Container>
        <Row className="justify-content-center">
          <h1>We would love to know about your family.</h1>
          <Col sm={12} md={5}>
            <div>
              <h4>Lifestyle</h4>
              <div className={`form-group ${classes.inputCover}`}>
                <label>Diet</label>
                <input placeholder="Diet" className="form-control" />
              </div>
              <div className={`form-group ${classes.inputCover}`}>
                <label>Smoking</label>
                <input placeholder="Family type" className="form-control" />
              </div>
              <div className={`form-group ${classes.inputCover}`}>
                <label>Drinking</label>
                <input placeholder="Family type" className="form-control" />
              </div>
            </div>
            <small>mandatory</small>
            <div className={`form-group ${classes.inputCover}`}>
              <label>Family type</label>
              <input placeholder="Family type" className="form-control" />
            </div>
            <div className={`form-group ${classes.inputCover}`}>
              <input
                placeholder="Father's Occupation"
                className="form-control"
              />
            </div>
            <div className={`form-group ${classes.inputCover}`}>
              <input
                placeholder="Mother's Occupation"
                className="form-control"
              />
            </div>
            <div className={`form-group ${classes.inputCover}`}>
              <input placeholder="Brother" className="form-control" />
            </div>
            <div className={`form-group ${classes.inputCover}`}>
              <input placeholder="Sister" className="form-control" />
            </div>
            <div className={`form-group ${classes.inputCover}`}>
              <input placeholder="Family living in" className="form-control" />
            </div>
            <div className={`form-group ${classes.inputCover}`}>
              <input placeholder="Contact address" className="form-control" />
            </div>

            <FloatingLabel
              controlId="floatingTextarea2"
              label="About My Family"
            >
              <Form.Control
                as="textarea"
                placeholder="About My Family"
                style={{ height: "200px" }}
              />
            </FloatingLabel>
            <CustomButton onClick={() => console.log("tab")}>
              Add to my profile
            </CustomButton>
          </Col>
          <RightSection />
        </Row>
      </Container>
    </div>
  );
};

export default LifestyleFamilyDetails;
