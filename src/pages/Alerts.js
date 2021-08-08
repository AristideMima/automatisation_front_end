import { Component, Fragment } from 'react'
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from 'prop-types';


class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {

        const { error, alert, message } = this.props
            let field = ""
        if( error !== prevProps.error){
            if( error.msg.account_number)
                field = `Account number: ${error.msg.account_number[0]}`;
            if(error.msg.firstName)
                field = `FirstName: ${error.msg.firstName}`;
            if(error.msg.lastName)
                field = `LastName: ${error.msg.lastName}`;
            if(error.msg.town)
                field = `Town: ${error.msg.town}`;
            if(error.msg.sex)
                field = `Sex: ${error.msg.sex}`;
            if(error.msg.born_year)
                field = `Date of birth: ${error.msg.born_year}`;
            if(error.msg.message)
                field = `Message : ${error.msg.message}`;
            if(error.msg.non_field_errors)
                field = error.msg.non_field_errors;
            if(error.msg.username)
                field = `Username: ${error.msg.username}`;

            if(error.msg.detail){
                field = error.msg.detail
            }

            alert.error(field)
        }

        if( message !== prevProps.message) {

            // if (message.clientMsg) alert.success(message.clientMsg)

            if (message.fileupload) alert.success(message.fileupload)


            if (message.passwordDoNotMatch) alert.error(message.passwordDoNotMatch)
        }

    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts))