import { Result, Button } from 'antd';
import {NavLink} from "react-router-dom";

export default function NotFound ()  {
    return (
        <Result
            status="404"
            title="404"
            subTitle="La page que vous recherchez est introuvable"
            extra={
                <NavLink to="/">
                    <Button type="primary" > Accueil</Button>
                </NavLink>
            }
        />
    );
}