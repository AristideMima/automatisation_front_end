import React, { Component  } from 'react'
import {withStyles} from "@material-ui/core/styles";
import Template from "../Template";
import img from "../../assets/WebMoney_48px.png";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { urlActivate, urlDeleteActivate, urlSetActivate, useStyles } from '../../constants/constants'
import ControlledSelectionGrid from "../FullSelected"
import { Grid, Box } from "@material-ui/core";
import {notification} from "antd";




class TemplateActive extends Component {

    state = {
        type: this.props.type,
        data: [],
        loading: true,
        config: {},
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string.isRequired,
        selected: PropTypes.number.isRequired
    }

    componentDidMount() {

        const type = this.state.type

        // Set accounts
        const token  = this.props.auth.token

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(token){
            config.headers['Authorization'] = `Token  ${token}`
        }

        this.setState({config: config})

        axios.post(`${urlActivate}`, {"type_file": type}, config)
            .then( res => {
                this.setState({data: res.data,  loading: false})
            }).catch( err => {
            this.setState({loading: false})
        })


    }

    sendActivatation = (obj) => {

        const type = this.state.type
        const config = this.state.config
        let data = this.state.data
        const typeObj = obj.type
        const id = obj.id

        const index = data.findIndex((o => o.id === id))

        if (typeObj === "delete"){
            data = data.filter((item) => item.id !== index)

            axios.post(urlDeleteActivate, {"id": id, "type": type}, config)
                .then( res => {
                    this.setState({data: res.data})
                    notification.success({
                        message: 'Suppression réussie',
                        description: 'Le fichier actif a bien été supprimé',
                        placement: 'bottomRight',
                        duration: 5
                    })
                }).catch( err => {
                this.setState({loading: false})
            })

        }else{
            const indexTrue = data.findIndex((o => o.active_file === true))
            data[index].active_file = true
            if(indexTrue !== -1) data[indexTrue].active_file = false

            axios.post(urlSetActivate, {"type_file": type, "id": obj.id}, config)
                .then( res => {
                    this.setState({data: res.data})
                    notification.success({
                        message: 'Activation réussie',
                        description: 'Le fichier actif a été mis à jour',
                        placement: 'bottomRight',
                        duration: 5
                    })
                }).catch( err => {
                this.setState({loading: false})
            })
        }

    }

    render() {

        const { data } = this.state
        const title = this.props.title
        const subTitle = this.props.subTitle
        const selected = this.props.selected
        let type = "gfc"
        if (typeof this.props.auth.user.user !== "undefined") type = this.props.auth.user.user.type
        else type = this.props.auth.user.type

        const deleteButton = type === "dcpo" ? true:false
        const content = (
            <Grid container alignItems="center" justify="center" direction="column">
                <Box mt={5}></Box>
                <Grid item md={10}>
                    <ControlledSelectionGrid delete={deleteButton}  data={data} choice="columns_files" selected={[]}  setSelection={this.sendActivatation}  loadin={this.state.loading} check={false}/>
                </Grid>
            </Grid>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            'selected': selected,
            'img': img,
        }


        return (
            <Template component={component} />
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})


export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps))(withRouter(TemplateActive))