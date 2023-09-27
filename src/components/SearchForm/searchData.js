export const getSearchData = ({
  inn,
  tonality,
  startDate,
  endDate,
  limit,
  maxFullness,
  inBusinessNews,
  onlyMainRole,
  onlyWithRiskFactors,
  excludeTechNews,
  excludeAnnouncements,
  excludeDigests,
}) => {
  return {
    issueDateInterval: {
      startDate,
      endDate,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: inn.replace(/\D/g, ""),
            maxFullness,
            inBusinessNews,
          },
        ],
        onlyMainRole,
        tonality,
        onlyWithRiskFactors,
        riskFactors: {
          and: [],
          or: [],
          not: [],
        },
        themes: {
          and: [],
          or: [],
          not: [],
        },
      },
      themesFilter: {
        and: [],
        or: [],
        not: [],
      },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews,
      excludeAnnouncements,
      excludeDigests,
    },
    similarMode: "duplicates",
    limit,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "month",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };
};
