import PropTypes from 'prop-types';

const Aux = (props: any) => props.children;

Aux.propTypes = {
    children: PropTypes.node.isRequired
};

export default Aux;