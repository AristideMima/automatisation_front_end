import React, { Component  } from 'react'
import {
    Box,
    Grid,
} from "@material-ui/core";
import {useStyles} from "../constants/constants";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import img from "../assets/WebMoney_48px.png";
import '../assets/css/style.css'
import { Collapse } from 'antd';
import { SettingOutlined } from '@ant-design/icons';


const { Panel } = Collapse;
// const { Option } = Select;

function callback(key) {
    console.log(key);
}

const genExtra = () => (
    <SettingOutlined
        onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        }}
    />
);


class Help extends Component {

    state = {
        expandIconPosition: 'left',
    };

    onPositionChange = expandIconPosition => {
        this.setState({ expandIconPosition });
    };


    render() {

        const { expandIconPosition } = this.state;

        // const theme = this.props.theme;

        const title = 'Guide utilisateur -  Aide'
        const subTitle = 'Espace utilisateur pour vous aider dans la prise en main de l\'application'

        const content = (
            <>
                <Box mt={5}></Box>
                <Grid align="left" item md={10}>
                    <Collapse defaultActiveKey={['1']} onChange={callback} expandIconPosition={expandIconPosition}>
                        <Panel header="Tableau de bord" key="1" extra={genExtra()}>
                            <div>
                                Le tableau de bord présente une vue globale de l'applications,
                                principalement le nombre de fichiers uploadés au sein de l'application, le nombre de simulations effectuées
                                et l'espace disque occupée par l'ensemble des fichiers stockés.
                            </div>
                        </Panel>
                        <Panel header="Chargement des fichiers" key="2" extra={genExtra()}>
                            <div>
                                <p>
                                    Pour lancer les calculs il est primordial de charger au préalable les fichiers nécessaires dans l'application, ce chargement s'effectue suivant les contraintes ci-après:
                                    <ul>
                                        <li>
                                            <strong>Le choix du type:</strong> L'utilisateur a le droit de charger 1 seul type de fichier à la fois ( Courant: 4 fichiers, Epargne: 3 fichiers)
                                        </li>
                                        <li>
                                            <strong>Fichier historique:</strong> Il doit contenir les colonnes suivantes sans valeur  nulles <br />
                                            <i>
                                                Date Comptable	Code Agence	Date de Valeur	N° Compte	Cle compte	Intitulé compte	Libellé Opération	Code Opération	Sens	Montant
                                            </i>
                                        </li>
                                        <li>
                                            <strong>Fichier Solde:</strong> Il doit contenir les colonnes suivantes sans valeur  nulles <br />
                                            <i>
                                                Code Agence	N° Compte	Cle compte	Date Solde	Solde
                                            </i>
                                        </li>
                                        <li>
                                            <strong>Fichier Autorisation:</strong> Il doit contenir les colonnes suivantes sans valeur  nulles <br />
                                            <i>
                                                Code Agence	N° Compte	Cle compte	Date Deb	Date Fin	Montant
                                            </i>
                                        </li>
                                        <li>
                                            <strong>Fichier Journal Courant:</strong> Il doit contenir les colonnes suivantes sans valeur  nulles <br />
                                            <i>
                                                Code Agence	N° Compte	Cle compte	Net Client	Com. Decouvert	Com. de compte	Frais fixes	Tva	Taux Com. Decouvert	Taux Com. de compte	Taux Tva	Int Deb 1	Int Deb 2	Int Deb 3	Taux Int Deb 1	Taux Int Deb 2	Taux Int Deb 3
                                            </i>
                                        </li>
                                        <li>
                                            <strong>Fichier Journal Epargne:</strong> Il doit comporter les colonnes suivantes sans valeur  nulles <br />
                                            <i>
                                                Code Agence	N° Compte	Cle compte	Net Client	Int inf	Int sup	Ircm	Frais fixes	Taux Tva	Tva	Taux Int inf	Taux Int sup	Taux Ircm	Valeur Crédit
                                            </i>
                                        </li>
                                    </ul>
                                </p>
                            </div>
                        </Panel>
                        <Panel header="Calcul de l'arrêté" key="3" extra={genExtra()}>
                            <p>
                                Le calcul de l'arrêté (Epargne ou Courant) se fait suivant les étapes suivantes,
                            </p>
                            <ol>
                                <li><strong> Choix et modifications des numéros de comptes: </strong> Vous devez choisir au moins 1 compte dans le tableau qui va s'afficher. Vous avez la possibilité de modifer (si vous faites un arrêté en régularisation), le solde initial, la période d'autorisation et le montan</li>
                                {/*<li><strong> Opérations à exclure: </strong>Sélectionner les opérations à exclure lors du calcul</li>*/}
                                <li><strong> Paramètres: </strong> Définir la période de l'arrêté</li>
                                <li><strong> Opération: </strong>   Les taux sont pris automatiquement dans les journaux d'arrêtés préchargés</li>
                            </ol>

                        </Panel>
                        <Panel header="Activation des fichiers" key="4" extra={genExtra()}>
                            <div>
                                Après avoir chargé plusieurs fichiers, vous avez la possibilité de choisir le fichier actif à un instant t ou alors de supprimer un fichier (habilitation DCPO).
                            </div>
                        </Panel>
                    </Collapse>
                </Grid>
            </>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            'selected': 12,
            'img': img,
        }


        return (
            <Template component={component} />
        );
    }
}


export default withStyles(useStyles, {withTheme: true})(Help)

