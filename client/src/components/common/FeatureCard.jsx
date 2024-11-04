import PropTypes from 'prop-types'; // Importing PropTypes for prop type validation

export default function FeatureCard ({ 
    title,    // Title of the feature card
    imageUrl, // URL of the image to be displayed in the card
    text      // Description text to be displayed in the card
}) {
    return (
        <div className="card text-center feature-card" style={{ width: "25rem", margin: "auto" }}>
            {/* Title of the feature card */}
            <h5 className="card-title">{title}</h5>
            {/* Image displayed at the top of the card */}
            <img className="card-img-top center-img" src={imageUrl} alt="Card image cap" style={{ width: "75px" }} />
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
