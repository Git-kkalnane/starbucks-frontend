export function CommonBtnGroup({
    direction = 'row',
    gap = 'gap-5',
    justify = 'justify-center',
    padding = 'px-5',
    margin = 'mt-5',
    className = '',
    children,
}) {
    const flexDirection = direction === 'col' ? 'flex-col' : 'flex-row';

    return (
        <div className={`flex ${flexDirection} ${gap} ${justify} ${padding} ${margin} ${className}`}>{children}</div>
    );
}
