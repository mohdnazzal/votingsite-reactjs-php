import PropTypes from 'prop-types';

export default function ReverseCard ({myClass1, myClass2, title, imageUrl, imageAlt, text, buttonText, clickAction}) {
    return (
        <>
        <div className={myClass2}>
        <h1 className="display-4 mb-3">{title}</h1>
        <p className="lead text-muted">
            {text}
        </p>
        <button onClick={clickAction}>{buttonText}</button>
      </div>
        <div className={myClass1}>
        <img
          src={imageUrl}
          alt={imageAlt}
          style={{width:"250px"}}
          className="img-fluid mb-3 reverse-img"
        />
      </div>

        </>

    );
}

ReverseCard.propTypes = {
    myClass1: PropTypes.string.isRequired,
    myClass2: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    clickAction: PropTypes.string.isRequired,

};