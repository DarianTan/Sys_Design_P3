import { useEffect, useState } from "react";
import DealCard from "./DealCard";

function DealsList() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("ALL"); // ALL, UNDER_5, UNDER_10, UNDER_20
  const [showAll, setShowAll] = useState(false); // NEW: controls how many deals are visible

  useEffect(() => {
    async function fetchDeals() {
      try {
        setIsLoading(true);
        setError("");

        // Top Steam deals, sorted by deal rating, 24 deals
        const response = await fetch("https://www.cheapshark.com/api/1.0/deals");

        console.log("CheapShark HTTP status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }

        const data = await response.json();
        console.log("CheapShark deals data:", data);

        setDeals(data || []);
      } catch (err) {
        console.error("Error fetching deals:", err);
        setError("There was a problem loading game deals.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDeals();
  }, []);

  // Apply search + price filter
  const filteredDeals = deals.filter((deal) => {
    const titleMatch =
      searchTerm.trim() === "" ||
      deal.title.toLowerCase().includes(searchTerm.toLowerCase());

    const salePrice = parseFloat(deal.salePrice || "0");

    let priceMatch = true;
    if (priceFilter === "UNDER_5") {
      priceMatch = salePrice > 0 && salePrice <= 5;
    } else if (priceFilter === "UNDER_10") {
      priceMatch = salePrice > 0 && salePrice <= 10;
    } else if (priceFilter === "UNDER_20") {
      priceMatch = salePrice > 0 && salePrice <= 20;
    }

    return titleMatch && priceMatch;
  });

  // Decide how many deals to show (like Free Games)
  const visibleDeals = showAll ? filteredDeals : filteredDeals.slice(0, 6);
  const showSeeMoreButton = !showAll && filteredDeals.length > 6;

  if (isLoading) {
    return <p>Loading game deals...</p>;
  }

  if (error) {
    return (
      <p style={{ color: "#fca5a5", fontSize: "0.85rem" }}>{error}</p>
    );
  }

  if (!deals.length) {
    return (
      <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
        No deals available right now. Please try again later.
      </p>
    );
  }

  return (
    <div>
      {/* Filter controls */}
      <div className="deal-filters">
        <input
          type="text"
          placeholder="Search deals by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowAll(false); // reset view when filters change
          }}
          className="deal-filters__search"
        />

        <select
          value={priceFilter}
          onChange={(e) => {
            setPriceFilter(e.target.value);
            setShowAll(false); // reset view when filters change
          }}
          className="deal-filters__select"
        >
          <option value="ALL">All prices</option>
          <option value="UNDER_5">Under $5</option>
          <option value="UNDER_10">Under $10</option>
          <option value="UNDER_20">Under $20</option>
        </select>
      </div>

      {/* Deals grid (limited at first) */}
      {filteredDeals.length === 0 ? (
        <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
          No deals match your search and price filter.
        </p>
      ) : (
        <>
          <div className="deal-grid">
            {visibleDeals.map((deal) => (
              <DealCard key={deal.dealID} deal={deal} />
            ))}
          </div>

          {showSeeMoreButton && (
            <div className="game-see-more-wrapper">
              <button
                type="button"
                className="game-see-more-button"
                onClick={() => setShowAll(true)}
              >
                See more deals
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DealsList;
