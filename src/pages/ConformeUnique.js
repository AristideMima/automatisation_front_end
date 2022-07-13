import Calcul from "./Calcul";
import img from "../assets/google_compute_engine_48px.png";
import Template from "./Template";
import React, {Component} from "react";
import {Box, Grid, Paper} from "@material-ui/core";
import {
    config,
    emptyList,
    textConfirmComputeUnique,
    textConfirmLoading, urlUnique,
    urlUpload,
    useStyles
} from "../constants/constants";
import {
    Button,
    Popconfirm,
    Upload,
    Form,
    InputNumber,
    Row,
    Col,
    DatePicker,
    Space,
    Radio,
    Divider,
    notification
} from "antd";
import {UploadOutlined, MacCommandOutlined, DeleteOutlined} from "@ant-design/icons";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import axios from "axios";


const { RangePicker } = DatePicker;


class ConformeUnique extends Component {


    state = {
        compute: false,
        historic: [],
        ladder: [],
        sold: []
    }

    handleCompute = () => {

        this.setState({
            compute: true
        })

        const token  = this.props.auth.token

        if(token){
            config.headers['Authorization'] = `Token  ${token}`
        }

        const {historic, ladder, sold} = this.state
        const formData = new FormData();

        // Historic Ladder
        historic.forEach(file => {
            formData.append('Historic[]', file)
        })

        // Ladder
        ladder.forEach(file => {
            formData.append('Ladder[]', file)
        })

        // Ladder
        sold.forEach(file => {
            formData.append('Sold', file)
        })

        axios.post(urlUnique, formData, config).then( res => {
            this.setState({
                compute: false,
            });
        }).catch( err => {
            this.setState({
                compute: false,
            });

            if (err.response) {
                // failed uploading
                notification.error({
                    message: 'Erreur upload',
                    description: err.response.data['message'],
                    placement: 'bottomRight',
                    duration: 10
                });
            }
        })


    }

    handleEmpty = () => {
        this.setState({
            historic: [],
            ladder: [],
            sold: []
        })
    }

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    disableButton = (empty = false) => {
        const {historic, sold, ladder} = this.state

        if (!empty)
            if (historic.length == 0 || sold.length == 0 || ladder.length == 0 ) return true
        else {
            if (historic.length == 0 && sold.length == 0 && ladder.length == 0 ) return true
        }

        return false
    }

