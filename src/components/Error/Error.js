import ErrorCSS from './Error.module.css'

const Error = ({ error }) => <div className={ErrorCSS.error_styled}>{error}</div>;
export default Error;
