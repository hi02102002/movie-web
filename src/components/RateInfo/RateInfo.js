import classes from './RateInfo.module.scss';
const RateInfo = ({ rate }) => {
  return (
    <div className={classes['rate-info']}>
      <div className={classes.circle}></div>
    </div>
  );
};

export default RateInfo;
