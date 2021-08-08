import Calcul from "./Calcul";

export function ConformeCourant(){

    const title = "Calcul Arrêtés - Conforme - Compte courant"
    const subTitle = "Espace de vérification des arrêtés conformes pour les comptes courants - Valider les étapes pour lancer le calcul"
    const allTitle = {title: title, subTitle:  subTitle}

    return <Calcul typeArrete="conf" typeCalcul="Courant" id={2}  title={allTitle} />

}