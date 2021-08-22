import Calcul from "./Calcul";

export function ConformeCourant(){

    const title = "Calcul Arrêtés  - Compte courant"
    const subTitle = "Espace de vérification des calculs d'arrêtés pour les comptes courants - Valider les étapes pour lancer le calcul"
    const allTitle = {title: title, subTitle:  subTitle}

    return <Calcul typeArrete="conf" typeCalcul="Courant" id={2}  title={allTitle} />

}