import PropTypes from 'prop-types'; // Importing PropTypes for prop type validation

export default function FeatureCard ({ 
    title,    // Title of the feature card
    text      // Description text to be displayed in the card
}) {
    return (
        <div className="card text-center feature-card" style={{ width: "20rem", margin: "auto" }}>
            {/* Title of the feature card */}
            <h5 className="card-title feature-title">{title}</h5>
            {/* Image displayed at the top of the card */}
            <div className="card-body">
                {/* Text description of the feature */}
                <p className="card-text" style={{ fontFamily: "sans-serif", fontSize: "15px" }}>
                    {text}
                </p>
            </div>
        </div>
    );
}

// PropTypes to enforce the types and requirements of the props passed to the FeatureCard component
FeatureCard.propTypes = {
    title: PropTypes.string.isRequired, // Title text (required)
    imageUrl: PropTypes.string.isRequired, // URL of the image (required)
    text: PropTypes.string.isRequired, // Description text (required)
};
