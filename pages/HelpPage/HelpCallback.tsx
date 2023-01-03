import classes from "./HelpMain.module.scss";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";

// type HelpCallbackProps =  {
//     onCloseModal: () => void;
// }

const HelpCallback: React.FC = () => {
    return (
        <>
        <div className={classes.modal_form}>
            <Form>
                <Form.Group className={`${classes.modal_input}`} controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email Id / Mobile Number"/>
                </Form.Group>
                <Form.Group className={`${classes.modal_input}`} controlId="formMobileNumber">
                    <Form.Control type="tel" placeholder="Mobile Number"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" placeholder="Questions or feedback" rows={2}></Form.Control>
                </Form.Group>
                <Button variant="danger" type="submit" className={`${classes.Form_btn} p-3 mt-2 w-100`}>
                    Submit Request
                </Button>
                <Button className={classes.closeModal}>x</Button>
            </Form>
        </div>
        </>
    )
}

export default HelpCallback;