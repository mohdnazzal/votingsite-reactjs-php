import PropTypes from 'prop-types'; // Importing PropTypes for prop type validation
import {} from '../../assets/styles/mobile.css'; // Importing CSS styles for mobile (currently no specific styles)

export default function Card ({
    myClass1, // Class name for the image container
    myClass2, // Class name for the text and button container
    title,    // Title of the card
    imageUrl, // URL of the image to be displayed
    imageAlt, // Alternative text for the image (for accessibility)
    text,     // Description or additional text to display
    buttonText, // Text to display on the button
    clickAction // Function to be executed when the button is clicked
}) {
    return (
        <>
            {/* Container for the image with specified class */}
            <div className={myClass1}>
                <img
                    src={imageUrl} // Source of the image
                    alt={imageAlt} // Alternative text for the image
                    style={{width:"250px"}} // Inline style to set the image width
                    className="img-fluid mb-3" // Bootstrap classes for responsive image and margin bottom
                />
            </div>
            {/* Container for the title, text, and button with specified class */}
            <div className={myClass2}>
                <h1 className="display-4 mb-3">{title}</h1>
                <p className="lead text-muted">{text}</p> 
                <button 
                    className="demo-btn" // Class for styling the button
                    onClick={clickAction} // Attach the click event handler
                >
                    {buttonText} {/* Button text*/}
                </button>
            </div>
        </>
    );
}

// PropTypes to enforce the types and requirements of the props passed to the Card component
Card.propTypes = {
    myClass1: PropTypes.string.isRequired, // Class name for the image container (required)
    myClass2: PropTypes.string.isRequired, // Class name for the text and button container (required)
    title: PropTypes.string.isRequired, // Title text (required)
    imageUrl: PropTypes.string.isRequired, // URL of the image (required)
    imageAlt: PropTypes.string.isRequired, // Alternative text for the image (required)
    text: PropTypes.string.isRequired, // Description text (required)
    buttonText: PropTypes.string.isRequired, // Text for the button (required)
    clickAction: PropTypes.func.isRequired, // Function to handle button clicks (corrected from string to func)
};
