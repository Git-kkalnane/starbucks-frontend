import ServiceItem from './ServiceItem';

function ServicePanel({ className = '', services }) {
    return (
        <section className={`grid grid-cols-3 gap-4 ${className}`}>
            {services.map((item, idx) => (
                <ServiceItem
                    key={idx}
                    icon={item.icon}
                    label={item.label}
                    iconColor="[&>path]:!stroke-starbucks-green"
                />
            ))}
        </section>
    );
}

export default ServicePanel;
