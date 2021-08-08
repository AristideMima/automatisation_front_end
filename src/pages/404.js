import { Result, Button } from 'antd';

export default function NotFound ()  {
    return (
        <Result
            status="404"
            title="404"
            subTitle="La page que vous recherchez est introuvable"
            extra={<Button type="primary" to="/"> Accueil</Button>}
        />
    );
}