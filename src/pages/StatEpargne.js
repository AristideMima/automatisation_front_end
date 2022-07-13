// import React, { useState, useEffect } from "react";
//
// import Template from "./Template";
// import img from "../assets/WebMoney_48px.png";
// import axios from "axios";
// import {connect} from "react-redux";
// import {StatCourant} from "./StatCourant";
// import {
//     code_agence,
//     simulation_count,
//     simulation_sum,
//     ecart_sum,
//     journal_total_count,
//     journal_total_sum,
//     ecart_count,
//     type_account, period
// } from "../constants/constants";
// import {Tag} from "antd";
// import moment from "moment";
//
//
// function StatEpargne(props){
//
//     const auth = props.auth
//     const [agence, setAgence] = useState([])
//     const [agenceper, setAgenceper] = useState([])
//     const [int, setInt] = useState([])
//     const [intper, setIntper] = useState([])
//
//     const generalcolsagence = [
//         {
//             title: 'Agence',
//             dataIndex: code_agence,
//             key:  code_agence,
//             width: 180
//         },
//         {
//             title: 'Nombre Simulation',
//             dataIndex: simulation_count,
//             key: simulation_count,
//             width: 180,
//         },
//         {
//             title: 'Valeur Simulation',
//             dataIndex: simulation_sum,
//             key: simulation_sum,
//             width: 180,
//         },
//         {
//             title: 'Nombre Journal',
//             dataIndex: journal_total_count,
//             key: journal_total_count,
//             width: 180,
//         },
//         {
//             title: 'Valeur Journal',
//             dataIndex: journal_total_sum,
//             key: journal_total_sum,
//             width: 180,
//         },
//         {
//             title: 'Valeur Ecart',
//             dataIndex: ecart_sum,
//             key: ecart_sum,
//             width: 180,
//         },
//         {
//             title: 'Type de compte',
//             dataIndex: type_account,
//             key: type_account,
//             width: 180,
//         },
//     ]
//     const periodagence = [
//         {
//             title: 'Période',
//             dataIndex: period,
//             key:  period,
//             width: 180
//         },
//         ...generalcolsagence
//     ]
//
//     let generalcolint = []
//     const generialint = []
//
//
//     const title = "Statistiques comptes épargne"
//     const subTitle = " Espace de vue globale sur les statistiques des comptes épargne"
//
//     useEffect(() => {
//         const token = auth.token
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         if(token){
//             config.headers['Authorization'] = `Token  ${token}`
//         }
//
//         // Make a request with the appropriate type and get the results
//
//         // axios.post().then(
//         //
//         // )
//
//     }, [auth])
//
//     const content = <></>
//
//     const component = {
//         'title': title,
//         'subTitle': subTitle,
//         'content': content,
//         'selected': 0,
//         'img': img,
//     }
//
//     return <Template component={component} />
//
// }
//
// const mapStateToProps = state => ({
//     auth: state.auth
// });
//
//
// export default connect(mapStateToProps)(StatEpargne);