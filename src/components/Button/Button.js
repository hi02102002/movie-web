import classes from './Button.module.scss';

const Button = ({ disabled, children, onClick, type, className }) => {
  return (
    <button
      disabled={disabled}
      type={type ? type : 'button'}
      onClick={onClick}
      className={`${classes.btn} ${className ? className : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