    render() {
        const { compute, historic, ladder, sold } = this.state;

        const title = "Calcul unique des arrêtés de compte "
        const subTitle =
            "Eléments necessaires: Echelles d'arrêtés et historiques des comptes. \n" +
            "Vous avez aussi la possibilité de paramétrer les différents éléments de calcul que vous souhaitez utiliser."


        // Props form upload
        const propsHistoric = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.historic.indexOf(file);
                    const newFileList = state.historic.slice();
                    newFileList.splice(index, 1);
                    return {
                        historic: newFileList,
                    };
                });
            },
            beforeUpload: file => {

                this.setState(state => ({
                    historic: [...state.historic, file],
                }));
                return false;
            },
            historic,
            className: "upload-list-inline"
        }

        const propsLadder = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.ladder.indexOf(file);
                    const newFileList = state.ladder.slice();
                    newFileList.splice(index, 1);
                    return {
                        ladder: newFileList,
                    };
                });
            },
            beforeUpload: file => {

                this.setState(state => ({
                    ladder: [...state.ladder, file],
                }));
                return false;
            },
            ladder,
            className: "upload-list-inline"
        }

        const propsSold = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.sold.indexOf(file);
                    const newFileList = state.sold.slice();
                    newFileList.splice(index, 1);
                    return {
                        sold: newFileList,
                    };
                });
            },
            beforeUpload: file => {

                this.setState(state => ({
                    sold: [...state.sold, file],
                }));
                return false;
            },
            sold,
            className: "upload-list-inline"
        }

        const formItemLayout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 20,
            },
        };

        const content = (
            <>
                <Grid container spacing={0}>
                    <Grid align="center" item md={12} style={{ marginBottom: "80px" }}>
                        <Space size={10} direction="horizontal">
                            {/*<span style={{ fontSize: "large", color: "gray" }}> Période: </span>*/}
                            {/*<RangePicker />*/}
                            <Popconfirm disabled={this.disableButton()}  placement="top" title={textConfirmComputeUnique} onConfirm={this.handleCompute} okText="Oui" >
                                <Button loading={compute} type="primary" primary disabled={this.disableButton()} icon={<MacCommandOutlined />} block>
                                    {compute ? 'Calcul en cours...' : 'Lancer le calcul'}
                                </Button>
                            </Popconfirm>
                        </Space>
                    </Grid>
                    <Grid align="center" item md={7}>
                       <Grid container spacing={0}>
                           <Grid item md={3}>
                               <Upload
                                   multiple {...propsHistoric}
                                   accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                   // maxCount={max_count}
                                   showUploadList={historic.length !== 0}
                               >
                                   <Button icon={<UploadOutlined />}>Historique</Button>
                               </Upload>
                           </Grid>
                           <Grid item md={3}>
                               <Upload
                                   multiple {...propsLadder}
                                   accept="text/plain"
                                   // maxCount={max_count}
                                   showUploadList={ladder.length !== 0}
                               >
                                   <Button icon={<UploadOutlined />}>Echelle</Button>
                               </Upload>
                           </Grid>
                           <Grid item md={3}>
                               <Upload
                                   {...propsSold}
                                   accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                   maxCount={1}
                                   showUploadList={sold.length !== 0}
                               >
                                   <Button icon={<UploadOutlined />}>Soldes</Button>
                               </Upload>
                           </Grid>
                           <Grid item md={3}>
                               <Popconfirm disabled={historic.length == 0 && sold.length == 0 && ladder.length == 0 }  placement="top" title={emptyList} onConfirm={this.handleEmpty} okText="Oui" >
                                    <Button disabled={historic.length == 0 && sold.length == 0 && ladder.length == 0 } danger icon={<DeleteOutlined />}> Vider la liste</Button>
                               </Popconfirm>
                           </Grid>
                       </Grid>
                    </Grid>
                    <Grid align="center" item md={1}>
                        <Divider type="vertical" style={{ height: "100em", fontSize: "10px" }} />
                    </Grid>
                    <Grid align="center" item md={4}>
                        <Grid container spacing={0}>
                            <Grid item md={12}  style={{ marginBottom: "30px" }}>
                                <h3 style={{ textTransform: "uppercase", backgroundColor: "#E53935", maxWidth: "90%", padding: "3px", color: "white"}}>Paramètres du calcul des arrêtés</h3>
                            </Grid>
                            <Grid align="center" style={{ paddingLeft: "10px"}} item md={12}>
                                <Form
                                    name="validate_settings"
                                    {...formItemLayout}
                                    onFinish={this.onFinish}
                                    initialValues={{
                                        'taux_inf': 2.45,
                                        'taux_sup': 2.45,
                                        'type_taux': 50,
                                        'taux_ircm': 16.5,
                                        'taux_int_1': 6.5,
                                        'taux_int_2': 15.5,
                                        'taux_mvt': 0.025,
                                        'taux_dec': 0.020833,
                                        'frais_courant': 5_000,
                                        'frais_epargne': 2_000,
                                        'taux_tva_courant': 19.25,
                                        'taux_tva_epargne': 19.25,
                                    }}
                                >
                                    <Row style={{ marginBottom: "15px"}}>
                                        <Col span={24}>
                                            <p style={{ color: "gray", textTransform: "uppercase"}}>Paramètres comptes épargnes</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item name="taux_inf" label="Taux inférieur" rules={[{required: true,},]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="taux_sup" label="Taux supérieur" rules={[{required: true}]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item name="type_taux" label="Valeur intérêts" rules={[{required: true}]}>
                                                <Radio.Group>
                                                    <Radio value={50}> 50 M</Radio>
                                                    <Radio value={10}> 10 M</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="taux_ircm" label="Taux Ircm" rules={[{required: true}]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item name="frais_epargne" label="Frais Fixe" rules={[{required: true}]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="taux_tva_epargne" label="Taux Tva" rules={[{required: true}]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "15px", marginBottom: "15px"}}>
                                        <Col span={24}>
                                            <p style={{ color: "gray", textTransform: "uppercase"}}>Paramètres comptes courants</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item name="taux_int_1" label="Taux Int 1" rules={[{required: true,},]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="taux_int_2" label="Taux Int 2" rules={[{required: true}]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item name="taux_mvt" label="Taux Com Mvt" rules={[{required: true}]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="taux_dec" label="Taux Com Dec" rules={[{required: true}]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item name="frais_courant" label="Frais Fixe" rules={[{required: true}]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name="taux_tva_courant" label="Taux Tva" rules={[{required: true}]}>
                                                <InputNumber type="number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTOp: "30px"}}>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 16, offset: 4}}>
                                                <Button type="primary" htmlType="submit" block>
                                                    Enregistrer
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            'selected': 13,
            "img": img
        }

        return (
            <Template component={component} />
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps))(ConformeUnique);
