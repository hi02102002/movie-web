import classes from './Button.module.scss';

const Button = ({ children, onClick, type, className }) => {
  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={`${classes.btn} ${className ? className : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
