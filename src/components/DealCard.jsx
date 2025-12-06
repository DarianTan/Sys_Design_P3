function DealCard({ deal }) {
  const savings = Math.round(Number(deal.savings || 0));

  return (
    <article className="deal-card">
      <img
        src={deal.thumb}
        alt={deal.title}
        className="deal-card__image"
      />

      <div className="deal-card__body">
        <h3 className="deal-card__title">{deal.title}</h3>

        <p className="deal-card__prices">
          <span className="deal-card__price--sale">
            ${deal.salePrice}
          </span>
          <span className="deal-card__price--normal">
            ${deal.normalPrice}
          </span>
          {savings > 0 && (
            <span className="deal-card__badge">
              -{savings}%
            </span>
          )}
        </p>

        {deal.steamRatingPercent && (
          <p className="deal-card__meta">
            Steam Rating: {deal.steamRatingPercent}%
          </p>
        )}

        <a
          href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
          target="_blank"
          rel="noreferrer"
          className="deal-card__button"
        >
          View Deal
        </a>
      </div>
    </article>
  );
}

export default DealCard;
