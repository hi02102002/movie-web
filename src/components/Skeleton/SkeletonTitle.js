import classes from './Skeleton.module.scss';

const SkeletonTitle = () => {
  return (
    <div classes={`${classes.skeleton} ${classes['skeleton-title']}`}></div>
  );
};

export default SkeletonTitle;
