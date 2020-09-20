import Nav from '../../components/nav/nav';

function ControlPanel(props) {
    return(
        <>
            <Nav user={props} />
        </>
    )
};

ControlPanel.getInitialProps = async (ctx) => {
    const user = { lv: ctx.query.lv, login: ctx.query.login };
    return user;
};

export default ControlPanel;