import Calcul from "./Calcul";

export default function ConformeEpargne(){

    const title = "Calcul Arrêtés - Compte Epargnes"
    const subTitle = "Espace de vérification des calculs d'arrêtés pour les comptes épargnes - Valider les étapes pour lancer le calcul"
    const allTitle = {title: title, subTitle:  subTitle}

    return <Calcul typeArrete="conf" typeCalcul="Epargne" id={3}  title={allTitle} />

}