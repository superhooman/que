import cls from './Docs.module.scss';

export const DocsLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    ...props
}) => (
    <div className={cls.root}>
        <div className={cls.content} {...props} />
    </div>
);
