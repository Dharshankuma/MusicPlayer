const gridFilterDTO = (query) => {
  return {
    search: query.search?.toLowerCase() || "",
    sort: query.sort || "createdAt",
    order: query.order === "desc" ? "desc" : "asc",
    page: parseInt(query.page) > 0 ? parseInt(query.page) : 1,
    total: parseInt(query.total) > 0 ? parseInt(query.total) : 10,
  };
};

module.exports = { gridFilterDTO };
