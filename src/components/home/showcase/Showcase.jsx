import ShowcaseItem from './ShowcaseItem';

function Showcase({ carouselItems, title, className = '' }) {
    return (
        <section className={`px-5 ${className}`}>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <div>
                {carouselItems.map((item) => (
                    <ShowcaseItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}

export default Showcase;
