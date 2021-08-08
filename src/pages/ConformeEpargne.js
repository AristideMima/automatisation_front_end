import Calcul from "./Calcul";

export default function ConformeEpargne(){

    const title = "Calcul Arrêtés - Conforme - Compte Epargnes"
    const subTitle = "Espace de vérification des arrêtés conformes pour les comptes épargnes - Valider les étapes pour lancer le calcul"
    const allTitle = {title: title, subTitle:  subTitle}

    return <Calcul typeArrete="conf" typeCalcul="Epargne" id={3}  title={allTitle} />

}