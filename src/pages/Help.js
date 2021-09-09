import React, { Component  } from 'react'
import {
    Box,
    Grid,
} from "@material-ui/core";
import {useStyles} from "../constants/constants";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import img from "../assets/WebMoney_48px.png";
import "./style.css"
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
                <Grid container justify="center"  alignmenItems="center" spacing={3}>
                    <Box mt={5}></Box>
                    <Grid item md={8}>
                        <Collapse
                            defaultActiveKey={['1']}
                            onChange={callback}
                            expandIconPosition={expandIconPosition}
                        >
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
                                                <strong>Le choix du type:</strong> L'utilisateur a le droit de charger 1 seul fichier à la fois correspondant à 1 seul type qui peut être  historique, journal, solde ou autorisation.
                                            </li>
                                            <li>
                                                <strong>Fichier historique:</strong> Il doit respecter le format suivant (les nombres correspondent aux positions des colonnes <br />
                                                <i>colonne 1: Date Comptable*</i>, <i>colonne 2: Code Agence*</i>, <i>colonne 3: N° Compte*</i>, <i>colonne 5: Sens*</i>, <i>colonne 6: Montant*</i>,
                                                <i>colonne 7: Code Opération*</i>, <i>colonne 8: Libellé Opération*</i>, <i>colonne 10: Date de Valeur*</i>
                                            </li>
                                            <li>
                                                <strong>Fichier Solde:</strong> Il doit respecter le format suivant (les nombres correspondent aux positions des colonnes <br />
                                                <i>colonne 1: Code Agence*</i>, <i>colonne 2: Devise</i>, <i>colonne 2: N° Compte*</i>, <i>colonne 3: Année</i>, <i>colonne 4: Mois</i>, <i>colonne 6: Date Solde*</i>,
                                                <i>colonne 6: Solde*</i>, <i>colonne 6: Date Mois Suivant</i>,
                                            </li>
                                            <li>
                                                <strong>Fichier Autorisation:</strong> Il doit respecter le format suivant (les nombres correspondent aux positions des colonnes <br />
                                                <i>colonne 1: Code Agence*</i>, <i>colonne 2: N° Compte*</i>, <i>colonne 3: Clé</i>, <i>colonne 4: Date Mise en Place*</i>, <i>colonne 5: Date de fin*</i>,
                                                <i>colonne 6: Montant*</i>, <i>colonne 7: Taux</i>,
                                            </li>
                                            <li>
                                                <strong>Fichier Journal:</strong> Il doit respecter le format suivant (les nombres correspondent aux positions des colonnes <br />
                                                <i>colonne 1: Numero de compte*</i>, <i>colonne 2: Net client*</i>
                                            </li>
                                            <li>
                                                <strong>Entête des fichiers: </strong> Les fichiers ne doivent pas avoir d'entête, après que vous vous soyez assurés de l'ordre supprimer les entêtes.
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
                                    <li><strong> Opérations à exclure: </strong>Sélectionner les opérations à exclure lors du calcul</li>
                                    <li><strong> Paramètres: </strong> Définir les différents taux et la période de l'arrêté</li>
                                    <li><strong> Options: </strong> Sélections le mode (cocher régularisation si vous souhaiter faire un arrêté  de ce type); Exclure ou pas, les commisions, sélectionnez le type d'IRCM (cocher 10 000 000 ou décocher pour 50 000 0000)</li>
                                </ol>

                            </Panel>
                            <Panel header="Activation des fichiers" key="4" extra={genExtra()}>
                                <div>
                                    Après avoir chargé plusieurs fichiers, vous avez la possibilité de choisir le fichier actif à un instant t ou alors de supprimer un fichier.
                                </div>
                            </Panel>
                        </Collapse>
                    </Grid>
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

