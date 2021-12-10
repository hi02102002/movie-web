import classes from './Button.module.scss';

const Button = ({ children, onClick, type, className }) => {
  return (
    <Button
      type={type ? 'button' : type}
      onClick={onClick}
      className={`${className} ${classes.btn}`}
    >
      {children}
    </Button>
  );
};

export default Button;
