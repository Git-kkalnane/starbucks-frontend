export function CommonDivider({
    color = 'gray-300', // 기본 색상 (#d1d5db)
    text = '',
    thickness = 1,
    shadow = false,
}) {
    return (
        <section className="w-full max-w-md mt-10">
            <div
                className="flex items-center mb-6"
                style={{
                    boxShadow: shadow ? '0 2px 4px -1px rgba(0,0,0,0.1)' : 'none',
                }}
            >
                <div
                    className="flex-grow"
                    style={{
                        height: thickness,
                        backgroundColor: color,
                    }}
                ></div>
                {text && (
                    <span className="px-4 text-sm" style={{ color }}>
                        {text}
                    </span>
                )}
                <div
                    className="flex-grow"
                    style={{
                        height: thickness,
                        backgroundColor: color,
                    }}
                ></div>
            </div>
        </section>
    );
}
